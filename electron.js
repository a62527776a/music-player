const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let win

let createWindow = () => {
    win = new BrowserWindow({
      width: 300, 
      height: 50, 
      backgroundColor: '#eee', 
      frame: false, 
      resizable: false,
      defaultFontSize: 12
      })
    
    win.loadURL('http://localhost:8080')

    win.setAlwaysOnTop(true)

    win.on('closed', () => {
        win = null
    })
}

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