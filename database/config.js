const mongoose = require("mongoose");

const dbconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODBCNN, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connect to Database Succesfull");
  } catch (error) {
    console.log(error);
    throw new Error("NO DATABASE CONNECT APP NO WORKING");
  }
};

module.exports = {
  dbconnection,
};
