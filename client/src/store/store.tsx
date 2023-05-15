import { configureStore } from "@reduxjs/toolkit";
import profilePhotoReducer from "../reducers/ProfilePhotoSlice";
import profileNicknameSlice from "../reducers/ProfileNicknameSlice";
import memberIdSlice from "../reducers/memberIdSlice";

const store = configureStore({
   reducer: {
      profilePhoto: profilePhotoReducer,
      profileNickname: profileNicknameSlice,
      memberId: memberIdSlice,
   },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
