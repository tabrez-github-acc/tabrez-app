const fetch = require("node-fetch");

const {
  GITHUB_CLIENT_ID,
  GITHUB_SCOPE,
  GITHUB_CLIENT_SECRET,
} = require("../appConstans");
const { response } = require("express");

const getURL = () => {
  return `https://github.com/login/oauth/authorize?scope=${GITHUB_SCOPE}&client_id=${GITHUB_CLIENT_ID}`;
};

const createToken = async (requestToken) => {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: requestToken,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.json();
};

const getUser = async (token) => {
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const getUserEmail = async (token) => {
  const response = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

module.exports = {
  getURL,
  createToken,
  getUser,
  getUserEmail,
};
