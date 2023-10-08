import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import usePlayList from "./hooks/usePlayList";
import { PlayListInterface } from "../../redux/context/playListSlice";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../const/color";
import MiniPlayer from "../../components/MiniPlayer";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import MusicPlayer from "../../components/Player";
import CardMusic from "../../components/CardMusic";

export default function PlayList() {
  const {
    playList,
    loadMoreData,
    handlePlayMusic,
    dataTrack,
    isPlaying,
    togglePlayPause,
    bottomSheetModalRef,
    handleOpenBottomSheetModal,
    snapPoints,
  } = usePlayList();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadMoreData(true);
    setIsRefreshing(false);
  };

  return (
    <View style={styles.root}>
      <FlatList
        data={playList}
        keyExtractor={(item: PlayListInterface) => item.name}
        renderItem={({ item }: { item: PlayListInterface }) => (
          <CardMusic key={item.mbid} {...item} onPress={handlePlayMusic} />
        )}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadMoreData()}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
      {dataTrack && (
        <>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: SECONDARY_COLOR }}
          >
            <MusicPlayer
              artistName={dataTrack.artist.name}
              duration={dataTrack.duration}
              name={dataTrack.name}
              image={dataTrack.image}
              isPlaying={isPlaying}
              togglePlayPause={togglePlayPause}
            />
          </BottomSheetModal>
          <MiniPlayer
            onPress={handleOpenBottomSheetModal}
            dataTrack={dataTrack}
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
});
