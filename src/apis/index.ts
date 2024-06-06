import { DataType } from "../store/modules/missionStore";

// 获取列表数据
export const getListData = () => {
  return new Promise<DataType[]>((resolve, reject) => {
    try {
      const data: DataType[] = [
        {
          key: "1",
          mission: "吃饭🍚，今日吃猪肉炖粉条子，很不错，吃的很饱",
        },
        {
          key: "2",
          mission: "睡觉😴，今天休息得很充分，睡了一个美美的觉",
        },
        {
          key: "3",
          mission: "学习📚，今天学习了新的知识，感觉收获颇丰",
        },
        {
          key: "4",
          mission: "写作✍️，完成了一篇新的文章，内容十分丰富",
        },
        {
          key: "5",
          mission: "锻炼🏋️‍♂️，进行了一次高强度训练，感觉身体更健康了",
        },
        {
          key: "6",
          mission: "打扫卫生🧹，今天打扫了整个房间，清洁度达到了百分之百",
        },
        {
          key: "7",
          mission: "看电影🎬，观看了一部经典电影，情节非常精彩",
        },
        {
          key: "8",
          mission: "购物🛍️，买到了心仪已久的商品，非常开心",
        },
        {
          key: "9",
          mission: "写代码💻，解决了一个复杂的问题，感觉程序更加完善了",
        },
        {
          key: "10",
          mission: "散步🚶‍♂️，在公园里散步，心情愉悦，身心放松",
        },
        {
          key: "11",
          mission: "喝水🚰，今天多喝了一些水，感觉身体更加清爽了",
        },
        {
          key: "12",
          mission: "浏览新闻📰，了解到了很多最新的新闻资讯，增长了见识",
        },
        {
          key: "13",
          mission: "做家务🧺，完成了一系列的家务事，家里变得整洁了",
        },
        {
          key: "14",
          mission: "拜访朋友👫，和好友聚会，度过了愉快的时光",
        },
        {
          key: "15",
          mission: "听音乐🎵，欣赏了一段美妙的音乐，情绪得到了释放",
        },
        {
          key: "16",
          mission: "做饭🍳，亲自动手做了一顿美味的饭菜，味道十分可口",
        },
        {
          key: "17",
          mission: "写日记📝，记录了一天的生活点滴，感受到了内心的平静",
        },
        {
          key: "18",
          mission: "看书📖，沉浸在书海中，享受阅读的乐趣",
        },
        {
          key: "19",
          mission: "写邮件📧，发送了一封重要的邮件，完成了一项任务",
        },
        {
          key: "20",
          mission: "旅行✈️，踏上了一次美妙的旅程，留下了美好的回忆",
        },
      ];

      setTimeout(() => {
        resolve(data);
      }, 500);
    } catch (error) {
      reject(error);
    }
  });
};
