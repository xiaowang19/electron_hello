const { remote, ipcRenderer } = require('electron');
const render_common = require('../public/javascripts/render_common');
const render_menu = require('../public/javascripts/render_menu');
const listen_sub = require('../public/javascripts/listen_sub');
render_common.render_common();

/**
 * 自定义事件处理
 */
const event_handler = {
	app_menu_app_close: (menu_info, menuItem, menu_event) => {
		debugger;
		alert('我不想退出~');
	},

	win_menu_app_exit: (menu_info, menuItem, menu_event) => {
		debugger;
		alert('我不想退出~');
	},

	win_menu_win_close: (menu_info, menuItem, menu_event) => {
		debugger;
		alert('我不想关闭~');
	},

	ending: true
};

// 窗口菜单事件
const win_event_handler = {
	win_menu_alert_message: (menu_info, menuItem, menu_event) => {
		debugger;
		alert('窗口标题 :: '+remote.getCurrentWindow().getTitle());
	},

	win_menu_show_userinfo: (menu_info, menuItem, menu_event) => {
		debugger;
		alert('我是王牌~');
	},

	ending: true
};

// 上下文菜单事件
const context_event_handler = {
	context_menu_show_userinfo: (menu_info, menuItem, menu_event) => {
		debugger;
		alert('个人信息 :: '+remote.getCurrentWindow().getTitle());
	},

	context_menu_startup: (menu_info, menuItem, menu_event) => {
		debugger;
		if(menuItem.checked){
			alert('开机启动~');
		}else{
			alert('非~');
		}
	},

	context_menu_gender: (menu_info, menuItem, menu_event) => {
		debugger;
		alert('我是'+menuItem.label+'生~');
	},

	ending: true
};

/**
 * 单独设置窗口菜单
 */

let win_menu_template = render_menu.win_menu_build([
	{
		id: 'new_menu_testing',
		label: '新增菜单测试（&T）',
		submenu: [
			{
				id: 'win_menu_alert_message',
				label: '在当前窗口弹出消息（&M）',
				accelerator: 'CmdOrCtrl+E',
				click: render_menu.win_menu_click
			}, {
				id: 'win_menu_show_userinfo',
				label: '用户信息（&U）',
				accelerator: 'CmdOrCtrl+U',
				click: render_menu.win_menu_click
			}, {
				id: 'win_menu_something',
				label: '没有动作（&O）',
				accelerator: 'CmdOrCtrl+O',
				click: render_menu.win_menu_click
			}
		]
	}
]);

render_menu.set_win_menu(win_menu_template);


/**
 * 上下文菜单
 */

let context_menu_template = render_menu.context_menu_build([
	{
		id: 'context_menu_show_userinfo',
		label: '个人信息（&P）',
		click: render_menu.context_menu_click
	}, {
		type: 'separator'
	}, {
		id: 'context_menu_startup',
		label: '开机启动',
		type: 'checkbox',
		checked: true,
		click: render_menu.context_menu_click
	}, {
		type: 'separator'
	}, {
		label: '性别',
		submenu: [
			{
				id: 'context_menu_gender',
				label: '男',
				type: 'radio',
				click: render_menu.context_menu_click
			}, {
				id: 'context_menu_gender',
				label: '女',
				type: 'radio',
				click: render_menu.context_menu_click
			}
		]
	}
]);

render_menu.set_context_menu(context_menu_template);

/**
 * 监听主线程和菜单事件
 */
listen_sub.listen_init();
