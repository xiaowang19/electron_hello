const { app, BrowserWindow, Menu, Tray, ipcMain, globalShortcut } = require('electron');
const path = require('path');

const utils = require('./public/javascripts/utils');
const app_menu = require('./public/javascripts/app_menu');
const app_tray = require('./public/javascripts/app_tray');
const global_vars = require('./public/javascripts/global_vars');
const global_shortcuts = require('./public/javascripts/global_shortcuts');
const listen_main = require('./public/javascripts/listen_main');

/**
 * 多窗口
 */
const windows = new Set();

const create_window = exports.create_window = (htmlfile='index', opts={}) => {
	// htmlfile = htmlfile || 'index';
	opts = utils.fns.extend({
		ico: 'toolbar-utilities.ico',
		url: '',
	}, opts);
	console.log('opts :: ', opts);

	for(var id in global.windows){
		if(global.windows[id].htmlfile == htmlfile){
			// debugger;
			if(opts.url != ''){
				if(global.windows[id].url == opts.url){
					BrowserWindow.fromId(parseInt(id)).show();
					return;
				}
			}else{
				BrowserWindow.fromId(parseInt(id)).show();
				return;
			}
		}
	}

	let x = 200;
	let y = 200;
	const current_window = BrowserWindow.getFocusedWindow();

	if(current_window){
		const [current_x, current_y] = current_window.getPosition();
		x = current_x + 50;
		y = current_y + 50;
	}

	

	let new_window = new BrowserWindow({
		// type: 'toolbar',
		x: x,
		y: y,
		width: 1200,
		height: 800,
		center: true,
		show: false,
		webPreferences:  {
			webviewTag: true,
			nodeIntegration           : true,      // 集成 NodeJS，默认 = false
			nodeIntegrationInWorker   : true,      // 在Web工作器中启用了Node集成，默认 = false
			nodeIntegrationInSubFrames: true,
			plugins                   : true,      // 启用插件支持
			defaultEncoding           : 'utf-8',
			// navigateOnDragDrop: true
		},
		icon: './public/icos/'+opts.ico,
		// backgroundColor: '#242424',
		autoHideMenuBar: true,	// 隐藏主菜单
		darkTheme: true
	});

	htmlfile_fixed = htmlfile.replace(/\./g, '/');
	new_window.loadFile('./views/'+htmlfile_fixed+'.html');
	// 打开开发者工具
	// new_window.webContents.openDevTools({mode: 'right', Theme: 'Dark'});

	new_window.once('ready-to-show', (evt) => {
		new_window.show();
	});

	new_window.on('close', (evt) => {
		// debugger;
		delete global.windows[new_window.id];
	});

	new_window.on('closed', (evt) => {
		// debugger;
		windows.delete(new_window);
		new_window = null;
	});

	windows.add(new_window);
	global.windows[new_window.id] = {
		id      : new_window.id,
		title   : new_window.getTitle(),
		htmlfile: htmlfile,
		ico     : opts.ico,
		url     : opts.url,
	};
	return new_window;
};

app.on('ready', (evt, windows) => {
	// debugger;
	create_window('index');
	app_menu.set_app_menu();
	app_tray.set_tray();
	listen_main.listen_init();
	global_shortcuts.regist_global_shortcuts();
});

app.on('window-all-closed', (evt) => {
	if(process.platform != 'darwin'){
		app.quit();
	}
});

app.on('activate', (evt, hasVisibleWindows) => {
	if(!hasVisibleWindows){
		create_window();
	}
});

app.on('will-quit', (evt) => {
	// 注销所有快捷键
	globalShortcut.unregisterAll();
});




