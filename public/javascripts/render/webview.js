const { remote, ipcRenderer } = require('electron');
const os = require('os');
const path = require('path');
const { PythonShell } = require('python-shell');
const rp = require('request-promise');
const cheerio = require('cheerio');
const jQuery = require('jquery');

const utils = require('../public/javascripts/utils');
const render_common = require('../public/javascripts/render_common');
const render_menu = require('../public/javascripts/render_menu');
const listen_sub = require('../public/javascripts/listen_sub');
render_common.render_common();
const port = process.env.port || 8000;

let webview = null;

const webview_init = () => {
	// debugger;
	webview = document.querySelector('#webview');
	webview.style.height = (document.documentElement.clientHeight - 10) + 'px';
	
	debugger;
	var window_info = remote.getGlobal('windows')[remote.getCurrentWindow().id]
	console.log(window_info);
	if(window_info.url != ''){
		var port = process.env.port || 8000;
		var url = window_info.url.replace('{port}', port);
		// webview.loadURL(url);
		webview.src = url;
	}

	window.onresize = (evt) => {
		console.log(document.documentElement.clientHeight);
		webview.style.height = (document.documentElement.clientHeight - 10) + 'px';
	};
};

const connect_with_webview = () => {
	ipcRenderer.on('key-down-from-webview', (evt, data) => {
		// debugger;
		console.log(data);
		if(data.keyCode == 123){	// F12
			webview.openDevTools();
		}
	});
};

const build_menu = () => {
	// 窗口菜单
	let win_menu_template = render_menu.win_menu_build([]);
	render_menu.set_win_menu(win_menu_template);
	
	// 上下文菜单
	let context_menu_template = render_menu.context_menu_build([]);
	render_menu.set_context_menu(context_menu_template);
};

onload = () => {
	debugger;
	webview_init();
	connect_with_webview();

	build_menu();

	/**
	 * 监听主线程和菜单事件
	 */
	listen_sub.listen_init();
};
