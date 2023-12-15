const request = require("supertest");
const fetch = require("node-fetch");
const { githubIntegrationModel } = require("../models/githubIntegrationSchema");

const app = require("../app");

jest.mock("node-fetch");
jest.mock("../models/githubIntegrationSchema");

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          status: "OK",
        });
      });
  });
});

describe("Test the integration path", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("It should response the GET method for integration/url", () => {
    return request(app)
      .get("/integration/url")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          label: "Connect",
          url: "https://github.com/login/oauth/authorize?scope=user:email&client_id=494173e0c5daf718d86b",
        });
      });
  });

  test("It should response the GET method for integration/create", () => {
    githubIntegrationModel.create.mockResolvedValueOnce({
      _id: "abcde12345",
    });
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

    return request(app)
      .get(`/integration/create?code=${mockRequestToken}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          access_id: "abcde12345",
        });
      });
  });

  test("It should response the GET method for integration/status", () => {
    const mockModelResponse = {
      _id: "abcde12345",
      access_token: "gho_XXX",
      scope: "user:email",
      createdAt: "2023-12-15T00:00:00.000Z",
    };
    const mockSuccessResponse = {
      login: "github-acc",
      id: 1111111111,
    };
    githubIntegrationModel.findById.mockResolvedValueOnce(mockModelResponse);
    fetch.mockReturnValue({
      json: () => {
        return mockSuccessResponse;
      },
    });
    return request(app)
      .get(`/integration/status?access_id=abcde12345`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          status: "Connected",
          createdAt: mockModelResponse.createdAt,
          scope: mockModelResponse.scope,
          user: mockSuccessResponse,
          userEmail: mockSuccessResponse,
        });
      });
  });

  test("It should response the GET method for integration/remove", () => {
    githubIntegrationModel.findById.mockResolvedValueOnce({
      _id: "abcde12345",
    });
    githubIntegrationModel.findByIdAndDelete.mockResolvedValueOnce({
      _id: "abcde12345",
    });
    return request(app)
      .get(`/integration/remove?access_id=abcde12345`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          message: "Access ID abcde12345 removed",
        });
      });
  });
});
