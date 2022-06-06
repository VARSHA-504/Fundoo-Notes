import User from '../models/user.model';
import  bcrypt from 'bcrypt';
 import jwt from 'jsonwebtoken';
 import * as helper from '../utils/helper';

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
      let token = jwt.sign({ firstName: data.firstname, emailId: data.emailId, id: data._id }, process.env.SECRET_CODE);
      console.log("password link", token)
      helper.sendMail(userData.emailId, token);
      return token;
 } 
    
};

// Reset Password
export const resetPassword = async (userData) => {
  hash.password = await bcrypt.hash(userData.password, 10);
  const data = await User.findOneAndUpdate({ emailId: userData.emailId },{ password: hash.password }
  );
  console.log("data is " ,data);
  return data;
};


// create new user
// export const newUser = async (body) => {
//   const data = await User.create(body);
//   return data;
// };

//update single user
// export const updateUser = async (_id, body) => {
//   const data = await User.findByIdAndUpdate(
//     {
//       _id
//     },
//     body,
//     {
//       new: true
//     }
//   );
//   return data;
// };

//delete single user
// export const deleteUser = async (id) => {
//   await User.findByIdAndDelete(id);
//   return '';
// };

//get single user
// export const getUser = async (id) => {
//   const data = await User.findById(id);
//   return data;
// };
