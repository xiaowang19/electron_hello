const { app, BrowserWindow, Menu, Tray } = require('electron');
const path = require('path');
const fs = require('fs');
const utils = require('./utils');

/**
 * 系统托盘
 */

let tray = null;

exports.set_tray = () => {
	// debugger;
	ico_paths = [
		path.join(process.cwd(), '../toolbar-utilities.ico'),
		path.join(process.cwd(), 'toolbar-utilities.ico'),
		path.join(process.cwd(), 'public/icos/toolbar-utilities.ico'),
		path.join(process.cwd(), 'resources/app/public/icos/toolbar-utilities.ico'),
		path.join(process.cwd(), 'resources/app.asar/public/icos/toolbar-utilities.ico'),
	]
	ico_path = utils.fns.choose_exists_file(ico_paths);
	console.log('ico_paths :: ', ico_paths);
	console.log('ico_path :: ', ico_path);

	if(ico_path == ''){
		return
	}

	tray = new Tray(ico_path);
	const tray_context_menu = Menu.buildFromTemplate([
		{
			label: '退出',
			click: function(evt){
				// debugger;
				app.quit();
			}
		}
	]);
	tray.setToolTip('系统托盘测试');
	tray.setContextMenu(tray_context_menu);
	tray.on('click', () => {
		// BrowserWindow.getAllWindows()[0].show();
		BrowserWindow.fromId(1).show();
	});
};
