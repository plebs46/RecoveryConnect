export default {
  expo: {
    name: "RecoveryConnect",
    slug: "RecoveryConnect",
    version: "1.0.0",

    extra: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY
    }
  }
};