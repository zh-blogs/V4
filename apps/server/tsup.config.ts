import { readFileSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "tsup";

const outBaseDir = "./dist";

const packageJson = JSON.parse(
  readFileSync(new URL("package.json", import.meta.url), "utf8")
);

const deps = Object.keys({
  ...(packageJson.dependencies || {}),
}).filter((dep) => dep.startsWith("@zhblogs/"));

const copyFiles = ["./node_modules/@zhblogs/schemas/src/drizzle"];

export default defineConfig({
  entry: ["./index.ts"],
  format: ["esm"],
  sourcemap: false,
  clean: true,
  outDir: outBaseDir,
  treeshake: true,
  splitting: false,
  minify: true,
  dts: false,
  target: "esnext",
  bundle: true,
  tsconfig: "./tsconfig.json",
  noExternal: [...deps],
  external: [/^node:/],
  esbuildOptions: (options) => {
    options.platform = "node";
    options.conditions = ["import", "module", "node"];
    options.mainFields = ["module", "main"];
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  banner() {
    return {
      js: `import { createRequire } from 'module';const require = createRequire(import.meta.url);`,
    };
  },
  onSuccess: async () => {
    for (const file of copyFiles) {
      const src = new URL(file, import.meta.url).pathname;
      const dest = path.join(outBaseDir, path.basename(file));
      await import("fs/promises").then((fs) =>
        fs.cp(src, dest, { recursive: true })
      );
    }
  },
});
