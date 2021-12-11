import { Quill } from "quill";

declare global {
  interface Window {
    Quill: typeof Quill;
  }
}

export default class MediaResize {
  private quill: Quill;
  private media?: HTMLImageElement;
  private overlay?: HTMLDivElement;
  private parentNode: HTMLElement;

  constructor(quill: Quill) {
    this.quill = quill;
    this.quill.root.addEventListener("click", this.handleClick, false);
    this.parentNode = this.quill.root.parentNode as HTMLElement;
    this.parentNode.style.position =
      this.parentNode.style.position || "relative";
  }

  handleClick = (event: MouseEvent) => {
    const target = event.target ? (event.target as HTMLElement) : null;
    if (this.media === target) {
      return;
    }
    if (this.media) {
      this.hide();
    }
    if (target?.tagName.toUpperCase() === "IMG") {
      this.show(target as HTMLImageElement);
    }
  };

  show = (media: HTMLImageElement) => {
    this.media = media;
    this.showOverlay();
    this.showCorners();
  };

  hide = () => {
    this.media = undefined;
    this.hideOverlay();
  };

  showCorners = () => {
    this.addCorner("nwse-resize", { left: "-6px", top: "-6px" });
    this.addCorner("nesw-resize", { right: "-6px", top: "-6px" });
    this.addCorner("nwse-resize", { right: "-6px", bottom: "-6px" });
    this.addCorner("nesw-resize", { left: "-6px", bottom: "-6px" });
  };

  addCorner = (cursor: string, positions: { [key: string]: string }) => {
    const box = document.createElement("div");
    Object.assign(box.style, {
      position: "absolute",
      height: "12px",
      width: "12px",
      backgroundColor: "white",
      border: "1px solid #777",
      boxSizing: "border-box",
      opacity: "0.80",
      ...positions,
    });
    box.style.cursor = cursor;
    box.addEventListener("mousedown", this.handleMousedown, false);
    this.overlay?.appendChild(box);
  };

  handleMousedown = (event: MouseEvent) => {};

  showOverlay = () => {
    this.hideOverlay();
    this.quill.setSelection(0, 0);
    this.overlay = document.createElement("div");
    Object.assign(this.overlay.style, {
      position: "absolute",
      boxSizing: "border-box",
      border: "1px dashed #444",
    });
    this.parentNode.appendChild(this.overlay);
    this.repositionElements();
  };

  hideOverlay = () => {
    if (this.overlay) {
      this.parentNode.removeChild(this.overlay);
      this.overlay = undefined;
    }
  };

  repositionElements = () => {
    if (!this.overlay || !this.media) {
      return;
    }

    // position the overlay over the image
    const mediaRect = this.media.getBoundingClientRect();
    const containerRect = this.parentNode.getBoundingClientRect();

    Object.assign(this.overlay.style, {
      left: `${
        mediaRect.left - containerRect.left - 2 + this.parentNode.scrollLeft
      }px`,
      top: `${mediaRect.top - containerRect.top + this.parentNode.scrollTop}px`,
      width: `${mediaRect.width + 2}px`,
      height: `${mediaRect.height + 1}px`,
    });
  };
}

if (window?.Quill) {
  window.Quill.register("modules/mediaResize", MediaResize);
}
