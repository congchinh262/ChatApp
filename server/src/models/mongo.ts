import mongoose from "mongoose";
import { MONGO_DATABASE_NAME, MONGO_DATABASE_URL } from "../config";
import { error } from "console";

const config = {
  db: {
    url: MONGO_DATABASE_URL,
    name: MONGO_DATABASE_NAME,
  },
};

mongoose
  .set("strictQuery", true)
  .connect(config.db.url)
  .then(() => {
    console.log("Mongo has connected succesfully");
  })
  .catch((error) => {
    console.log("Mongo connection has an error", error);
    console.log('==========AUTH-INFO=============');
    console.log(MONGO_DATABASE_URL)
    console.log('==========/AUTH-INFO/=============');
    mongoose.disconnect();
  });
