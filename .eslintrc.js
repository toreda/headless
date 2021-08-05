module.exports = {
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {}
	},
	settings: {},
	extends: ['@toreda/eslint-config'],
	rules: {
		'prettier/prettier': 1,
		'prefer-const': 2
	},
	overrides: [
		{
			files: ['*.spec.ts'],
			rules: {
				'@typescript-eslint/explicit-function-return-type': 0,
				'@typescript-eslint/no-empty-function': 0,
				'@typescript-eslint/no-explicit-any': 0,
				'@typescript-eslint/no-non-null-assertion': 0
			}
		}
	],
	ignorePatterns: ['gulpfile.ts']
};
