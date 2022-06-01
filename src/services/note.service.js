import Note from '../models/note.model';
import bcrypt from 'bcrypt';
import { newUserValidator } from '../validators/user.validator';


export const createNote = async (body) => {
      const data = await Note.create(body);
      return data;
  };

export const updateNote = async (id, body) => {
  const data = await Note.findByIdAndUpdate({_id: id , UserID: body.UserID},
    body,
      {
        new: true
      }
    );
    return data;
  };  

export const getNote = async (id, UserID) => {
   const data = await Note.findById({_id: id, UserID: UserID});
   return data;
};  

export const deleteUser = async (id, UserID) => {
    await Note.findByIdAndDelete({_id: id, UserID: UserID});
    return '';
  };

  export const getAllNotes = async (UserID) => {
    const data = await Note.find(UserID);
    return data;
  };

  
  