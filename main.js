const { app, BrowserWindow, globalShortcut, remote } = require("electron");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hidden",
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // win.loadURL(path.resolve(__dirname, "index.html"));
  win.loadFile("index.html");
}

function toggleDevTools() {
  win.webContents.toggleDevTools();
}

function createShortcuts() {
  globalShortcut.register("CmdOrCtrl+J", toggleDevTools);
}

app.whenReady().then(createWindow).then(createShortcuts);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
