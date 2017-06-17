const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')

let win

let createWindow = () => {
    win = new BrowserWindow({
      width: 300, 
      height: 50, 
      backgroundColor: '#eee', 
      frame: false, 
      // resizable: false,
      defaultFontSize: 12
      })
    
    win.loadURL('http://localhost:8080')

    win.setAlwaysOnTop(true)
    
    win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

ipcMain.on('search-song', (event, arg) => {
  win.setSize(300, 200)
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})