import { setMusicDetail } from "../redux/context/playListSlice";
import { axiosGet, useGet } from "../utils/fetch";

/* export const useGetUserById = (id: number) => useGet({ 
  url: `${USER_API}/${id}`, 
  itemList: 'user', 
  store: 'userReducer', 
  setItem: setMusicDetail 
}) */

export const getPlayListsByCountry = (country: string , page: number) => axiosGet({ 
  url: `?method=geo.gettoptracks&country=${country}&api_key=${process.env.EXPO_PUBLIC_API_KEY}&format=json&page=${page}` 
})
