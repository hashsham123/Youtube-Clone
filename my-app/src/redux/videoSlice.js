import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: {
    likes: [], // Initialize as an empty array
    dislikes: [], // Initialize as an empty array
  },
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      const video = state.currentVideo;
      if (video && Array.isArray(video.likes)) {
        const { payload } = action;
        if (!video.likes.includes(payload)) {
          video.likes.push(payload);
          const dislikeIndex = video.dislikes.findIndex((userId) => userId === payload);
          if (dislikeIndex !== -1) {
            video.dislikes.splice(dislikeIndex, 1);
          }
        }
      }
    },
    dislike: (state, action) => {
      const video = state.currentVideo;
      if (video && Array.isArray(video.dislikes)) {
        const { payload } = action;
        if (!video.dislikes.includes(payload)) {
          video.dislikes.push(payload);
          const likeIndex = video.likes.findIndex((userId) => userId === payload);
          if (likeIndex !== -1) {
            video.likes.splice(likeIndex, 1);
          }
        }
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } =
  videoSlice.actions;

export default videoSlice.reducer;