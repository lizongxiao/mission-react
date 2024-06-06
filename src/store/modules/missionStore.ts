import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DataType {
  key: React.Key;
  mission: string;
}

export interface MissionState {
  mission: DataType[];
}

export interface ActionType {
  data?: DataType[];
  key?: string;
}

const initialState: MissionState = {
  mission: [],
};

const missionSlice = createSlice({
  name: "mission",
  initialState,
  reducers: {
    // 初始化任务列表
    initMission(
      state: { mission: DataType[] },
      action: PayloadAction<ActionType>
    ) {
      state.mission = action.payload?.data || [];
    },

    // 新建任务
    addMission(
      state: { mission: DataType[] },
      action: PayloadAction<DataType>
    ) {
      state.mission.push({
        ...action.payload,
        key: new Date().getTime().toString(),
      });
    },
    // 删除任务
    delMission(
      state: { mission: DataType[] },
      action: PayloadAction<ActionType>
    ) {
      const { key } = action.payload;
      state.mission = state.mission.filter((item) => item.key !== key);
    },
  },
});

// 解构出来actionCreater函数
const { addMission, delMission, initMission } = missionSlice.actions;
// 解构出来reducer
const missionReducer = missionSlice.reducer;

// 按需导出的方式导出actionCreater
export { addMission, delMission, initMission };

// 默认导出的方式导出reducer
export default missionReducer;
