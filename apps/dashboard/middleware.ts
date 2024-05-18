import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

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

  // get the first part of the hostname
  const existingSubDomain = hostname.split('.')[0]
  // if we are developing locally or on the root domain, do not redirect
  if(
    hostname === 'localhost:4343' || 
    hostname === publicRootDomain || 
    hostname === 'app.layout.com' || 
    existingSubDomain === 'app'
  ) {
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

    // redirect the user to the dashboard if they are 
    //authenticated and trying to access the login page
    if(session && path === '/login') {
      return NextResponse.redirect(
        new URL('/dashboard', req.url)
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
  return NextResponse.rewrite(new URL(`/${hostname}/`, req.url));
}
