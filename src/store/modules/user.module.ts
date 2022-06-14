import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "@/service/user";

const fetchCount = (amount = 1): Promise<{data: number}> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}
// createAsyncThunk会提供一个thunk对象，可以使用它的dispatch方法将请求的结果转发给其他的reducer处理
export const incrementAsync = createAsyncThunk(
  'user/fetchUserInfo',
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userInfoAsync = createAsyncThunk(
  'user/getUserInfo',
  async () => {
    const response = await getUserInfo();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export interface IUser {
  userId: string;
  userName: string;
  email: string;
  token: string;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: () => ({
    userId: '',
    userName: '',
    email: '',
    token: '',
  } as IUser),
  reducers: {
    setUserInfo: (state, action) => {
      state = { ...state, ...action.payload }
    },
    resetToken: (state) => {
      state.token = '';
    },
  },
  // 在extraReducers中可以对请求结果的成功失败，做不同的处理
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        // state.status = 'idle';
        // state.value += action.payload;
      });
  }
});

export const { setUserInfo, resetToken } = userSlice.actions;

export default userSlice.reducer;
