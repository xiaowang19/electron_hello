const { remote, ipcRenderer } = require('electron');
const render_common = require('../public/javascripts/render_common');
const render_menu = require('../public/javascripts/render_menu');
const listen_sub = require('../public/javascripts/listen_sub');
render_common.render_common();

// 窗口菜单
let win_menu_template = render_menu.win_menu_build([]);
render_menu.set_win_menu(win_menu_template);

// 上下文菜单
let context_menu_template = render_menu.context_menu_build([]);
render_menu.set_context_menu(context_menu_template);

document.getElementById('btn_conn_main').addEventListener('click', () => {
	debugger;
	ipcRenderer.send('connect-from-sub', {message: '来自子窗口'});
});

ipcRenderer.on('reply-from-main', (evt, message) => {
	debugger;
	console.log(message);
	alert(message);
});

document.getElementById('btn_global_share').addEventListener('click', () => {
	debugger;
	console.dir(remote.getGlobal('shared_vars'));
	alert(remote.getGlobal('shared_vars').username);
	remote.getGlobal('shared_vars').username = 'xiaowang';
});

/**
 * 监听主线程和菜单事件
 */
listen_sub.listen_init();