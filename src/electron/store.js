const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
  constructor(opts) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');

    this.storedDataPath = path.join(userDataPath, opts.dataName + '.json');
    this.storedData = parseData(this.storedDataPath, {});

    this.userPreferencesPath = path.join(userDataPath, opts.configName + '.json');
    this.userPreferences = parseData(this.userPreferencesPath, opts.defaults);
  }

  getStoredData(key) {
    return this.storedData[key];
  }

  setStoredData(key, val) {
    this.storedData[key] = val;

    writeData(this.storedDataPath, this.storedData);
  }

  getUserPreference(key) {
    return this.userPreferences[key];
  }

  setUserPreference(key, val) {
    this.userPreferences[key] = val;

    writeData(this.userPreferencesPath, this.userPreferences);
  }
}

function parseData(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    return defaults;
  }
}

function writeData(path, data) {
  fs.writeFileSync(path, JSON.stringify(data));
}

module.exports = Store;
