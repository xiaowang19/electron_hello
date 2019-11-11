/**
 * 应用菜单
 */

const { BrowserWindow, Menu, shell } = require('electron');

const app_menu_click = (menuItem, focusedWindow, evt) => {
	// debugger;
	global.menu_event['event_name'] = menuItem.id || menuItem.sublabel;
	global.menu_event['event_deal'] = false;

	focusedWindow.webContents.send('app-menu-event', {
		menu_id      : menuItem.id,
		menu_label   : menuItem.label,
		menu_sublabel: menuItem.sublabel,
		event_name   : menuItem.id || menuItem.sublabel
	}, menuItem, evt);
};

const init_app_menu = () => {
	var template = [
		{
			id: 'app_menu_file',
			label: '文件（&F）',
			submenu: [
				{
					id: 'app_menu_app_exit',
					label: '退出（&Q）',
					accelerator: 'CmdOrCtrl+Q',
					click: app_menu_click
				}
			]
		}, {
			id: 'app_menu_windows',
			label: '窗口（&W）',
			submenu: [
				{
					id: 'app_menu_win_setting',
					label: '设置（&S）',
					accelerator: 'CmdOrCtrl+S',
					click: app_menu_click
				}, {
					id: 'app_menu_open_devtools',
					label: '打开开发者工具（&D）',
					accelerator: 'CmdOrCtrl+D',
					click: app_menu_click
				}, {
					id: 'app_menu_win_close',
					label: '关闭（&W）',
					accelerator: 'CmdOrCtrl+W',
					click: app_menu_click
				}
			]
		}, {
			id: 'app_menu_help',
			label: '帮助（&H）',
			submenu: [
				{
					id: 'context_menu_electron_doc',
					label: 'Electro 官方文档',
					click: app_menu_click
				}, {
					id: 'app_menu_about_me',
					label: '关于（&A）',
					accelerator: 'CmdOrCtrl+I',
					click: app_menu_click
				}
			]
		}
	];

	return Menu.buildFromTemplate(template)
};

exports.set_app_menu = () => {
    let app_menu = init_app_menu();
	Menu.setApplicationMenu(app_menu);
};

exports.hide_app_menu = () => {
	Menu.setApplicationMenu(null);
};