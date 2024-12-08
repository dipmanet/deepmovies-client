import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["dist"] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			"@typescript-eslint/no-explicit-any": "off",
			"no-unused-vars": "off", // Turns off the base rule for unused variables
			"@typescript-eslint/no-unused-vars": [
				"off", // Adjusts the rule for TypeScript files
				{
					vars: "all", // Checks all variables
					args: "none", // Does not check function arguments
					ignoreRestSiblings: true, // Ignores variables from rest destructuring
					varsIgnorePattern: "^_", // Ignores variables starting with `_`
				},
			],
		},
	}
);
