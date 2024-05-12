import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

// runs on every request
// TODO: make this update the redux user?
export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const publicRootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  let hostname = req.headers.get('host')!.replace(
    'localhost:4343', publicRootDomain  
  )
  console.log('hostname', hostname);
  
  return await updateSession(req);
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
