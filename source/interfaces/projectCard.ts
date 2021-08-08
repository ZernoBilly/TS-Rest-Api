import { Document } from 'mongoose';

export default interface IProjectCard extends Document {
    title: string;
    date: Date;
    description: string;
    selectedFile: string;
    url: string;
    gitHub: string;
}
