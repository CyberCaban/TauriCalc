# Tauri + React + Typescript

Migrated Electron Calculator to Tauri framework

Rewritten some features to fit with Tauri renderer

## Install

Clone the repo and install dependencies:

```bash
git clone --branch main https://github.com/CyberCaban/TauriCalc.git
cd TauriCalc
npm install
```

## Starting Development

Start the app in the `dev` environment

Local frontend server:
```bash
npm run dev
```
OS's native web renderer:

```bash
npm run tauri dev
```

## Compiling project
```bash
npm run tauri build
```

You'll find unpacked app in 

"tauri-app/src-tauri/target/release/tauri-app.exe"

and msi or nsis installer in 

"tauri-app/src-tauri/target/release/bundle/"
