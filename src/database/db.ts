import mongoose from "mongoose"

export async function connect() {
    try {
        mongoose.connect(`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASS}@cluster0.ucvciwi.mongodb.net/`!)
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("MongoDB database connection established successfully");
        });
        connection.on("error", (err) => {
            console.log("Something went wrong");
            console.log(err);
        });
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
}