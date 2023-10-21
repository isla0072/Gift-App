export const config = {
  fonts: {
    heading: "Lato_700Bold",
    body: "Lato_400Regular",
    mono: "monospace",
  },
  colors: {
    primary: "#0587FF", // Primary blue
    secondary: "#6437E5", // Secondary purple
    text: {
      primary: "#2d2d2d", // Dark text
      secondary: "#757575", // Light gray for less emphasized text
    },
    background: {
      main: "#FFFFFF", // White background
      secondary: "#F5F5F5", // Light gray background
    },
    border: "#E2E2E2", // Border color
    error: "#FF3B30", // Error color
    success: "#28CD41", // Success color
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
  },
  button: {
    default: {
      backgroundColor: "#0587FF", // Default to primary color
      textColor: "#FFFFFF", // Text color is white
    },
    outline: {
      backgroundColor: "transparent", // Transparent background
      borderColor: "#0587FF", // Outline using primary color
      textColor: "#0587FF", // Text color is primary color
    },
  },
};
