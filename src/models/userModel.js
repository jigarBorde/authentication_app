import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required:[true, "Please provide a username"],
        trim : true,
    },
    email : {
        type : String,
        required : [true, "Please provide an Email"],
        unique : true,
    },
    password : {
        type : String,
        required : [true, "Please provide a password"],
        select : false
    },
    isVerified : {
        type : Boolean,
        default : false,
    },
    isAdmin :{
        type : Boolean,
        default : false,
    },
    forgotPasswordToken : String,
    forgotPasswordExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date,
},
{timestamps : true}
);

// generate hashed password and salt
userSchema.pre("save", async function(next){
    console.log("called")
    if(!this.isModified("password")){
        next();
        }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}
// Export the model, ensuring it's not overwritten if it already exists
const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
// module.exports = mongoose.model("User", userSchema);