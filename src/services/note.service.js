import Note from '../models/note.model';
import { client } from '../config/redis';
import bcrypt from 'bcrypt';
import { newUserValidator } from '../validators/user.validator';


export const createNote = async (body) => {
      const data = await Note.create(body);
      if(data){
        await client.del('allNotes');
      return data;
      }
  };

export const updateNote = async (id, body) => {
  const data = await Note.findByIdAndUpdate({_id: id , UserID: body.UserID},
    body,
      {
        new: true
      }
    );
    if(data){
      await client.del('allNotes');
    return data;
    }
  };  

export const getNote = async (id, UserID) => {
   const data = await Note.findById({_id: id, UserID: UserID});
   return data;
};  

export const deleteUser = async (id, UserID) => {
    await Note.findByIdAndDelete({_id: id, UserID: UserID});
    await client.del('allNotes');
    return '';
  };

  export const getAllNotes = async ( UserID) => {
    const data = await Note.find(UserID);
    if(data){
    await client.set('allNotes', JSON.stringify(data))
    return data;
    }
  };

  export const archiveNote = async (id, UserID) => {
    const data = await Note.findOneAndUpdate({_id: id, UserID: UserID},  { isArchived : true})
    if(data){
      await client.del('allNotes')
    return data;
    }
  };
  
  export const trashNote = async (id, UserID) => {
    const data = await Note.findOneAndUpdate({_id: id, UserID: UserID}, { isDeleted : true});
    if(data){
      await client.del('allNotes')
    return data;
    }
  };
  
