import mongoose, { ConnectOptions } from "mongoose";
import config from "./config";

(async () => {
  try {
    const db = await mongoose.connect(
      `mongodb+srv://admin:${config.MONGO_PASSWORD}@cluster0.gxjqo.mongodb.net/${config.MONGO_DATABASE}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        /* user: config.MONGO_USER,
        pass: config.MONGO_PASSWORD, */
      } as ConnectOptions
    );
    console.log("database connected to: ", db.connection.name);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
