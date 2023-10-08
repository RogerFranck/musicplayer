import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ImageMusicInterface = {
  "#text" : string,
  size : string
}

export type PlayListInterface = {
  mbid:string;
  name:string;
  duration: string;
  listeners: string;
  url: string;
  streamable: Object;
  artist: { 
    name: string,
    mbid: string,
    url: string
   };
   image: ImageMusicInterface[];
   "@attr": {
    rank: string
   }
}

type MusicState = {
  playList: PlayListInterface[];
  music: PlayListInterface | null
  history: PlayListInterface[];
};

const initialState = {
  playList: [],
  music: null,
  history: []
} as MusicState;

export const music = createSlice({
  name: "music",
  initialState,
  reducers: {
    reset: () => initialState,
    setPlayList: (state, action: PayloadAction<PlayListInterface[]>) => {
      state.playList = action.payload;
    },
    setMusicDetail: (state, action: PayloadAction<PlayListInterface>) => {
      state.music = action.payload;
    },
    addPlayList: (state, action: PayloadAction<PlayListInterface>) => {
      state.playList = [...state.playList, action.payload];
    },
    deletePlayList: (state, action: PayloadAction<string>) => {
      state.playList = state.playList.filter((x)=>x.mbid != action.payload);
    },
    updatePlayList:(state, action: PayloadAction<PlayListInterface>) => {
      state.playList = state.playList.map((usr) =>
        usr.mbid === action.payload.mbid ? action.payload : usr
      );
    },
    addHistory: (state, action: PayloadAction<PlayListInterface>) => {
      const maxHistoryLength = 10;
      const newHistory = action.payload;
      const existingIndex = state.history.findIndex((item) => item.mbid === newHistory.mbid);
    
      if (existingIndex === -1) {
        state.history.unshift(newHistory);
      } else {
        const existingItem = state.history[existingIndex];
        state.history.splice(existingIndex, 1);
        state.history.unshift(existingItem);
      }
    
      if (state.history.length > maxHistoryLength) {
        state.history.pop();
      }
    },
  },
});

export const {
  setPlayList,
  setMusicDetail,
  addPlayList,
  deletePlayList,
  updatePlayList,
  addHistory,
  reset,
} = music.actions;

export default music.reducer;
