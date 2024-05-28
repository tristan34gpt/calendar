const { PHRASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (env) => {
  if (env === PHRASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://tristanvera19:<password>@cluster0.wztaary.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      },
    };
  } else {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://tristanvera19:<password>@cluster0.wztaary.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      },
    };
  }
};
