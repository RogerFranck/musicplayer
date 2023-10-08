import React from "react";
import { Text, View } from "react-native";

interface LoaderContainerProps {
  loading: boolean;
  children: React.ReactNode;
  style?: any;
}

export default function LoaderContainer({
  loading,
  children,
  style,
}: LoaderContainerProps) {
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <View style={style}>{children}</View>;
}
