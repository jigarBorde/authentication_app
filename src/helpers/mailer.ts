
import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }
        console.log(process.env.NEXT_PUBLIC_MAIL_TRAP_USERNAME)
        console.log(process.env.NEXT_PUBLIC_MAIL_TRAP_PASSWORD)

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NEXT_PUBLIC_MAIL_TRAP_USERNAME,
                pass: process.env.NEXT_PUBLIC_MAIL_TRAP_PASSWORD
            }
        });


        const mailOptions = {
            from: 'test@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">

            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
              <p style="font-size: 18px; margin-bottom: 20px;">Click <a href="${process.env.APP_URL}/verifyemail?token=${hashedToken}" style="color: #007BFF; text-decoration: none; font-weight: bold;">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                or copy and paste the link below in your browser.</p>
          
              <p style="font-size: 16px; color: #555; margin-bottom: 30px;">${process.env.APP_URL}/verifyemail?token=${hashedToken}</p>
          
              <div style="text-align: center;">
                <a href="${process.env.APP_URL}/verifyemail?token=${hashedToken}" style="text-decoration: none;">
                  <button style="background-color: #007BFF; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; transition: background-color 0.3s;">
                    Click Here
                  </button>
                </a>
              </div>
            </div>
          
          </body>`
        }

        const mailresponse = await transport.sendMail
            (mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}