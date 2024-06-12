import { NextResponse } from "next/server";
import {auth} from "./auth";
import { authRoutes, publicRoutes } from "./route";


export default auth((req)=>{
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    const isPublic = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    //if user accessing a public url then let them proceed
    if (isPublic){
        return NextResponse.next();
    }


    //if user accessing auth route, check if the user is logged in 
    if(isAuthRoute){
        //i user is logged in redirects them to members page instead of login/signup routes
        if (isLoggedIn){
            return NextResponse.redirect(new URL("/members", nextUrl))
        }
        return NextResponse.next();
        
    }
    //user is not logged in and 
    if(!isPublic && !isLoggedIn){
        return NextResponse.redirect(new URL("/login", nextUrl))
    }

    return NextResponse.next();
})

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}