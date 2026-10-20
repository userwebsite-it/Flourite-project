# Fluorite mineralogy website

This is the latest version of the website, with its complete editable HTML, CSS, JavaScript, 3D specimen scan, photographs, and local Three.js files. No build step, API keys, environment variables, or paid services are required.

## Upload to GitHub

1. Extract the ZIP on your computer.
2. Create a new GitHub repository, for example `fluorite-project`.
3. Choose **uploading an existing file** (or **Add file → Upload files**).
4. Open the extracted `fluorite-website` folder. Drag **everything inside it** into GitHub, including the `assets` and `vendor` folders.
5. Commit the uploaded files.

`index.html` and `vercel.json` should be visible at the top level of the repository. Do not upload only the ZIP: GitHub and Vercel need the extracted files. Keep the folder structure intact so the crystal and images load.

## Deploy on Vercel

1. Sign in to Vercel and add a new project.
2. Import your GitHub repository.
3. Use **Other** as the framework preset.
4. Leave the root directory at the repository root.
5. This package's `vercel.json` skips installation and building, and serves the project root directly. If configuring manually, leave Build Command empty and use `.` for Output Directory.
6. Deploy and open the resulting URL.

Vercel documentation: https://vercel.com/docs/builds/configure-a-build

## Edit the website

- `index.html`: homepage content and page structure.
- `style.css`: colors, typography, spacing, and responsive layout.
- `app.js`: information sections, source list, and section navigation.
- `scan.js`: 3D model, studio lighting, rotation, zoom, and color controls.
- `scan-worker.js`: software renderer used when WebGL is unavailable.
- `assets/fluorite-scan.glb`: real fluorite scan with photographic texture.
- `three.module.js` and `vendor/`: bundled Three.js library and helpers.
- `specimen.jpg` and `thin-section.jpg`: project photographs.

After connecting GitHub to Vercel, commits to the configured production branch normally trigger another deployment.

## Preview locally

Use a local HTTP server rather than double-clicking `index.html`, since browser security can block modules and model loading on `file://` URLs. With Python installed, open a terminal in this folder and run:

```sh
python -m http.server 8000
```

Then open http://localhost:8000 . You can also use VS Code's Live Server extension.

## Credits

The research references and photo credits are included in the site's Evidence section. See `THIRD-PARTY-NOTICES.md` for asset and library attribution. The 3D specimen is an imported scan, not a model sculpted by the student. Development used AI assistance.
