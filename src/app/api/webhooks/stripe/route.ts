import Cors from "micro-cors";
import { NextResponse } from "next/server";
import { stripe } from '@/lib/stripe'
import { prisma } from '@/utils/prisma'

const webhookSecret = process.env.NEXT_PUBLIC_WEBHOOK_SECRET;

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
  if(!stripe) {
    console.log('stripe is not initialized');
    throw new Error("Stripe is not initialized")
  }

  // update the users details in the database
  if(!prisma) {
    console.log('Prisma is not initialized') 
    throw new Error("Prisma is not initialized")
  }

  // turn the body into string
  const body = await request.text();

  // get the stripe signature from the request headers
  const signature = request.headers.get('Stripe-Signature');

  if(!signature) {
    console.log('No stripe signature found')
    throw new Error("No stripe signature found")
  }
  if(!webhookSecret) {
    console.log('No webhook secret found')
    throw new Error("No webhook secret found")
  } 

  let event;
  try{
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if(!event) {
      console.log('No event found')
      throw new Error("No event found")
    }

    switch(event.type) {
      case 'invoice.payment_succeeded':
        // @ts-ignore
        const userEmail = event.data.object.customer_email as string

        if(!userEmail) {
          console.log('No user email found')
          throw new Error("No user email found")
        }

        console.log(userEmail);
        
        // get the user from the database
        const user = await prisma.users.findUnique({
          where: {
            email: userEmail
          }
        })

        if(!user) {
          console.log('No user found')
          throw new Error("No user found")
        }
        // add the subscription to the database
        await prisma.subscription.create({
          data: {
            paymentEmail: userEmail,
            transactionId: event.data.object.payment_intent as string,
            dateOfPurchase: new Date().toISOString(),
            dateOfExpiry: new Date().toISOString(),
            planType: 'BASIC',
            subscriptionActive: true,
            userId: user.uid
          }
        })

    break;
    default:
      // The default will NOT throw an error.
      // This is because we want to ignore any other event types that are not relevant to us
      console.log('No event type found')
      //throw new Error("No event type found")
    }
  }catch(e){
    console.log(e);
    if(e instanceof Error) {
      return new Response("Webhook Error:" + e.message, { status: 401 });
    }
  }

  return new Response("Webhook executed", { status: 200 });
}
