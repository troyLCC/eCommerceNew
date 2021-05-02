const app = require("./app");
//returning console log saying the db is connected
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
//Handle the uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down server due to uncaught exception`);
  process.exit(1);
});

//gives us access to port, mongoURI and something else ...
dotenv.config({ path: "backend/config/config.env" });

//connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down the server due to unhandeled rejection`);
  server.close(() => {
    process.exit(1);
  });
});
