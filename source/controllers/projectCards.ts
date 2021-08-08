import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import projectCards from '../models/projectCards';

//Get all Project Cards
export const getAllProjectCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cards = await projectCards.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
};

//Get specific Project Card
export const getProjectCard = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const card = await projectCards.findById(id);
        res.status(200).json(card);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Create Project Card
export const createProjectCard = async (req: Request, res: Response, next: NextFunction) => {
    const { title, date, description, selectedFile, url, gitHub } = req.body;

    const newCard = new projectCards({
        title,
        date,
        description,
        selectedFile,
        url,
        gitHub
    });

    try {
        await newCard.save();
        res.status(201).json(newCard);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

//Update Project Card
export const updateProjectCard = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, date, description, selectedFile, url, gitHub } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        // Check if id is valid
        return res.status(404).send(`No post with id ${id}`);

    const updatedCard = {
        _id: id,
        title,
        date,
        description,
        selectedFile,
        url,
        gitHub
    };

    await projectCards.findByIdAndUpdate(id, updatedCard, { new: true });
    res.json(updatedCard);
};

//Delete Project Card
export const deleteProjectCard = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        // Check if id is valid
        return res.status(404).send(`No post with id ${id}`);

    await projectCards.findByIdAndRemove(id);
    res.json({ message: 'Card deleted successfully' });
};

export default { getAllProjectCards, getProjectCard, createProjectCard, updateProjectCard, deleteProjectCard };
