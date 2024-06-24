import request from "../../utils/request";

export const getData = () => {
  return request.get("/home/getData");
};

export const getEchartData = () => {
  return request.get("/home/getEchartData");
};

export const getUser = (params) => {
  return request.request({
    url: "/user/getUser",
    method: "get",
    params,
  });
};
export const addUser = (params) => {
  return request.post("/user/addUser", params);
};

export const updateUser = (params) => {
  return request.post("/user/updateUser", params);
};

export const deleteUser = (params) => {
  return request.post("/user/deleteUser", params);
};
