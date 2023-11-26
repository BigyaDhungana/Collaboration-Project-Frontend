import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_API_URL}/api/todos/`;

export const getTodoListApi = async (token, data) => {
  const response = await axios.get(url, {
    headers: { Authorization: `Token ${token}` },
    params:data,
  });
  return response;
};

export const addTodoApi = async (token, data) => {
  const response = await axios.post(url, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return response;
};

export const deleteTodoApi = async (token, data) => {
  const response = await axios.delete(url, {
    data: data,
    headers: { Authorization: `Token ${token}` },
  });
  return response;
};

export const updataTodoApi = async (token, data) => {
  //data={todo:teamid,status:0,1,2}
  const response = await axios.patch(url, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return response;
};