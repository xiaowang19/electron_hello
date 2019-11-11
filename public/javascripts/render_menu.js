/**
 * [Electron 进阶——菜单和系统托盘](https://hooray.github.io/posts/20beb467/)
 */

const {
	remote, ipcRenderer
} = require('electron');
const jQuery = require('jquery');

const event_handler_global = {
	/**
	 * 窗体菜单
	 */

	win_menu_app_exit: (menu_info, menuItem, menu_event) => {
		debugger;
		remote.app.exit();
	},
	
	win_menu_win_close: (menu_info, menuItem, menu_event) => {
		debugger;
		remote.getCurrentWindow().close();
	},
	
	win_menu_open_devtools: (menu_info, menuItem, menu_event) => {
		debugger;
		remote.getCurrentWindow().webContents.openDevTools();
	},

	win_menu_electron_doc: (menu_info, menuItem, menu_event) => {
		debugger;
		shell.openExternal('https://electronjs.org/docs/', {
			activate: false,
			workingDirectory: 'r:/'
		});
	},
	
	win_menu_about_me: (menu_info, menuItem, menu_event) => {
		debugger;
		alert('关于我们~win');
	},
	
	/**
	 * 上下文菜单
	 */
	context_menu_inspect_element: (menu_info, menuItem, menu_event) => {
		debugger;
		let win = remote.getCurrentWindow();
		let mouse_info = remote.getGlobal('mouse_info');
		console.dir(mouse_info);
		win.webContents.openDevTools();
		// win.webContents.devToolsWebContents.inspectElement(mouse_info.x, mouse_info.y);
		win.webContents.inspectElement(mouse_info.x, mouse_info.y);
	},
	
	/**
	 * 通用事件
	 */
	menu_web_contents_reload: (menu_info, menuItem, menu_event) => {
		// debugger;
		remote.getCurrentWebContents().reload();
	},
	
	ending: true
};

const win_menu_click = exports.win_menu_click = (menuItem, focusedWindow, evt) => {
	// debugger;

	/* focusedWindow.webContents.send('win-menu-event', {
		menu_id      : menuItem.id,
		menu_label   : menuItem.label,
		menu_sublabel: menuItem.sublabel,
		event_name   : menuItem.id || menuItem.sublabel
	}, menuItem, evt); */

	var menu_info = {
		menu_id      : menuItem.id,
		menu_label   : menuItem.label,
		menu_sublabel: menuItem.sublabel,
		event_name   : menuItem.id || menuItem.sublabel
	};

	// debugger;

	try {
		if(win_event_handler && win_event_handler[menu_info.event_name]){
			win_event_handler[menu_info.event_name](menu_info, menuItem, evt);
		}else{
			throw new Error('转到下面处理');
		}
	}catch(error){
		try {
			if(event_handler && event_handler[menu_info.event_name]){
				event_handler[menu_info.event_name](menu_info, menuItem, evt);
			}else{
				throw new Error('转到下面处理');
			}
		}catch(error){
			try {
				if(event_handler_global && event_handler_global[menu_info.event_name]){
					event_handler_global[menu_info.event_name](menu_info, menuItem, evt);
				}else{
					alert('木有定义事件处理方法 :: '+JSON.stringify(menu_info));
				}
			}catch(error){
				debugger;
				console.error(error);
			}
		}
	}
};

const context_menu_click = exports.context_menu_click = (menuItem, focusedWindow, evt) => {
	// debugger;

	/* focusedWindow.webContents.send('context-menu-event', {
		menu_id      : menuItem.id,
		menu_label   : menuItem.label,
		menu_sublabel: menuItem.sublabel,
		event_name   : menuItem.id || menuItem.sublabel
	}, menuItem, evt); */

	var menu_info = {
		menu_id      : menuItem.id,
		menu_label   : menuItem.label,
		menu_sublabel: menuItem.sublabel,
		event_name   : menuItem.id || menuItem.sublabel
	};
	
	// debugger;

	try {
		if(context_event_handler && context_event_handler[menu_info.event_name]){
			context_event_handler[menu_info.event_name](menu_info, menuItem, evt);
		}else{
			throw new Error('转到下面处理');
		}
	}catch(error){
		try {
			if(event_handler && event_handler[menu_info.event_name]){
				event_handler[menu_info.event_name](menu_info, menuItem, evt);
			}else{
				throw new Error('转到下面处理');
			}
		}catch(error){
			try {
				if(event_handler_global && event_handler_global[menu_info.event_name]){
					event_handler_global[menu_info.event_name](menu_info, menuItem, evt);
				}else{
					alert('木有定义事件处理方法 :: '+JSON.stringify(menu_info));
				}
			}catch(error){
				debugger;
				console.error(error);
			}
		}
	}
};




const win_menu_default = [
	{
		id: 'win_menu_file',
		label: '文件（&F）',
		submenu: [
			{
				id: 'win_menu_app_exit',
				label: '退出（&Q）',
				accelerator: 'CmdOrCtrl+Q',
				click: win_menu_click
			}
		]
	}, {
		id: 'win_menu_windows',
		label: '窗口（&W）',
		submenu: [
			{
				id: 'win_menu_win_setting',
				label: '设置（&S）',
				accelerator: 'CmdOrCtrl+S',
				click: win_menu_click
			}, {
				type: 'separator'
			}, {
				id: 'menu_web_contents_reload',
				label: '刷新（&R）',
				accelerator: 'CmdOrCtrl+R',
				click: win_menu_click
			}, {
				id: 'win_menu_win_close',
				label: '关闭（&W）',
				accelerator: 'CmdOrCtrl+W',
				click: win_menu_click
			}, {
				id: 'win_menu_open_devtools',
				label: '打开开发者工具（&D）',
				accelerator: 'CmdOrCtrl+D',
				click: win_menu_click
			}
		]
	}, {
		id: 'win_menu_help',
		label: '帮助（&H）',
		submenu: [
			{
				id: 'win_menu_electron_doc',
				label: 'Electro 官方文档',
				click: context_menu_click
			}, {
				id: 'win_menu_about_me',
				label: '关于（&A）',
				accelerator: 'CmdOrCtrl+I',
				click: win_menu_click
			}
		]
	}
];

const context_menu_default = [
	{
		id: 'context_menu_copy',
		label: '复制（&C）',
		accelerator: 'CmdOrCtrl+C',
		role: 'copy'
	}, {
		id: 'context_menu_cut',
		label: '剪切（&X）',
		accelerator: 'CmdOrCtrl+X',
		role: 'cut'
	}, {
		id: 'context_menu_paste',
		label: '粘贴（&P）',
		accelerator: 'CmdOrCtrl+P',
		role: 'paste'
	}, {
		type: 'separator'
	}, {
		id: 'menu_web_contents_reload',
		label: '刷新（&R）',
		accelerator: 'CmdOrCtrl+R',
		click: context_menu_click
	}, {
		id: 'context_menu_inspect_element',
		label: '检查（&I）',
		accelerator: 'CmdOrCtrl+I',
		click: context_menu_click
	}, {
		type: 'separator'
	}
];

exports.win_menu_build = (menu_template) => {
	// debugger;
	var i = 0, j = 0, found = false, menu_list = [];
	for(i=0; i<win_menu_default.length; i++){
		menu_list.push(jQuery.extend(true, {}, win_menu_default[i]));
	}
	menu_template = menu_template || [];
	for(i=0; i<menu_template.length; i++){
		found = false;
		for(j=0; j<menu_list.length; j++){
			if(menu_template[i].id && menu_list[j].id && menu_list[j].id == menu_template[i].id){
				found = true;
				menu_list[j] = menu_template[i];
				break;
			}else if(menu_list[j].label == menu_template[i].label){
				menu_list[j] = menu_template[i];
				found = true;
				break;
			}
		}
		if(!found){
			menu_list.push(menu_template[i]);
		}
	}
	return menu_list;
};

exports.context_menu_build = (menu_template) => {
	// debugger;
	var i = 0, j = 0, found = false, menu_list = [];
	for(i=0; i<context_menu_default.length; i++){
		menu_list.push(jQuery.extend(true, {}, context_menu_default[i]));
	}
	menu_template = menu_template || [];
	for(i=0; i<menu_template.length; i++){
		found = false;
		for(j=0; j<menu_list.length; j++){
			if(menu_template[i].id && menu_list[j].id && menu_list[j].id == menu_template[i].id){
				found = true;
				menu_list[j] = menu_template[i];
				break;
			}else if(menu_list[j].label == menu_template[i].label){
				menu_list[j] = menu_template[i];
				found = true;
				break;
			}
		}
		if(!found){
			menu_list.push(menu_template[i]);
		}
	}
	return menu_list;
};

/**
 * 窗体菜单
 */

exports.set_win_menu = (menu_template) => {
	// debugger;
	let menu = remote.Menu.buildFromTemplate(menu_template)
	remote.getCurrentWindow().setMenu(menu);

	/* ipcRenderer.on('win-menu-event', (evt, menu_info, menuItem, menu_event) => {
		// debugger;
		try {
			if(win_event_handler && win_event_handler[menu_info.event_name]){
				win_event_handler[menu_info.event_name](menu_info, menuItem, menu_event);
			}else{
				throw new Error('转到下面处理');
			}
		}catch(error){
			try {
				if(event_handler && event_handler[menu_info.event_name]){
					event_handler[menu_info.event_name](menu_info, menuItem, menu_event);
				}else{
					throw new Error('转到下面处理');
				}
			}catch(error){
				try {
					if(event_handler_global && event_handler_global[menu_info.event_name]){
						event_handler_global[menu_info.event_name](menu_info, menuItem, menu_event);
					}else{
						alert('木有定义事件处理方法 :: '+JSON.stringify(menu_info));
					}
				}catch(error){
					debugger;
					console.error(error);
				}
			}
		}
	}); */
};

/**
 * 上下文菜单
 */

exports.set_context_menu = (menu_template) => {
	// debugger;
	let context_menu = remote.Menu.buildFromTemplate(menu_template);
	window.addEventListener('contextmenu', function(evt){
		context_menu.popup({
			window: remote.getCurrentWindow()
		});
	}, false);

	/* ipcRenderer.on('context-menu-event', (evt, menu_info, menuItem, menu_event) => {
		// debugger;
		try {
			if(context_event_handler && context_event_handler[menu_info.event_name]){
				context_event_handler[menu_info.event_name](menu_info, menuItem, menu_event);
			}else{
				throw new Error('转到下面处理');
			}
		}catch(error){
			try {
				if(event_handler && event_handler[menu_info.event_name]){
					event_handler[menu_info.event_name](menu_info, menuItem, menu_event);
				}else{
					throw new Error('转到下面处理');
				}
			}catch(error){
				try {
					if(event_handler_global && event_handler_global[menu_info.event_name]){
						event_handler_global[menu_info.event_name](menu_info, menuItem, menu_event);
					}else{
						alert('木有定义事件处理方法 :: '+JSON.stringify(menu_info));
					}
				}catch(error){
					debugger;
					console.error(error);
				}
			}
		}
	}); */
}