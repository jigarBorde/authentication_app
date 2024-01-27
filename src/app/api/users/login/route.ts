import { connect } from "@/database/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';


// connection to database
connect();

// controller to signup new user
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { password, email } = reqBody;
        // fields validation
        if (!password || !email) {
            return NextResponse.json({ success: false, error: "Please fill all the fields" }, { status: 400 });
        }

        // user check validation
        // check if user already exists
        const user: any = await User.findOne({ email }).select("+password")
        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 400 });
        }
        const validateUser = await user.comparePassword(password)
        if (!validateUser) {
            return NextResponse.json({ success: false, error: "Please enter valid password" }, { status: 400 });
        }
        const payload = {
            Id: user._id,
            email: user.email,
        }
        const alg = 'HS256'

        // const token = await jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" })
        const token = await new SignJWT({ payload })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setExpirationTime('1d')
            .sign(new TextEncoder().encode(process.env.JWT_SECRET!));


        const Response = NextResponse.json({ success: true, message: "user loggedin successfully", user: user }, { status: 200 });
        Response.cookies.set("token", token, { httpOnly: true })
        return Response
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}


