# Quill Media Resize Module

This plugin is very inspired by Ken Snyder's [quill-image-resize-module](https://github.com/kensnyder/quill-image-resize-module).
Only for images for now but aiming to handle videos and other media later.

## How to use

### Vanilla

```html
<script src="/node_modules/quill-image-resize/dist/image-resize.min.js"></script>
```

```js
new Quill("#editor", {
  modules: {
    mediaResize: true,
  },
});
```

### With [ngx-quill](https://github.com/KillerCodeMonkey/ngx-quill)

```ts
import { MediaResize } from 'quill-media-resize';

// ...

@NgModule({
  imports: [
    ...,

    QuillModule.forRoot({
      customModules: [
        {
          implementation: MediaResize,
          path: 'modules/MediaResize'
        }
      ],
      modules: {
        MediaResize: true
      },
    })
  ],
  ...
})
class YourModule { ... }
```
