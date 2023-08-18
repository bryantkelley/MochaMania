import {
  Platform,
  PlatformColor,
  StyleSheet,
  View,
  Text,
  ViewStyle,
  StyleProp,
} from "react-native";

type RowViewProps = {
  text: string;
  style?: StyleProp<ViewStyle>;
};

export const Badge = ({ text, style }: RowViewProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginHorizontal: 4,
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
