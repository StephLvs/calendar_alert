// import modules
const { app, BrowserWindow } = require('electron') 

// initiate window function
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

// when app is ready
// create window
app.whenReady().then(() => {    
  createWindow()

  // activate app with no windows available/open (macOS)
  // create/reopen window
  app.on('activate', () => {    
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// exit app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})