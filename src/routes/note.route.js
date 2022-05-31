import express from 'express';
import * as NoteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('', newNoteValidator, userAuth, NoteController.createNote);

router.put('/:_id', userAuth, NoteController.updateNote);

router.get('/:_id', userAuth, NoteController.getNote);

router.get('', NoteController.getAllNotes);

router.delete('/:_id', userAuth,  NoteController.deleteNote);

export default router;