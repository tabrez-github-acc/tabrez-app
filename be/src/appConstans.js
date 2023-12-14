const GITHUB_CLIENT_ID = "XXX";
const GITHUB_CLIENT_SECRET = "XXX";
const GITHUB_SCOPE = "user:email";

const MONGODB_USERNAME = "XXX";
const MONGODB_SECRET = "XXX";
const MONGODB_DB = "integrations";
const MONGODB_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_SECRET}@cluster0.i9fkpne.mongodb.net/${MONGODB_DB}`;

module.exports = {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_SCOPE,
  MONGODB_URI,
};
