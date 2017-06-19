const { app, BrowserWindow, ipcMain, webContents } = require('electron')
const path = require('path')
const url = require('url')
const windowWidth = 800

let win
let downloadFile

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

    downLoadFile = (url) => {
      win.webContents.downloadURL(url)
    }

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

ipcMain.on('download-song', (e, arg) => {
  win.webContents.session.on('will-download', (event, item, webContents) => {
    const totalBytes = item.getTotalBytes()
    let body
    let sendDownloaProcess = (type, receivedBytes) => {
      body = {
        type: type,
        process: Math.floor((receivedBytes / totalBytes) * 100)
      }
      e.sender.send('download-song', body)
    }
    sendDownloaProcess('init', 0)
    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        sendDownloaProcess('error', item.getReceivedBytes())
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          sendDownloaProcess('paused', item.getReceivedBytes())
        } else {
          sendDownloaProcess('downloading', item.getReceivedBytes())
        }
      }
    })
    item.once('done', (event, state) => {
      if (state === 'completed') {
        sendDownloaProcess('complated', item.getReceivedBytes())
      } else {
        sendDownloaProcess(state, item.getReceivedBytes())
      }
    })
  })

  downLoadFile(arg)

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