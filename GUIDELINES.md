# Global AI Agent Instructions for PullPay Web3 Stellar

You are an expert AI programming assistant working on this project. To maintain the highest code quality standards, you MUST strictly adhere to the following guidelines for ALL tasks:

## 1. Tailwind CSS Best Practices
- **Strict Adherence:** Always follow Tailwind CSS best practices and modern styling paradigms.
- **No Arbitrary Values:** Avoid arbitrary values (e.g., `text-[14px]`, `w-[320px]`) unless absolutely necessary. Use the established design system tokens and standard Tailwind utility classes.
- **Consistent Structure:** Keep classes organized and maintain responsive, mobile-first design patterns consistently.

## 2. Strict Type Safety (No `any`)
- **NEVER use the `any` type.**
- Always define precise TypeScript interfaces and types. If a type is truly unknown at runtime, use the `unknown` type and apply proper type guards or Zod validations.
- Ensure all component props, function parameters, and return types are strictly typed.

## 3. Zero Linter Errors & Warnings
- **Always fix all warnings and errors.** 
- Before concluding your task, ensure that `eslint`, `svelte-check`, and `tsc` will pass cleanly.
- Never ignore or suppress linter rules (e.g., `// eslint-disable-next-line`) unless explicitly permitted by the user for a highly specific edge case.

## 4. Clean Code & Dead Code Elimination
- **No Unused Variables:** Do not leave any declared but unused variables in the code.
- **No Unused Imports:** Always clean up your imports after refactoring. Remove any module, component, or type that is no longer used.
- **No Unused CSS:** Ensure there are no unused CSS selectors or orphaned styles in Svelte `<style>` blocks.
- Clean up all temporary, commented-out, or dead code before finalizing your changes.
