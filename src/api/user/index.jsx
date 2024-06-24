import request from "../../utils/request";

export const login = (param) => {
  return request.post("/user/login", param);
};
