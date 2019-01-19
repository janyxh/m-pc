import Mock from "mockjs";
const Random = Mock.Random;
// 数据

// 获取分组
export const getGroup = {
  // name: "@name",

  // "age|1-100": 100,

  // color: "@color"
  data: {
    "list|1-8": [
      {
        createTime: Random.date(),
        createUserId: 0,
        createUserName: "",
        deleteFlag: false,
        id: Number(Random.id()),
        name: Random.ctitle(),
        updateTime: 0,
        updateUserId: 0,
        updateUserName: ""
      }
    ],
    "total|1-8": 0
  },
  message: "success",
  respCode: "0000"
};
