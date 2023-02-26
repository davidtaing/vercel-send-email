import { isMethodSupported } from "../../api/send-email";

test.each([
  { name: "POST method is supported", method: "POST", expected: true },
  { name: "GET method is not supported", method: "GET", expected: false },
  { name: "PUT method is not supported", method: "PUT", expected: false },
  { name: "DELETE method is not supported", method: "GET", expected: false },
  { name: "PATCH method is not supported", method: "PATCH", expected: false },
])("$name", ({ method, expected }) => {
  expect(isMethodSupported(method)).toEqual(expected);
});
