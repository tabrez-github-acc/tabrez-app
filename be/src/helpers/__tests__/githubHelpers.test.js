const dotenv = require("dotenv");
const fetch = require("node-fetch");

const {
  getURL,
  createToken,
  getUser,
  getUserEmail,
} = require("../githubHelpers");

jest.mock("node-fetch");
dotenv.config();

describe("Test the Github helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("It should return the correct Github URL for the integration", () => {
    const url = getURL();
    expect(url).toBe(
      `https://github.com/login/oauth/authorize?scope=${process.env.GITHUB_SCOPE}&client_id=${process.env.GITHUB_CLIENT_ID}`
    );
  });

  test("It should return the token from Github", async () => {
    const mockRequestToken = "12345";
    const mockSuccessResponse = {
      access_token: "gho_XXX",
      token_type: "bearer",
      scope: "user:email",
    };
    fetch.mockReturnValueOnce({
      json: () => {
        return mockSuccessResponse;
      },
    });
    const response = await createToken(mockRequestToken);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: mockRequestToken,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    expect(response).toMatchObject(mockSuccessResponse);
  });

  test("It should return the user details from Github", async () => {
    const mockToken = "gho_XXX";
    const mockSuccessResponse = {
      login: "github-acc",
      id: 1111111111,
      node_id: "U_XXX",
      avatar_url: "https://avatars.githubusercontent.com/u/111111111?v=4",

      created_at: "2023-12-14T09:25:32Z",
      updated_at: "2023-12-14T13:02:52Z",
    };
    fetch.mockReturnValueOnce({
      json: () => {
        return mockSuccessResponse;
      },
    });
    const response = await getUser(mockToken);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    });
    expect(response).toMatchObject(mockSuccessResponse);
  });

  test("It should return the user email from Github", async () => {
    const mockToken = "gho_XXX";
    const mockSuccessResponse = [
      {
        email: "github.acc@gmail.com",
        primary: true,
        verified: true,
        visibility: "private",
      },
    ];
    fetch.mockReturnValueOnce({
      json: () => {
        return mockSuccessResponse;
      },
    });
    const response = await getUserEmail(mockToken);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    });
    expect(response).toMatchObject(mockSuccessResponse);
  });
});
