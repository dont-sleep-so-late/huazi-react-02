import Mock from "mockjs";

Mock.setup({
  timeout: "200-600",
});

//登录
Mock.mock(/user\/login/, "post", {
  code: 200,
  msg: "登录成功",
  data: {
    token: Mock.Random.guid(),
  },
});
