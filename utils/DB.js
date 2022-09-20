const mongoose = require("mongoose");

const ConnectDB = () => {
  try {
    const connection = mongoose
      .connect(process.env.MONGODB_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("DB successfully connected"))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

module.exports = ConnectDB;
