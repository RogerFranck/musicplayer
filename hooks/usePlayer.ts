import  { useState } from 'react'

export default function usePlayer() {

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return {
    isPlaying,
    togglePlayPause
  }
}
