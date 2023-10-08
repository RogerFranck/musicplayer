import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { formatTime, secondsToMinutes } from "../utils/time";
import { ImageMusicInterface } from "../redux/context/playListSlice";

interface PropsInterface {
  artistName: string;
  duration: string;
  name: string;
  image: ImageMusicInterface[];
  isPlaying: boolean;
  togglePlayPause: any;
}

const MusicPlayer = ({
  artistName,
  duration,
  name,
  image,
  isPlaying,
  togglePlayPause,
}: PropsInterface) => {
  const [currentTime, setCurrentTime] = useState(0);
  const sizeControl = 32;

  const updateTime = (value: number) => {
    setCurrentTime(value);
  };

  const durationView = secondsToMinutes(Number(duration));

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image[2]["#text"],
        }}
        style={styles.coverImage}
      />
      <Text style={styles.songTitle}>{name}</Text>
      <Text style={styles.artistTitle}> {artistName} </Text>
      <View style={styles.progressContainer}>
        <View style={styles.sidebar}>
          <Text style={styles.sidebarText}>{formatTime(currentTime)}</Text>
        </View>
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={Number(duration)}
          value={currentTime}
          onValueChange={updateTime}
          minimumTrackTintColor="gray"
          thumbTintColor="gray"
        />
        <View style={styles.sidebar}>
          <Text style={styles.sidebarText}>{durationView}</Text>
        </View>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name="banckward" size={sizeControl} color="gray" />
        </TouchableOpacity>
        <View style={styles.PlayConsole}>
          <AntDesign
            name={!isPlaying ? "caretright" : "pause"}
            size={sizeControl + 24}
            color="gray"
            onPress={togglePlayPause}
          />
        </View>
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name="forward" size={sizeControl} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
  },
  coverImage: {
    width: 225,
    height: 225,
    borderRadius: 10,
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  artistTitle: {
    fontSize: 14,
    marginBottom: 30,
  },
  progressContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  sidebar: {
    width: 50,
    alignItems: "center",
  },
  sidebarText: {
    fontSize: 12,
  },
  progressBar: {
    flex: 1,
    height: 40,
  },
  controls: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 40,
  },
  PlayConsole: {
    backgroundColor: "#E2E2E2",
    borderRadius: 50,
    padding: 10,
  },
});

export default MusicPlayer;
