import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { connect } from "@/database/db";
import jwt from "jsonwebtoken";
import { getTokenData } from "@/helpers/getTokendata";


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup'
    const token = request.cookies.get('token')?.value || '';
    
    if (isPublicPath && token) {
        const currentUser = getTokenData(request);
        console.log(currentUser)
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login', '/signup', '/profile', '/profile/:id*', '/']
}


// // Middleware to check user authentication and set custom header
// export function checkAuthentication(request: NextRequest) {
//     const authToken = request.cookies.get('token');
  
//     // Check if the authentication token is present and valid (add your authentication logic here)
//     if (authToken && isValidAuthToken(authToken)) {
//       // User is authenticated, set custom header and allow them to proceed
//       const response = NextResponse.next();
//       response.headers.set('X-User-Authenticated', 'true');
//       return response;
//     }
  
//     // User is not authenticated, respond with unauthorized status
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }
  