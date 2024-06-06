import { configureStore } from "@reduxjs/toolkit";

import missionReducer from "./modules/missionStore";

const store = configureStore({
  reducer: {
    missioner: missionReducer,
  },
});

export default store;
