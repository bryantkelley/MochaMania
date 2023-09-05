import { useTheme } from "@react-navigation/native";
import { StyleSheet, View, Text, ViewStyle, StyleProp } from "react-native";

type RowViewProps = {
  text: string;
  style?: StyleProp<ViewStyle>;
};

export const Badge = ({ text, style }: RowViewProps) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.card }, style]}>
      <Text style={[styles.badgeText, { color: colors.text }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 16,
  },
  badgeText: {
    textTransform: "uppercase",
    fontSize: 12,
  },
});
