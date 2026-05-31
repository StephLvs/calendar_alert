// import modules
const { app, BrowserWindow, screen} = require('electron') 

// initiate window function
const createWindow = () => {
  // get current active display 
  const cursorPoint = screen.getCursorScreenPoint()
  const currentDisplay = screen.getDisplayNearestPoint(cursorPoint)
  const {x, y, width, height} = currentDisplay.bounds
  // create an overlay window
  const win = new BrowserWindow({
    width: width,
    height: height,
    x: 0,
    y: 0,

    transparent: true,
    frame: false,
    alwaysOnTop: true,
    hasShadow: false,

    // remove focus on window
    focusable: false,
    show: false,
  })

  win.loadFile('index.html')
  // show overlay across all spaces
  win.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: true
  })

  win.once("ready-to-show", () => {
    win.showInactive()
  })
  // window does not block mouse clicks
  win.setIgnoreMouseEvents(true)
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