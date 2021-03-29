const mongoose = require("mongoose");
const db = process.env.MONGO_URI;
console.log(`db string = ${db}`);

const connectDB = async () => {
  try {
    console.log("attept to connct to db");
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("mongoDB connected..");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
