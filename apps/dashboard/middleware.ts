import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { getBaseUrl, getEnv } from './utils/';

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

const getRedirectUrl = (query: string) => {
  return new URL(`/login?${query}`, 'https://app.layowt.com').href
}

// runs on every request
export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  let publicRootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  if(!publicRootDomain) {
    publicRootDomain = 'app.layowt.com'
  }

  let hostname = req.headers.get('host')
   
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
    hostname === 'app.layowt.com' || 
    existingSubDomain === 'app'
  ) {
    // if we are on the root domain, we need to do user auth checks
    const { response: session, user } = await updateSession(req)

    const sessionCookie = session.headers.get('x-middleware-request-cookie')  

    // if there is no user, and they are trying to access a page that requires auth
    // redirect them to the dashboard with a not-authenticated message
    // so on the /login route we can display a message to the user
    if(
      !sessionCookie &&
      path !== '/login' &&
      path !== '/sign-up' &&
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
    if(sessionCookie && path === '/login') {
      return NextResponse.redirect(
        new URL('/dashboard', req.url)
      )
    }

    // if the user is authenticated, and trying to access '/', make the dashboard the root page
    if(sessionCookie && path === '/') {
      return NextResponse.rewrite(
        new URL('/dashboard', req.url)
      )
    }
    // other wise, the user is authenticated, trying to access the root site (app.layowt.com), and is allowed to access the page
    return NextResponse.next()
  }
  
  // at this point, we are on a subdomain - so if the user tries to access
  // '/admin', we need to redirect them to to login screen with an identifable
  // query parameter so after login, we can redirect them back to the admin page
  // for that site
  if(path === '/admin'){
    // try to get the siteId by using the subdomain
    const response = await fetch(`${getBaseUrl()}/api/website/${hostname}`, {
      method: 'GET'
    })
    const websiteId = await response.json()

    // if we cannot find the site id, redirect the user to the login page with a query parameter
    // so we can serve a message to the users
    if(!websiteId) {
      return NextResponse.redirect(getRedirectUrl('r=site-not-found'))
    }
    // if we can find the site id, redirect the user to the login page with a query parameter
    // so we can redirect them back to the admin page after login
    return NextResponse.redirect(getRedirectUrl(`r=admin&siteId=${websiteId}`))
  }
  
  // rewrite everything else to 'subdomain.app.layout.com'
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
