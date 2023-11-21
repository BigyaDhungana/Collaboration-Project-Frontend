import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_API_URL}/cdn/project-media/`;

export const getMediaListApi = async (token) => {
  const response = await axios.get(url, { headers: { Authorization: token } });
  return response;
};

export const uploadMediaApi = async (token, data) => {
  const response = await axios.post(url, data, {
    headers: { Authorization: token },
  });
  return response;
};

export const deleteMediaApi = async (token, mediaId) => {
  const response = await axios.get(
    url,
    { media: mediaId },
    { headers: { Authorization: token } }
  );
  return response;
};
