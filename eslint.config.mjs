import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Apply core presets
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 🧩 Add this to define rules
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // ✅ this actually disables the rule
    },
  },
];

export default eslintConfig;
