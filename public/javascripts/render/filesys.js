const { remote } = require('electron');
const fs = require('fs');
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

const result = document.querySelector('#result');

document.getElementById('btn_show_open').addEventListener('click', (evt) => {
	// debugger;
	remote.dialog.showOpenDialog({
		properties: ['openFile', 'multiSelections'],
		filters: [
			{
				name: 'Markdown Files',
				extensions: ['md', 'mdown', 'markdown']
			},
			{
				name: 'Text Files',
				extensions: ['txt']
			}
		]
	}, (filenames) => {
		// debugger;
		console.log('filenames :: ');
		console.dir(filenames);
		result.value = filenames.join('\n');
	});
});

document.getElementById('btn_show_message_box').addEventListener('click', (evt) => {
	remote.dialog.showMessageBox({
		type   : 'warning',        // "none", "info", "error", "question" 或 "warning"
		title  : '系统信息',
		message: '我是系统信息',
		detail : '这个有什么用',
		buttons: ['ok', 'cancel']
	}, (index) => {
		if(index == 0){
			alert('ok');
		}else{
			alert('cancel');
		}
	});
});

document.getElementById('btn_show_error_box').addEventListener('click', (evt) => {
	remote.dialog.showErrorBox('错误信息', '出错了~');
});

document.getElementById('btn_filelist').addEventListener('click', (evt) => {
	fs.readdir('./', (err, files) => {
		console.dir(files);
		result.value = files.join('\n');
	});
});

/**
 * 监听主线程和菜单事件
 */
listen_sub.listen_init();