import { DefaultTheme } from "@react-navigation/native"

export const LightTheme = {
...DefaultTheme,
colors: {
    ...DefaultTheme.colors,
    background: '#F1F5F9',
    textPrimary: '#5F6671',
    textSecondary: '#E0DBF0',
    iconPrimary: '#0C111F',
    iconSecondary: '#B3B9C0',
    minimumTintcolor: '#060C1A',
    maximumTintcolor: '#D3D7DF',
  },
}