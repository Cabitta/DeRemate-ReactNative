import { Platform, Linking } from "react-native";

export const openGoogleMaps = (location) => {
  const browserUrl = `https://www.google.com/maps/search/?api=1&query=${location}`;
  const url = Platform.select({
    ios: `maps:0,0?q=${location}`,
    android: `geo:0,0?q=${location}`,
  });

  if (Platform.OS === "web") {
    window.open(browserUrl, "_blank");
    return;
  }

  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        return Linking.openURL(browserUrl);
      }
    })
    .catch((err) => console.error("Error al abrir Google Maps:", err));
};
