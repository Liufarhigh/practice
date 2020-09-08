const{app, BrowserWindow} = require('electron')
const{Menu, Tray, nativeImage, globalShortcut, clipboard} = require('electron')
const path = require('path');

// const robot = require("robotjs")

let win
let tray = null
function createWindow () {   
        // 创建浏览器窗口
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'ic.png'),
        webPreferences: {
            nodeIntegration: true
        },
    })
  
    // 并且为你的应用加载index.html
    win.loadFile('index.html')

    // 窗口关闭的监听  
    win.on('closed', (event) => {
        win = null;
    });
    // 当我们点击关闭时触发close事件，我们按照之前的思路在关闭时，隐藏窗口，隐藏任务栏窗口
    // event.preventDefault(); 禁止关闭行为(非常必要，因为我们并不是想要关闭窗口，所以需要禁止默认行为)
    win.on('close', (event) => { 
        win.hide(); 
        win.setSkipTaskbar(true);
        event.preventDefault();
    });
    //创建系统通知区菜单
  
    const image = nativeImage.createFromPath(path.join(__dirname, './ic.png'))
    image.setTemplateImage(true)//匹配mac系统黑白图片
    tray = new Tray(image);
    // tray = new Tray(path.join(__dirname, './ic.png'));
    const contextMenu = Menu.buildFromTemplate([
        {label: '退出', click: () => {win.destroy()}},//我们需要在这里有一个真正的退出（这里直接强制退出）
    ])
    tray.setToolTip('My托盘测试')
    tray.setContextMenu(contextMenu)
    tray.on('click', ()=>{ //我们这里模拟桌面程序点击通知区图标实现打开关闭应用的功能
        if(!win.isVisible()){win.show()}
        win.isVisible() ?win.setSkipTaskbar(false):win.setSkipTaskbar(true);
    })
  }
  
  // app.whenReady().then(()=>{createWindow()})
  app.whenReady().then(()=>{
    createWindow();
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();     
    }
  });
  app.on('activate', () => {
    if (!win.isVisible()) {
      createWindow()
    }
  });
  