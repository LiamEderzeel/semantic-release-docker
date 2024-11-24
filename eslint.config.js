import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': [
        'warn', // or 'error'
        {
          vars: 'all',
          args: 'after-used',
          varsIgnorePattern: '^_', // Allows unused variables starting with an underscore
          argsIgnorePattern: '^_' // Allows unused function arguments starting with an underscore
        }
      ]
    },
    languageOptions: {
      globals: globals.node,
      sourceType: "module",
      ecmaVersion: 2020
    }
  },
];
