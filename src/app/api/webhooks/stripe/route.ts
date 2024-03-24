import Cors from "micro-cors";
import { NextResponse } from "next/server";
import { stripe } from '@/lib/stripe'
import { prisma } from '@/utils/prisma'
import { supabase } from "@/lib/supabase";

//const stripeSecret = process.env.NEXT_PUBLIC_STRIPE_SECRET

const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

/**
 * 
 * POST request that stripe will hit once a user has successfully paid for a plan
 * 
 * @param request 
 */
export async function POST(request: Request) {
  // Ensure that stripe is initialized
  if(!stripe) throw new Error("Stripe is not initialized")

  try {
    const body = await request.json();

    // get the stripe signature from the request headers
    const signature = request.headers.get('Stripe-Signature');

    if(!signature) throw new Error("No stripe signature found")
    if(!webhookSecret) throw new Error("No webhook secret found")

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    switch(event.type){
      case "invoice.payment_succeeded":
        console.log("Checkout session completed")
        // update the users details in the database
        if(!prisma) throw new Error("Prisma is not initialized")

        const {data: userSession } = await supabase.auth.getSession()
        if(!userSession) throw new Error("No user session found")

        // get the user from the database
        const user = await prisma.users.findUnique({
          where: {
            email: userSession.session?.user.email
          }
        })

        if(!user) throw new Error("No user found")

        // add the subscription to the database
        await prisma.subscription.create({
          data: {
            User: {
              connect: {
                uid: user.uid
              }
            },
            dateOfExpiry: new Date().toISOString(),
            dateOfPurchase: new Date().toISOString(),
            paymentEmail: event.data.object.customer_email ?? user.email,
            planType: 'BASIC',
            subscriptionActive: true,
            transactionId: event.data.object.payment_intent as string ?? ''
          }
        })
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
    
    return new Response("ok", { status: 200 });

  } catch(e){
    return NextResponse.json({ result: e, ok: false });
  }
}