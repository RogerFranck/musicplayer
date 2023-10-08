import React from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { PRIMARY_COLOR, PRIMARY_TEXT } from "../../const/color";
import CardMusic from "../../components/CardMusic";
import { PlayListInterface } from "../../redux/context/playListSlice";
import useProfile from "./hooks/useProfile";

export default function Profile() {
  const { dataTrack } = useProfile();
  return (
    <View style={styles.root}>
      <Text style={styles.primaryText}>Last songs played</Text>
      <FlatList
        data={dataTrack}
        keyExtractor={(item: PlayListInterface) => item.name}
        renderItem={({ item }: { item: PlayListInterface }) => (
          <CardMusic key={item.mbid} {...item} onPress={() => {}} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  primaryText: {
    color: PRIMARY_TEXT,
    alignSelf: "center",
    marginBottom: 20,
  },
});
