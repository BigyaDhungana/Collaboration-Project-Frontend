import axios from "axios";

url = `${process.env.NEXT_PUBLIC_API_URL}/api/team-members/`;

const getTeamMembersApi = async (token, data) => {
  const response = await axios.get(url, {
    headers: { Authorization: `Token ${token}` },
    params: data,
  });
  return response;
};
