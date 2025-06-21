require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/connectDB");
const PORT = process.env.PORT || 5000;

if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running at PORT ${PORT}`);
      });
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = app;
