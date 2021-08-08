import mongoose, { Schema } from 'mongoose';
import IProjectCard from '../interfaces/projectCard';

const ProjectCardSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, required: true },
    selectedFile: { type: String },
    url: { type: String, required: true },
    gitHub: { type: String }
});

export default mongoose.model<IProjectCard>('ProjectCards', ProjectCardSchema);
