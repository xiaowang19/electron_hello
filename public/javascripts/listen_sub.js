/**
 * 监听主线程或菜单消息
 * 默认行为
 */

const { remote, ipcRenderer } = require('electron');
const path = require('path');

const event_handler_global = {
	app_menu_app_exit: (menu_info, menuItem, menu_event) => {
		debugger;
		remote.app.exit();
	},
	
	app_menu_win_close: (menu_info, menuItem, menu_event) => {
		debugger;
		remote.getCurrentWindow().close();
	},
	
	app_menu_open_devtools: (menu_info, menuItem, menu_event) => {
		debugger;
		remote.getCurrentWindow().webContents.openDevTools();
	},
	
	app_menu_electron_doc: (menu_info, menuItem, menu_event) => {
		debugger;
		shell.openExternal('https://electronjs.org/docs/', {
			activate: false,
			workingDirectory: 'r:/'
		});
	},
	
	app_menu_about_me: (menu_info, menuItem, menu_event) => {
		debugger;
		alert('关于我们~app');
	},
	
	ending: true
};

const listen_init = exports.listen_init = () => {
	ipcRenderer.on('app-menu-event', (evt, menu_info, menuItem, menu_event) => {
		debugger;
		if(remote.getGlobal('menu_event').event_deal){
			return;
		}

		try {
			if(app_event_handler && app_event_handler[remote.getGlobal('menu_event').event_name]){
				app_event_handler[remote.getGlobal('menu_event').event_name](menu_info, menuItem, menu_event);
			}else{
				throw new Error('转到下面处理~');
			}
		}catch(error){
			try {
				if(event_handler && event_handler[remote.getGlobal('menu_event').event_name]){
					event_handler[remote.getGlobal('menu_event').event_name](menu_info, menuItem, menu_event);
				}else{
					throw new Error('转到下面处理~');
				}
			}catch(error){
				try {
					if(event_handler_global && event_handler_global[remote.getGlobal('menu_event').event_name]){
						event_handler_global[remote.getGlobal('menu_event').event_name](menu_info, menuItem, menu_event);
					}else{
						alert('木有定义事件处理方法 :: '+JSON.stringify(menu_info).replace(/,/g, '\n'));
					}
				}catch(error){
					debugger;
					console.error(error);
				}
			}
		}
	});
};

// listen_init();