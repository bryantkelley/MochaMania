import { Platform, PlatformColor, StyleSheet, View, Text } from "react-native";

type RowViewProps = {
  text: string;
};

export const Badge = ({ text }: RowViewProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    ...Platform.select({
      ios: {
        backgroundColor: PlatformColor("secondarySystemBackground"),
      },
    }),
    borderRadius: 16,
  },
  badgeText: {
    textTransform: "uppercase",
    fontSize: 12,
    ...Platform.select({
      ios: {
        color: PlatformColor("secondarylabel"),
      },
    }),
  },
});
