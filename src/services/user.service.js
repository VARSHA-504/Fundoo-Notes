import User from '../models/user.model';
import  bcrypt from 'bcrypt';
 import jwt from 'jsonwebtoken';

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
    // console.log(data.password);
    // console.log(userData.password);
    // console.log(passwordCheck);
    if(passwordCheck){
      let token = jwt.sign({firstName: data.firstName, email: data.email, id: data._id }, process.env.SECRET_KEY);
      console.log(token);
      return token;
    }
    else {
      throw new Error("Password not match");
    }
  }
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
