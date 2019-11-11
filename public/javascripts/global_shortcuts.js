/**
 * 注册全局快捷键
 */

const { BrowserWindow, globalShortcut } = require('electron');

const gs_cas_p = exports.gs_cas_p = () => {
	if(globalShortcut.register('CmdOrCtrl+Alt+Shift+P', () => {
		// debugger;
		BrowserWindow.fromId(1).show();
	}) == false){
		console.log('Can not register shortcut `CmdOrCtrl+Alt+Shift+P`!!!');
	}
};

exports.regist_global_shortcuts = () => {
	// debugger;
	gs_cas_p();
};