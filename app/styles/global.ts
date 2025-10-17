import { StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.m,
  },
  text: {
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
  },
});
