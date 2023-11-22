import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_API_URL}/cdn/documents/`;

export const getDocumentListApi = async (token) => {
  const response = await axios.get(url, {
    headers: { Authorization: `Token ${token}` },
  });
  return response;
};

export const uploadDocumentApi = async (token, data) => {
  const response = await axios.post(url, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return response;
};

export const deleteDocumentApi = async (token, docId) => {
  const response = await axios.delete(
    url,
    { document: docId },
    { headers: { Authorization: `Token ${token}` } }
  );
  return response;
};
