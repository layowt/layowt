import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {}

// exclude files that we do NOT want to be checked for auth
