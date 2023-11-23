import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_API_URL}/cdn/project-media/`;

export const getMediaListApi = async (token, data) => {
  const response = await axios.get(url, {
    headers: { Authorization: `Token ${token}` },
    params: data,
  });
  return response;
};

export const uploadMediaApi = async (token, data) => {
  const response = await axios.post(url, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return response;
};

export const deleteMediaApi = async (token, data) => {
  const response = await axios.delete(url, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return response;
};
