import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

// runs on every request
export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  let publicRootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  if(!publicRootDomain) {
    publicRootDomain = 'app.layout.com'
  }

  let hostname = req.headers.get('host')!.replace(
    'localhost:4343', publicRootDomain  
  )
  const searchParams = req.nextUrl.searchParams.toString()

  const path = `${url.pathname}${
    searchParams.toString().length > 0 ? `?${searchParams.toString()}` : ''
  }`

  // if we are developing locally or on the root domain, do not redirect
  if(hostname === 'localhost:4343' || hostname === publicRootDomain) {
    // if we are on the root domain, we need to do user auth checks
    const session = await updateSession(req)

    // if there is no user, and they are trying to access a page that requires auth
    // redirect them
    if(
        !session && 
        path !== '/login' && 
        path !== '/signup' && 
        path !== '/forgot-password'
    ){
      return NextResponse.redirect('/login')
    }

    // other wise, the user is authenticated, trying to access the root site (app.layowt.com), and is allowed to access the page
    return NextResponse.next()
  }

  return NextResponse.rewrite(
    new URL(`${hostname}${path}`, req.url)
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
