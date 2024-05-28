import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  userId: String, // Unique identifier for the user
  data: Object, // The project data in JSON format
});

export default mongoose.model("Project", projectSchema);
