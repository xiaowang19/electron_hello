/**
 * 与子窗口通讯
 */

const { ipcMain } = require('electron');

exports.listen_init = () => {
    ipcMain.on('connect-from-sub', (evt, data) => {
        debugger;
        console.log('来自主线程的响应');
        console.log(evt);
        console.dir(data);

        evt.sender.send('reply-from-main', '来自主窗口响应~'+global.shared_vars.username);
    });
};