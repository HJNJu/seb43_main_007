import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BoardState {
   boardId: number;
}

const initialState: BoardState = {
   boardId: 0,
};

export const BoardIdSlice = createSlice({
   name: "boardId",
   initialState,
   reducers: {
      setBoardId: (state, action: PayloadAction<number>) => {
         // eslint-disable-next-line no-param-reassign
         state.boardId = action.payload;
      },
   },
});

export const { setBoardId } = BoardIdSlice.actions;

export default BoardIdSlice.reducer;
