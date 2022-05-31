import Note from '../models/note.model';
import bcrypt from 'bcrypt';

export const createNote = async (body) => {
      const data = await Note.create(body);
      return data;
  };

export const updateNote = async (_id, body) => {
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },
    body,
      {
        new: true
      }
    );
    return data;
  };  

export const getNote = async (id) => {
   const data = await Note.findById(id);
   return data;
};  

export const deleteUser = async (id) => {
    await Note.findByIdAndDelete(id);
    return '';
  };

  export const getAllNotes = async () => {
    const data = await Note.find();
    return data;
  };
  