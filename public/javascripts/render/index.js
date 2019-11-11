const { remote, ipcRenderer } = require('electron');
const main = remote.require('./main.js');
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

const btns = document.getElementsByTagName('button');
for(var i=0; i<btns.length; i++){
	console.log(btns[i].name);

	btns[i].addEventListener('click', ((btn) => {
		return () => {
			debugger;
			var opts = {};
			var ico = btn.getAttribute('ico');
			var url = btn.getAttribute('url');
			opts['ico'] = ico || '';
			opts['url'] = url || '';
			main.create_window(btn.name, opts);
		};
	})(btns[i]));
}

/**
 * 监听主线程和菜单事件
 */
listen_sub.listen_init();