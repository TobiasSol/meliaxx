// middleware.js
import { NextResponse } from 'next/server';

export async function middleware(request) {
  // Path exclusions
  const EXCLUDED_PATHS = [
    '/admin',
    '/_next',
    '/api',
    '/static',
    '/images',
    '/videos',
    '/fonts',
    '/password',
    '/verify-password',
  ];

  // Check if the path should be excluded
  const shouldExclude = EXCLUDED_PATHS.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (shouldExclude) {
    return NextResponse.next();
  }

  // Hole den Status über die API
  try {
    const apiUrl = new URL('/api/check-protection', request.url);
    const response = await fetch(apiUrl);
    const { passwordProtectionEnabled } = await response.json();

    // Wenn Passwortschutz deaktiviert ist, erlaube Zugriff
    if (!passwordProtectionEnabled) {
      return NextResponse.next();
    }

    // Prüfe auf Access Cookie
    const accessCookie = request.cookies.get('site_access');
    if (accessCookie?.value === 'granted') {
      return NextResponse.next();
    }

    // Weiterleitung zur Passwort-Seite mit Return-URL
    const returnTo = request.nextUrl.pathname;
    return NextResponse.redirect(
      new URL(`/password?returnTo=${encodeURIComponent(returnTo)}`, request.url)
    );
  } catch (error) {
    console.error('Middleware error:', error);
    // Im Fehlerfall erlauben wir den Zugriff
    return NextResponse.next();
  }
}

export const config = {
  matcher: '/((?!_next/static|favicon.ico).*)',
};