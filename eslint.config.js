export default {
  ignores: [
    "node_modules/",
    "test/fixture/",
    "coverage/",
    ".nyc_output/",
    "env/",
    "doc/",
  ],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  rules: {
    "object-shorthand": 0,
    "no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "_",
      },
    ],
    "quote-props": [2, "as-needed"],
  },
};
