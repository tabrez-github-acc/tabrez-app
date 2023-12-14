const { get } = require("mongoose");

const {
  getURL,
  createToken,
  getUser,
  getUserEmail,
} = require("../helpers/githubHelpers");
const { githubIntegrationModel } = require("../models/githubIntegrationSchema");

const getIntegrationURL = async (req, res) => {
  const label = "Connect";
  const url = getURL();
  res.status(200).json({
    label,
    url,
  });
};

const createAccessID = async (req, res) => {
  try {
    const requestToken = req.query.code;
    const data = await createToken(requestToken);
    if (data.error)
      return res
        .status(200)
        .json({ error: data.error, errorDesc: data.error_description });
    const { access_token, scope, token_type } = data;
    const result = await githubIntegrationModel.create({
      access_token: access_token,
      scope: scope,
      token_type: token_type,
    });
    res.status(200).json({
      access_id: result._id,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getStatus = async (req, res) => {
  try {
    const access_id = req.query.access_id;
    const access = await githubIntegrationModel.findById(access_id);
    if (!access)
      return res.status(404).json({
        error: "Access ID not found",
      });

    const user = await getUser(access.access_token);
    const userEmail = await getUserEmail(access.access_token);
    res.status(200).json({
      status: "Connected",
      createdAt: access.createdAt,
      scope: access.scope,
      user,
      userEmail,
    });
  } catch (error) {
    res.status(404).json({
      error: "Access ID not found",
    });
  }
};

const removeToken = async (req, res) => {
  try {
    const access_id = req.query.access_id;
    const access = await githubIntegrationModel.findById(access_id);
    if (!access)
      return res.status(404).json({
        error: "Access ID not found",
      });
    await githubIntegrationModel.findByIdAndDelete(access_id);
    res.status(200).json({
      message: "Access ID removed",
    });
  } catch (error) {
    res.status(404).json({
      error: "Access ID not found",
    });
  }
};

module.exports = {
  getIntegrationURL,
  createAccessID,
  getStatus,
  removeToken,
};
