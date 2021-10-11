module.exports = {
	plugins: [
		'@typescript-eslint',
		'react',
		'import',
		'react-hooks',
		'prettier',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:prettier/recommended',
		'plugin:react/recommended',
		'prettier/@typescript-eslint',
		'prettier/react',
	],
	env: {
		'browser': true,
		'amd': true,
		'node': true
	},
	rules: {
		'@typescript-eslint/explicit-function-return-type': ['warn', {
			allowExpressions: true,
		}],
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'import/first': 'error',
		'import/no-duplicates': 'error',
		'import/order': ['error', {
			alphabetize: { order: 'asc' },
			'newlines-between': 'always',
		}],
		'sort-imports': ['warn', {
			ignoreCase: true,
			ignoreDeclarationSort: true,
		}],
	},
};
