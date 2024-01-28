import { connect } from "@/database/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";


// connection to database
connect();

// controller to signup new user
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { username, password, email } = reqBody;
        // fields validation
        if (!username || !password || !email) {
            return NextResponse.json({ success: false, error: "Please fill all the fields" }, { status: 400 });
        }

        // user check validation
        // check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 });
        }

        const newUser = new User({
            username,
            password,
            email
        });
        // save user to database
        const savedUser = await newUser.save()

        if (!savedUser) {
            return NextResponse.json({ success: false, error: "internal server error" }, { status: 400 });
        }

        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })
        return NextResponse.json({ success: true, message: "user screated successfully", user: savedUser }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}


