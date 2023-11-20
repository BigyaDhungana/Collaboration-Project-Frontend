import axios from "axios";

const url = "http://192.168.18.135:8000/";

export const signupApi= async (data) => {
  const response = await axios.post(`${url}users/register/`,data);
  return response
};

export const loginApi=async(data)=>{
  const response = await axios.post(
    "http://192.168.18.135:8000/users/login/",
    data
  );
  return response
}