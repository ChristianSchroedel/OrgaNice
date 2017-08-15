const electron = require('electron');
// Module to control application life.
const app = electron.app;
const ipcMain = electron.ipcMain;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

const Store = require('./src/electron/store.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const store = new Store({
  configName: 'user-preferences',
  dataName: 'stored-data',
  defaults: {
    windowBounds: {width: 800, height: 600}
  }
});

ipcMain.on('write-data', (event, ...args) => {
  const [key, value] = args;

  store.setStoredData(key, value);

  event.returnValue = true;
});

ipcMain.on('read-data', (event, args) => {
  event.returnValue = store.getStoredData(args) || null;
});

function createWindow () {
  const {width, height} = store.getUserPreference('windowBounds');

  // Create the browser window.
  mainWindow = new BrowserWindow({width, height});

  mainWindow.on('resize', () => {
    const {width, height} = mainWindow.getBounds();

    store.setUserPreference('windowBounds', {width, height});
  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
