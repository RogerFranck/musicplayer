import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { SECONDARY_COLOR } from "../const/color";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { PlayListInterface } from "../redux/context/playListSlice";

interface MiniPlayerInterface {
  onPress: () => void;
  dataTrack: PlayListInterface;
  isPlaying: boolean;
  togglePlayPause: any;
}

export default function MiniPlayer({
  onPress,
  dataTrack,
  isPlaying,
  togglePlayPause,
}: MiniPlayerInterface) {
  const sizeControl = 24;

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={onPress} style={styles.controls}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: dataTrack.image[0]["#text"],
          }}
        />
        <View>
          <Text style={styles.primaryText}> {dataTrack.name} </Text>
          <Text style={styles.artistTitle}> {dataTrack.artist.name} </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name="banckward" size={sizeControl} color="gray" />
        </TouchableOpacity>
        <AntDesign
          name={!isPlaying ? "caretright" : "pause"}
          size={sizeControl}
          color="gray"
          onPress={togglePlayPause}
        />
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name="forward" size={sizeControl} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: SECONDARY_COLOR,
    height: 100,
    width: "100%",
    borderTopStartRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  tinyLogo: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  primaryText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
  },
  artistTitle: {
    fontSize: 14,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 15,
  },
});
