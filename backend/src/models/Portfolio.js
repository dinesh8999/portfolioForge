import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, required: true, maxlength: 3000 },
    imageUrl: { type: String, default: "" },
    demoUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    role: { type: String, default: "", maxlength: 150 },
    bio: { type: String, default: "", maxlength: 3000 },
    email: { type: String, default: "", maxlength: 254 },
    skills: { type: [String], default: [] },
    profilePhoto: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    websiteUrl: { type: String, default: "" },
    projects: { type: [projectSchema], default: [] },
    templateId: { type: String, default: "minimal" },
    templateName: { type: String, default: "The Minimalist" },
    style: {
      accentColor: { type: String, default: "#d4af37" },
      backgroundColor: { type: String, default: "#111111" },
      textColor: { type: String, default: "#ffffff" },
      fontFamily: { type: String, default: "Arial" },
    },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", portfolioSchema);
