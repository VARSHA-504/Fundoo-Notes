import User from '../models/user.model';
import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as helper from '../utils/helper';
import { producer } from '../utils/RabbitMQ';

//get all users
// export const getAllUsers = async () => {
//   const data = await User.find();
//   return data;
// };

// new user registration
export const userRegistration = async (userData) => {
  const resData = await User.findOne({emailId: userData.emailId});
  if(resData == null) {
    userData.password = await bcrypt.hash(userData.password, 10);
    const data = await User.create(userData);
    producer(data);
    return data;
  }
  else {
    throw new Error("User already exist");
}
};

// for user Login
export const userLogin = async (userData) => {
  const data = await User.findOne({emailId : userData.emailId});
  if(data == null){
    throw new Error("User doesnt exist")
  }
  else{
    let passwordCheck =  bcrypt.compareSync(userData.password, data.password);
    if(passwordCheck){
      let token = jwt.sign({ firstname: data.firstname, email: data.emailId, id: data._id }, process.env.SECRET_KEY);
      return token;
    }
    else {
      throw new Error("Password not match");
    }
  }
};

// forgot password
export const forgotPassword = async (userData) => {
  const data = await User.findOne({emailId : userData.emailId});
  if(data == null){
    throw new Error("User doesnt exist")
  }
  else{
      let token = jwt.sign({ firstname: data.firstname, email: data.emailId, id: data._id }, process.env.SECRET_CODE);
      console.log("password link", token)
      helper.sendMail(userData.emailId, token);
      return token;
 } 
    
};

// Reset Password
export const resetPassword = async (body) => {
  let hashpassword = await bcrypt.hash(body.password, 10);
  const data = await User.findOneAndUpdate({ email: body.email },{ password: hashpassword }
  );
  console.log("data is " ,data);
  return data;
};

