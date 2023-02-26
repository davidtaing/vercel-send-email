import { validateSecretKey } from "../../api/send-email";

const env = process.env;

function setupEnvSecretKey() {
  jest.resetModules();
  process.env = { ...env, SECRET_KEY: "secret" };
}

function resetEnv() {
  process.env = env;
}

test("returns false when the Vercel Function is missing SECRET_KEY env", () => {
  resetEnv();

  const runFunction = () => validateSecretKey("key not set up");

  expect(runFunction).toThrow();
});

test("returns false when request SECRET_KEY is not provided", () => {
  setupEnvSecretKey();

  const actual = validateSecretKey();

  expect(actual).toEqual(false);
  resetEnv();
});

test("returns true when request SECRET_KEY matches Vercel Function SECRET_KEY", () => {
  setupEnvSecretKey();

  const actual = validateSecretKey("secret");

  expect(actual).toEqual(true);
  resetEnv();
});
