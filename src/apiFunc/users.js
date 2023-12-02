import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_API_URL}/users/`;

export const signupApi = async (data) => {
  try {
    const response = await axios.post(`${url}register/`, data);
    return response;
  } catch (error) {
    return Promise.reject(new Error(error.response.data.error))
  }
};

export const loginApi = async (data) => {
  const response = await axios.post(`${url}login/`, data);
  return response;
};

export const metadataApi = async (token) => {
  const response = await axios.get(`${url}metadata/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const logoutApi = async (token) => {
  const response = await axios.delete(`${url}logout/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response;
};
