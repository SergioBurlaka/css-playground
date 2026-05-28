import { copyFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const rootDir = dirname(fileURLToPath(import.meta.url));

function copyHtmlFiles(srcDir, destDir) {
  for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = join(srcDir, entry.name);
    const destPath = join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyHtmlFiles(srcPath, destPath);
      continue;
    }

    if (!entry.name.endsWith(".html")) {
      continue;
    }

    mkdirSync(destDir, { recursive: true });
    copyFileSync(srcPath, destPath);
  }
}

function copyHtmlPartials() {
  return {
    name: "copy-html-partials",
    closeBundle() {
      const componentsDir = join(rootDir, "src/components");
      const outDir = join(rootDir, "dist/src/components");

      copyHtmlFiles(componentsDir, outDir);
    },
  };
}

export default defineConfig({
  base: "/css-playground/",
  plugins: [copyHtmlPartials()],
});
