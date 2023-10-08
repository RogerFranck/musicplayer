import { useEffect, useState } from 'react';
import { getPlayListsByCountry } from '../../../service/playListServices';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { PlayListInterface, setMusicDetail, addHistory, setPlayList } from '../../../redux/context/playListSlice';
import usePlayer from '../../../hooks/usePlayer';
import useBottomSheet from '../../../hooks/useBottomSheet';


export default function usePlayList() {
  const dispatch = useAppDispatch();
  const selector = (state: any) => state.playListReducer.music
  const dataTrack = useAppSelector(selector);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [playList, setPlayListState] = useState<PlayListInterface[]>([]);
  const playerhook = usePlayer();
  const bottomSheet = useBottomSheet();
  
  
  const getPlayListByPage = async (refreshing = false) => {
    try {
      if (!refreshing) {
        setLoading(true);
      }
      const { data } = await getPlayListsByCountry('spain', page);
      const { tracks } = data;
      const newPlayList = refreshing ? tracks.track : [...playList, ...tracks.track];
      dispatch(setPlayList(newPlayList));
      setPlayListState(newPlayList);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayMusic = (track: PlayListInterface) => {
    dispatch(addHistory(track))
    dispatch(setMusicDetail(track))
  }

  useEffect(() => {
    getPlayListByPage();
  }, []);

  return {
    playList,
    loading,
    loadMoreData: getPlayListByPage,
    handlePlayMusic,
    dataTrack,
    ...playerhook,
    ...bottomSheet
  };
}
