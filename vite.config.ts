import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "quillMediaResize",
      formats: ["umd"],
      fileName: () => "quill-media-resize.min.js",
    },
  },
});
