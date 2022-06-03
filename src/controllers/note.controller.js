import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service.js';

export const createNote = async (req, res, next) => {
    try {
      const data = await NoteService.createNote(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note created succesfully'
      });
    }catch(error) {
      next(error);
    }
};

export const updateNote = async (req, res, next) => {
  try {
    const data = await NoteService.updateNote(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};


export const getNote = async (req, res, next) => {
  try {
    const data = await NoteService.getNote(req.params._id, req.body.UserID);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note fetched'
    });
  } catch (error) {
    next(error);
  }
};


export const deleteNote = async (req, res, next) => {
  try {
    await NoteService.deleteUser(req.params._id, req.body.UserID);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'User deleted'
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNotes = async (req, res, next) => {
  try {
    const data = await NoteService.getAllNotes(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All notes fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const archiveNote = async (req, res, next) => {
  try {
    const data = await NoteService.archiveNote(req.params._id, req.body.UserID);
      res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note is Archived successfully'
  }); 
 } catch (error) {
    next(error);
  }
};

export const trashNote = async (req, res, next) => {
  try {
    const data = await NoteService.trashNote(req.params._id, req.body.UserID);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note is moved to trash successfully'
    });
  } catch (error) {
    next(error);
  }
};

