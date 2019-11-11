const {
	remote,
	ipcRenderer
} = require('electron');
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

let result = document.querySelector('#result');
let avatar = document.querySelector('#avatar');
let btn_avatar = document.querySelector('#btn_avatar');
let avatar_filepath = document.querySelector('#avatar_filepath');

btn_avatar.onclick = (evt) => {
	// avatar.click();
	remote.dialog.showOpenDialog({
		properties: ['openFile'],
		filters: [
			{
				name: '图片文件',
				extensions: ['jpg', 'png', 'gif']
			}
		]
	}, (filenames) => {
		debugger;
		if(filenames.length > 0){
			avatar.value = filenames[0];
			avatar_filepath.innerHTML = filenames[0];
		}
	});
};

/**
 * LayUI
 */

layui.use(['form', 'laydate'], function (){
	var form = layui.form;
	var laydate = layui.laydate;

	laydate.render({
		elem: '#birthday'
	});

	//监听提交
	form.on('submit(formDemo)', function (data) {
		layer.msg(JSON.stringify(data.field));
		result.innerHTML = JSON.stringify(data.field);
		return false;
	});
});

/**
 * 监听主线程和菜单事件
 */
listen_sub.listen_init();