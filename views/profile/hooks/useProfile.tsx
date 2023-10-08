import { useAppSelector } from "../../../redux/hooks";

export default function useProfile() {
  const selector = (state: any) => state.playListReducer.history;
  const dataTrack = useAppSelector(selector);
  return {
    dataTrack,
  };
}
