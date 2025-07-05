import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsup";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const externals: string[] = [];

const packageJson = JSON.parse(
  readFileSync(join(__dirname, "package.json"), "utf8")
);

const deps = Object.keys({
  ...(packageJson.dependencies || {}),
  ...(packageJson.peerDependencies || {}),
}).filter((dep) => !externals.includes(dep));

export default defineConfig({
  entry: ["./src/**.ts"],
  format: ["cjs","esm"],
  sourcemap: false,
  clean: true,
  outDir: "./dist",
  splitting: true,
  minify: false,
  dts: true,
  target: "esnext",
  bundle: true,
  tsconfig: "./tsconfig.json",
  noExternal: [...deps],
  external: [/^node:/, ...externals],
  esbuildOptions: (options) => {
    options.platform = "node";
    options.mainFields = ["module", "main"];
    options.conditions = ["node", "import", "require", "module", "default"];
  }
});
