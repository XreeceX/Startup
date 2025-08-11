import mongoose from "mongoose";
const visitSchema = new mongoose.Schema(
{
link: { type: mongoose.Schema.Types.ObjectId, ref: "Link", required: true },
ts: { type: Date, default: Date.now },
ref: String,
uaBrowser: String,
uaOS: String,
ip: String
},
{ timestamps: true }
);
visitSchema.index({ link: 1, ts: 1 });
export default mongoose.model("Visit", visitSchema);
