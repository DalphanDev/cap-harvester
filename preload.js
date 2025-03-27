const { contextBridge } = require("electron");

// Expose APIs to renderer here if needed
contextBridge.exposeInMainWorld("api", {
  message: () => "Hello from preload!",
});
