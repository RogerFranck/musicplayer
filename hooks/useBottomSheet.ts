import  { useRef } from 'react'

export default function useBottomSheet() {

  const bottomSheetModalRef = useRef<any>(null);
  const snapPoints = ["85%"];

  const handleOpenBottomSheetModal = () => {
    bottomSheetModalRef.current?.present();
  };

  return {
    bottomSheetModalRef,
    snapPoints,
    handleOpenBottomSheetModal
  }
}