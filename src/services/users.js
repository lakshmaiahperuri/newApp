import axios from "axios";

const apiServer= axios.create({
  baseURL:"http://localhost:4000",
  withCredentials:false,
  headers: {
    Accept: "application/json",
    "content-type": "application/json"
  }
});
export default{

  //Adding a product
  createUser(user){
   return apiServer.post("/posts/userAdd",
   {
     id : user.id,
     name : user.name,
     email : user.email,
     mobile : user.mobile,
     password : user.password,

   });
  },
  // Getting list of all the products
  login(user){
    return apiServer.post(`/posts/login`,
    {
      email : user.email,
      password : user.password
    });
  },
}