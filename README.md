# Kyle Yingjie Portfolio

This repository contains the static portfolio site published at `https://kyleyingjie.github.io` through GitHub Pages.

To edit the portfolio locally, open `index.html` and select **Edit portfolio**. When ready to publish changes, export `site-data.js` from the editor and replace the file in this repository before publishing.

## Add a 3D sculpture

Export your model as a compressed `.glb` file with textures embedded, then upload it to `assets/models/sculpt.glb` in this repository. The **3D Sculpt** page will load that file automatically. For comfortable mobile loading, keep the model reasonably low-poly and use small texture maps (around 2048px or less).

To test the viewer locally, run a small local server from the project folder (for example `python -m http.server`) and open `http://localhost:8000/sculpt.html`. Browsers may block `.glb` requests when an HTML file is opened directly with `file://`.

## Add AI Brand Films

The **AI Brand Films** page uses local MP4 videos, stored at `assets/videos/ai-brand-films/`. Use an MP4 with H.264 video and AAC audio. Portrait short-form clips work best at 1080 x 1920 (9:16), with a sensible bitrate for the web; keep each video comfortably below GitHub's 100 MB single-file limit.

From **Edit portfolio**, add a campaign under **AI Brand Films** and enter its title, brand/concept, description, video path, poster path, and format. The file selectors are for local preview only. Upload the final `.mp4` and poster image to GitHub under `assets/videos/ai-brand-films/`, then publish or export `site-data.js` to make the metadata live.

The page plays MP4s muted, inline, and on a loop. Visitors can pause a clip or turn its audio on with the controls on the video.
