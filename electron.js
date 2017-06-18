const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const windowWidth = 800

let win

let createWindow = () => {
    win = new BrowserWindow({
      width: windowWidth, 
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

let opening = false // 是否在动画中?

ipcMain.on('search-song', (event, arg) => {
  if (opening) event.sender.send('opening', opening)
  let height = arg ? 50 : 350
  openAnimation(arg, height)
})

let openAnimation = (isOpen, height) => {
  opening = true
  let timer = setInterval(() => {
    isOpen ? checkHeight(350, 10) : checkHeight(50, -10)
    win.setSize(windowWidth, height)
  }, 16)
  let checkHeight = (bound, step) => {
    height += step
    if (height === bound) {
      clearInterval(timer)
      opening = false
    }
  }
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