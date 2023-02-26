import { validateInput, Body } from "../../api/send-email";

test("success is true when body are valid", () => {
  const input: Body = {
    replyTo: "dave@test.com",
    subject: "This is a valid body",
    text: "Hello World",
  };
  const expected = validateInput(input);

  expect(expected.success).toBeTruthy();
});

test("fails when email is invalid", () => {
  const input = {
    replyTo: "davetest.com",
    subject: "The email is invalid",
    text: "Hello World",
  };
  const expected = validateInput(input);

  expect(expected.success).toBeFalsy();
});

test("error message is  when email is invalid", () => {
  const input = {
    replyTo: "davetest.com",
    subject: "The email is invalid",
    text: "Hello World",
  };
  const expected = validateInput(input);
  const errorMessage = expected["error"].errors[0].message;

  expect(errorMessage).toEqual("Invalid email");
});

test("fails when input is empty", () => {
  const input = {};
  const expected = validateInput(input);

  expect(expected.success).toBeFalsy();
});

test("fails when both html or text are not provided", () => {
  const input = {
    replyTo: "dave@test.com",
    subject: "html or text are not provided",
  };
  const expected = validateInput(input);

  expect(expected.success).toBeFalsy();
});

test("fails when both html or text are not provided", () => {
  const input = {
    replyTo: "dave@test.com",
    subject: "html or text are not provided",
  };
  const expected = validateInput(input);
  const errorMessage = expected["error"].errors[0].message;

  expect(errorMessage).toEqual("No text or html provided.");
});
