import { getSafeRedirect } from "../lib/redirect.js";

const tests = [
  ["/checkout", "/checkout"],
  ["/orders?page=2", "/orders?page=2"],
  ["https://evil.com", "/"],
  ["//evil.com", "/"],
  ["/\\evil.com", "/"],
  ["", "/"],
];

let failed = false;

for (const [input, expected] of tests) {
  const actual = getSafeRedirect(input);
  const passed = actual === expected;

  console.log(
    `${passed ? "PASS" : "FAIL"}: ${JSON.stringify(input)} => ${JSON.stringify(actual)}`
  );

  if (!passed) failed = true;
}

if (failed) process.exitCode = 1;
