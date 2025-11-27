import 'dotenv/config';

export default {
  expo: {
    name: "RecoveryConnect",
    slug: "RecoveryConnect",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/RecoveryConnect.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,

    splash: {
      image: "./assets/RecoveryConnect.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },

    ios: {
      supportsTablet: true
    },

    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/RecoveryConnect.png",
        backgroundColor: "#ffffff"
      },
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_KEY
        }
      },
      edgeToEdgeEnabled: true,
      package: "com.hikaru17.RecoveryConnect"
    },

    web: {
      favicon: "./assets/RecoveryConnect.png"
    },

    plugins: [
      "expo-font"
    ],

    extra: {
      eas: {
        projectId: "e13b3ac5-3de3-4832-b507-55dbd35e1741"
      },
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY
    }
  }
};
