/**
 * 全局变量
 */

// debugger;
// global.basepath   = __filename.split('ele')[0].replace(/\\/g, '/')+'ele';
// global.basepath = process.cwd()
// global.port = process.env.port || 8000;
global.windows    = {};
global.menu_event = {
	event_name: '',
	event_deal: false
};
global.mouse_info = {
	x           : 0,
	y           : 0,
	click_count : 0,
	left_click  : 0,
	right_click : 0,
	middle_click: 0,
	control_key : false,
	alt_key     : false,
	shift_key   : false,
	time        : 0,
};
global.shared_vars = {
	username: 'wangyn',
	age: 36,
};