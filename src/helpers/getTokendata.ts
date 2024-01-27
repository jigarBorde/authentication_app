import type { NextRequest } from 'next/server'
import { connect } from "@/database/db";
import User from "@/models/userModel";
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

//database connection


export async function getTokenData(request: NextRequest) {
    connect();
    // const token = request.cookies.get('token')?.value || '';
    // console.log(process.env.JWT_SECRET)
    // const secret = new TextEncoder().encode(
    //     process.env.JWT_SECRET,
    // )
    // const { payload }: { payload: any } = await jwtVerify(token, secret, {
    // })
    // const userID = payload.payload.Id
    // // console.log(userID)

    // // const currentUser: any = await User.findOne({ _id: userID });
    // // return currentUser;
}