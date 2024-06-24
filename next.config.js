const { PHRASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (env) => {
  if (env === PHRASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://tristanvera19:emiliano789@cluster0.cs9vw2p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",

        MONGODB_DATABASE: "calendar",
        NEXTAUTH_SECRET:
          "lijhdfosdfhgdrgjpregoqjszedezfzegfgjqzero*gjierqphqpirhegirphehg",
        NEXTAUTH_URL: "http://localhost:3000/",
      },
    };
  } else {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://tristanvera19:emiliano789@cluster0.cs9vw2p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",

        MONGODB_DATABASE: "calendar",
        NEXTAUTH_SECRET:
          "lijhdfosdfhgdrgjpregoqjszedezfzegfgjqzero*gjierqphqpirhegirphehg",
        NEXTAUTH_URL: "https://calendar-weld.vercel.app/",
      },
    };
  }
};
