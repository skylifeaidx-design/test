const { app, BrowserWindow } = require('electron');
const path = require('path');
const { fork } = require('child_process');

let mainWindow;
let nextApp;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    const isDev = !app.isPackaged;
    const port = 33333;

    if (isDev) {
        // In dev mode, user should run 'next dev' separately or we can just tell them
        console.log('Running in Development Mode. Please run "npm run dev" and load localhost:3000 manually if needed, or use "electron ." to test main process.');
        // We default to loading localhost:3000 which is the standard Next.js dev port
        mainWindow.loadURL('http://localhost:3000');
    } else {
        // Production: Spawn the standalone server
        // Path resolution: 'resources/app/electron/main.js' -> '../standalone/server.js' maps to 'resources/app/standalone/server.js'
        const serverPath = path.join(__dirname, '../standalone/server.js');

        console.log('Starting Next.js server at:', serverPath);

        nextApp = fork(serverPath, [], {
            env: {
                ...process.env,
                PORT: port,
                HOST: 'localhost',
                USER_DATA_PATH: app.getPath('userData')
            }
        });

        const checkServer = () => {
            const http = require('http');
            http.get('http://localhost:' + port, (res) => {
                if (res.statusCode === 200) {
                    mainWindow.loadURL('http://localhost:' + port);
                } else {
                    setTimeout(checkServer, 500);
                }
            }).on('error', (err) => {
                setTimeout(checkServer, 500);
            });
        };

        setTimeout(checkServer, 500);
    }

    mainWindow.on('closed', function () {
        mainWindow = null;
        if (nextApp) nextApp.kill();
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
    if (nextApp) nextApp.kill();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});
