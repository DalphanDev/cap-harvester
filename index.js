const { app, BrowserWindow } = require("electron");
const path = require("path");
const express = require("express");

// --- Start Express Server ---
const startServer = () => {
  const serverApp = express();
  const PORT = 5000;

  // Serve your custom HTML page
  serverApp.use(express.static(path.join(__dirname, "public")));

  serverApp.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  serverApp.listen(PORT, () => {
    console.log(`Local server running at http://127.0.0.1:${PORT}`);
  });
};

// Add Chromium flag to map example.com → localhost:5000
app.commandLine.appendSwitch("host-rules", "MAP example.com 127.0.0.1:5000");

// --- Electron Window ---
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("http://example.com"); // Actually loads local HTML!
}

app.whenReady().then(() => {
  startServer(); // ✅ Start Express
  createWindow(); // ✅ Then create Electron window
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
