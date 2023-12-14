const { Schema, model } = require("mongoose");

const githubIntegrationSchema = new Schema(
  {
    access_token: String,
    scope: String,
    token_type: String,
    email: String,
  },
  { timestamps: true }
);

const githubIntegrationModel = model(
  "github-integration",
  githubIntegrationSchema
);

module.exports = {
  githubIntegrationModel,
};
