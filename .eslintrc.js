module.exports = {
  extends: ["airbnb-base", "prettier"],
  rules: {
    "no-console": "off",
    camelcase: [2, { properties: "never" }],
  },
  env: {
    browser: true,
  },
};
