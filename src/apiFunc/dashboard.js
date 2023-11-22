import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/`;

export const dashboardApi = async (token) => {
  const response = await axios.get(url, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};
