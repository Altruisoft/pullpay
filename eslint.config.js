import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import tailwind from 'eslint-plugin-tailwindcss';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	...tailwind.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'prefer-const': 'off',
			'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
			'svelte/no-at-html-tags': 'warn',
			'svelte/valid-compile': 'warn',
			'svelte/require-each-key': 'warn',
			'svelte/no-navigation-without-resolve': 'off',
			'tailwindcss/classnames-order': 'warn',
			'tailwindcss/enforces-shorthand': 'warn',
			'tailwindcss/no-contradicting-classname': 'error',
			'tailwindcss/no-unnecessary-arbitrary-value': 'warn'
		},
		settings: {
			tailwindcss: {
				config: fileURLToPath(new URL('./src/routes/layout.css', import.meta.url))
			}
		}
	}
);
