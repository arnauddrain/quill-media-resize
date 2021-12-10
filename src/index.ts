import { Quill } from "quill";

declare global {
  interface Window {
    Quill: typeof Quill;
  }
}

export default class MediaResize {
  constructor(quill: Quill) {
    var container = document.querySelector("#counter");
    quill.on("text-change", function () {
      var text = quill.getText();
      if (container) {
        container.innerHTML = text.split(/\s+/).length.toString();
      }
    });
  }
}

if (window?.Quill) {
  window.Quill.register("modules/mediaResize", MediaResize);
}
