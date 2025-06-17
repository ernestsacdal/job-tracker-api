import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      semi: "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
