import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

// runs on every request
export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  let publicRootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  if(!publicRootDomain) {
    publicRootDomain = 'app.layout.com'
  }

  let hostname = req.headers.get('host')
  
  //!.replace('localhost:4343', 'localhost:4343'  

  // special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${
      process.env.NEXT_PUBLIC_ROOT_DOMAIN
    }`;
  }

  const searchParams = req.nextUrl.searchParams.toString()

  const path = `${url.pathname}${
    searchParams.toString().length > 0 ? `?${searchParams.toString()}` : ''
  }`

  // if we are developing locally or on the root domain, do not redirect
  if(hostname === 'localhost:4343' || hostname === publicRootDomain) {
    console.log('ran');
    // if we are on the root domain, we need to do user auth checks
    const session = await updateSession(req)

    // if there is no user, and they are trying to access a page that requires auth
    // redirect them to the dashboard with a not-authenticated message
    // so on the /login route we can display a message to the user
    if(
      !session && 
      path !== '/login' && 
      path !== '/signup' && 
      path !== '/forgot-password'
    ){
      return NextResponse.rewrite(
        new URL(
          '/login?r=not-authenticated',
          req.url
        )
      )
    }

    // if the user is authenticated, and trying to access '/', make the dashboard the root page
    if(session && path === '/') {
      return NextResponse.rewrite(
        new URL('/dashboard', req.url)
      )
    }

    // other wise, the user is authenticated, trying to access the root site (app.layowt.com), and is allowed to access the page
    return NextResponse.next()
  }

  // rewrite everything else to 'subdomain.app.layout.com'
  return NextResponse.rewrite(
    new URL(
      `/${hostname}`,
      req.url
    )
  )
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};
