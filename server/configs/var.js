const dotenv = require("dotenv");
dotenv.config();

const requiredEnvs = ["MONGO_URI", "PORT", "SECRETKEY"];

requiredEnvs.forEach((key) => {
  if (!process.env[key]) {
    console.log("missing key", key);
    process.exit(1);
  }
});

const databaseUri = process.env.MONGO_URI;
const port = process.env.PORT;
const jwtsecret = process.env.SECRETKEY;

module.exports = { databaseUri, port, jwtsecret };
