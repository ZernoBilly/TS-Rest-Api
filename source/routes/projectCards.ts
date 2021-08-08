import express from 'express';
import controller from '../controllers/projectCards';

const router = express.Router();

router.get('/get/projectCards', controller.getAllProjectCards);
router.get('/get/projectCards/:id', controller.getProjectCard);
router.post('/post/projectCards', controller.createProjectCard);
router.patch('/patch/projectCards/:id', controller.updateProjectCard);
router.delete('/delete/projectCards/:id', controller.deleteProjectCard);

export = router;
