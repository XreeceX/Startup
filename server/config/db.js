import mongoose from "mongoose";
export async function connectDB(uri) {
const conn = await mongoose.connect(uri, { autoIndex: true });
console.log("Mongo connected:", conn.connection.host);
}
