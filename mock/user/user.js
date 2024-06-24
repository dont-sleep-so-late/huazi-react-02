// 引入mockjs库
import Mock from "mockjs";

Mock.setup({
  timeout: "2000-6000",
});

let List = [
  {
    id: 1,
    name: "张三",
    role: "软件工程师",
    skills: "Python",
    region: "北京",
  },
  {
    id: 2,
    name: "李四",
    role: "数据分析师",
    skills: "R",
    region: "上海",
  },
  {
    id: 3,
    name: "王五",
    role: "产品经理",
    skills: "需求分析",
    region: "深圳",
  },
  {
    id: 4,
    name: "赵六",
    role: "UI设计师",
    skills: "Photoshop",
    region: "广州",
  },
  {
    id: 5,
    name: "钱七",
    role: "前端工程师",
    skills: "HTML, CSS, JavaScript",
    region: "杭州",
  },
  {
    id: 6,
    name: "孙八",
    role: "后端工程师",
    skills: "Python, Java",
    region: "成都",
  },
  {
    id: 7,
    name: "周九",
    role: "测试工程师",
    skills: "自动化测试",
    region: "重庆",
  },
  {
    id: 8,
    name: "吴十",
    role: "运维工程师",
    skills: "Linux, Docker",
    region: "武汉",
  },
  {
    id: 9,
    name: "郑十一",
    role: "网络安全工程师",
    skills: "网络安全知识",
    region: "南京",
  },
  {
    id: 10,
    name: "王十二",
    role: "大数据工程师",
    skills: "Hadoop, Spark",
    region: "苏州",
  },
  {
    id: 11,
    name: "李十三",
    role: "人工智能工程师",
    skills: "Python, TensorFlow",
    region: "杭州",
  },
  {
    id: 12,
    name: "张十四",
    role: "区块链工程师",
    skills: "区块链知识",
    region: "深圳",
  },
  {
    id: 13,
    name: "王十五",
    role: "游戏开发工程师",
    skills: "Unity, C#",
    region: "广州",
  },
  {
    id: 14,
    name: "赵十六",
    role: "VR/AR开发工程师",
    skills: "Unity, C#",
    region: "北京",
  },
  {
    id: 15,
    name: "钱十七",
    role: "游戏测试工程师",
    skills: "游戏测试知识",
    region: "上海",
  },
  {
    id: 16,
    name: "孙十八",
    role: "游戏运维工程师",
    skills: "Linux, Docker",
    region: "深圳",
  },
  {
    id: 17,
    name: "周十九",
    role: "游戏安全工程师",
    skills: "网络安全知识",
    region: "北京",
  },
];

Mock.mock(/home\/getData/, "get", () => {
  return {
    code: 200,
    msg: "success",
    data: List,
  };
});

Mock.mock(/user\/getUser/, "post", ({ body }) => {
  const { name, role, region, page = 1, limit = 10 } = JSON.parse(body);

  const mockList = List.filter((user) => {
    if (name && user.name.indexOf(name) === -1) return false;
    if (role && user.role.indexOf(role) === -1) return false;
    if (region && user.region.indexOf(region) === -1) return false;
    return true;
  });
  const pageList = mockList.filter(
    (item, index) => index < limit * page && index >= limit * (page - 1)
  );
  return {
    code: 200,
    total: mockList.length,
    data: pageList,
  };
});

Mock.mock(/home\/getEchartData/, "get", () => {
  return {
    code: 200,
    msg: "success",
    data: {
      date: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      tableData: [
        {
          name: "china",
          value: [140, 232, 101, 264, 90, 340, 250],
        },
        {
          name: "usa",
          value: [120, 282, 111, 234, 220, 340, 310],
        },
        {
          name: "uk",
          value: [60, 191, 234, 290, 330, 310, 120],
        },
        {
          name: "russia",
          value: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    },
  };
});

Mock.mock(/user\/addUser/, "post", (config) => {
  const { name, role, skills, region } = JSON.parse(config.body);
  List.unshift({
    id: Mock.Random.guid(),
    name,
    role,
    skills,
    region,
  });
  return {
    code: 200,
    msg: "success",
    data: {
      message: "添加成功",
    },
  };
});

Mock.mock(/user\/updateUser/, "post", (config) => {
  const { id, name, role, skills, region } = JSON.parse(config.body);
  List.some((u) => {
    if (u.id === id) {
      u.name = name;
      u.role = role;
      u.skills = skills;
      u.region = region;
      return true;
    }
  });
  return {
    code: 200,
    msg: "success",
    data: {
      message: "编辑成功",
    },
  };
});

Mock.mock(/user\/deleteUser/, "post", (config) => {
  console.log(config);
  const { id } = JSON.parse(config.body);
  if (!id) {
    return {
      code: 400,
      message: "参数不正确",
    };
  } else {
    List = List.filter((u) => u.id !== id);
    return {
      code: 200,
      message: "删除成功",
    };
  }
});
