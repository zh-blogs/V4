import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsup";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const externals: string[] = [];
const outBaseDir = "./dist";

const packageJson = JSON.parse(
  readFileSync(join(__dirname, "package.json"), "utf8")
);

const deps = Object.keys({
  ...(packageJson.dependencies || {}),
  ...(packageJson.peerDependencies || {}),
}).filter((dep) => !externals.includes(dep));

export default defineConfig({
  entry: ["./index.ts"],
  format: ["cjs"],
  sourcemap: true,
  clean: true,
  outDir: outBaseDir,
  treeshake: true,
  splitting: true,
  minify: false,
  dts: false,
  target: "esnext",
  bundle: true,
  tsconfig: "./tsconfig.json",
  noExternal: [...deps],
  external: [/^node:/, ...externals],
  esbuildOptions: (options) => {
    options.platform = "node";
    options.mainFields = ["module", "main"];
    options.conditions = ["node", "import", "require", "module", "default"];
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  onSuccess: async () => {
    const srcDir = join(
      __dirname,
      "./node_modules/@zhblogs/schemas/src/drizzle"
    );
    const destDir = join(__dirname, `${outBaseDir}/drizzle`);
    console.log(`Copying migrations from ${srcDir} to ${destDir}`);
    try {
      await import("fs/promises").then((fs) =>
        fs.cp(srcDir, destDir, { recursive: true })
      );
      console.log("Migrations copied successfully.");
    } catch (error) {
      console.error("Error copying migrations:", error);
    }
  },
});
