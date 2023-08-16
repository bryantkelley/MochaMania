import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type RowViewProps = PropsWithChildren & {
  style?: StyleProp<ViewStyle>;
};

export const RowView = ({ children, style }: RowViewProps) => {
  return <View style={[rowStyle.container, style]}>{children}</View>;
};

const rowStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: 4,
  },
});
