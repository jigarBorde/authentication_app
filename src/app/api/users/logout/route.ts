import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json({ success: true, message: "user loggedout successfully" }, { status: 200 });
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) }) // set cookie to empty string and set expiry to 0 (past
        return response;
    } catch (error: any) {
        console.log(error);
        NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}