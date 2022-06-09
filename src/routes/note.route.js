import express from 'express';
import * as NoteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { getRedisData } from '../middlewares/redis.middleware';

const router = express.Router();

router.post('/new', newNoteValidator, userAuth, NoteController.createNote);

router.post('/update/:_id', userAuth, NoteController.updateNote);

router.get('/getbyId/:_id', userAuth, NoteController.getNote);

router.get('/getAll', userAuth , getRedisData , NoteController.getAllNotes);

router.delete('/delete/:_id', userAuth,  NoteController.deleteNote);

router.put('/isArchived/:_id', userAuth, NoteController.archiveNote);

router.put('/inTrash/:_id', userAuth, NoteController.trashNote);

export default router;