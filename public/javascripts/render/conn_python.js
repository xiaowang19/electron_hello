const { remote } = require('electron');
const os = require('os');
const path = require('path');
const { PythonShell } = require('python-shell');
const rp = require('request-promise');
const cheerio = require('cheerio');
const jQuery = require('jquery');

const utils = require('../public/javascripts/utils');
const render_common = require('../public/javascripts/render_common');
const render_menu = require('../public/javascripts/render_menu');
const listen_sub = require('../public/javascripts/listen_sub');
render_common.render_common();
const port = process.env.port || 8000;

// 窗口菜单
let win_menu_template = render_menu.win_menu_build([]);
render_menu.set_win_menu(win_menu_template);

// 上下文菜单
let context_menu_template = render_menu.context_menu_build([]);
render_menu.set_context_menu(context_menu_template);

let csrf_token = '';

const username = document.querySelector('#username');
const result = document.querySelector('#result');

py_paths = [
	path.join(process.cwd(), '../py-env/python.exe'),
	path.join(process.cwd(), 'py-env/python.exe'),
];
if(process.env.PYTHON_PATH){
	py_paths.push(path.join(process.env.PYTHON_PATH, 'python.exe'));
}
py_paths.push('E:/Anaconda3/python.exe');
py_paths.push('C:/ProgramData/Anaconda3/python.exe');
console.log('py_paths :: ', py_paths);

py_path = utils.fns.choose_exists_file(py_paths);
console.log('py_path :: ', py_path);


script_paths = [
	path.join(process.cwd(), '../py-script'),
	path.join(process.cwd(), 'py-script'),
];
console.log('script_paths :: ', script_paths);

script_path = utils.fns.choose_exists_file(script_paths);
console.log('script_path :: ', script_path);

const exec_python = () => {
	console.dir('process.cwd() :: ', process.cwd());
	console.dir('__dirname :: ', __dirname);
	console.dir('__filename :: ', __filename);

	let options = {
		mode         : 'text',	// text / json / binary
		pythonPath   : py_path,	//
		pythonOptions: ['-u'],	// get print results in real-time
		scriptPath   : script_path,	// 查找 Python 脚本的默认路径，默认 = 当前工作目录
		args         : ['run', '--clsname=Demo', '--method=hello', username.value, 'testing']
	}
	PythonShell.run('api.py', options, function(err, results){
		// debugger;
		if(err){
			console.log(err);
		}else{
			result.value = JSON.stringify(results);
			alert(JSON.stringify(results));
		}

	});
}

username.addEventListener('input', () => {
	// debugger;
	exec_python();
});

// username.dispatchEvent(new Event('input'));

document.getElementById('btn_exec').addEventListener('click', () => {
	// debugger;
	exec_python();
});

document.getElementById('btn_inter').addEventListener('click', () => {
	// debugger;
	let pyshell = new PythonShell('inter.py', {
		mode: 'text',
		pythonPath: py_path,
		scriptPath   : script_path,	// 查找 Python 脚本的默认路径，默认 = 当前工作目录
		pythonOptions: ['-u'],
		formatter	: function(message){
			// debugger;
			result.value = 'message :: '+message;
			alert('message :: '+message);
			return message;
		},
		parser: function(message){
			// debugger;
			return message;
		},
		stderrParser: function(stderr){
			debugger;
			return stderr;
		}
	});
	pyshell.on('message', function(message){
		// debugger;
		console.log('receive :: '+message);
	});
	pyshell.send(username.value);
	pyshell.send(Buffer.from('wowo\nhaha', 'utf-8').toString('base64'));
	pyshell.end(function(err, code, signal){
		// debugger;
		if (err){
			console.error(err);
		}else{
			console.log('The exit code was: ' + code);
			console.log('The exit signal was: ' + signal);
			console.log('done.');
		}
	});
});


document.getElementById('btn_request').addEventListener('click', () => {
	// debugger;
	rp({
		uri: 'http://127.0.0.1:'+port+'/demo/get_csrf_token',
		qs: {
			access_token: 'xxxxxxxx'
		},
		body: {
			username: 'wangyn',
			age: 36
		},
		json: true,
		/* transform: function(body){
			return cheerio.load(body);
		} */
	})
		.then(function(response){
			debugger;
			csrf_token = response.csrf_token;
			result.value = JSON.stringify(response);
			alert(JSON.stringify(response));
		})
		.catch(function(err){
			debugger;
			console.error(err);
		});
});

document.getElementById('btn_ajax').addEventListener('click', () => {
	// debugger;
	var body = jQuery('form').serializeArray();
	jQuery.ajax({
		url: 'http://127.0.0.1:'+port+'/demo/post',
		type: 'POST',
		dataType: 'json',	// html / json
		contentType: 'application/x-www-form-urlencoded',
		data: body,
		success: function(response){
			// debugger;
			result.value = JSON.stringify(response);
			alert(JSON.stringify(response));
		},
		complete: function(xhr){
			console.log('complete.');
		},
		error: function(xhr){
			debugger;
			console.error(xhr);
		}
	});
});

document.getElementById('btn_real_time').addEventListener('click', () => {
	debugger;
	if ('WebSocket' in window){
		var socket = new WebSocket('ws://127.0.0.1:'+port+'/demo/socket_send');
		console.log(socket);
		socket.onopen = function(e){
			// debugger;
			console.log('WebSocket open');		// 成功连接上Websocket
			socket.send('发送的数据');			  // 发送数据到服务端
		};
		socket.onmessage = function (e) {
			// debugger;
			console.log('返回数据 :: ' + e.data);  // 打印服务端返回的数据
			// alert('返回数据 == ', e.data);
			result.value = result.value + ' ' + e.data;
		};
		socket.onclose = function(e){
			debugger;
			console.dir(e);
		};
		socket.onerror = function(e){
			debugger;
			console.dir(e);
		};
	}else{
		alert('您的浏览器不支持 WebSocket ~');
	}
});

/**
 * 表单
 */

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

layui.use(['form', 'laydate'], function () {
	var form = layui.form;
	var laydate = layui.laydate;

	laydate.render({
		elem: '#birthday'
	});

	//监听提交
	form.on('submit(formDemo)', (data) => {
		debugger;
		/* if(csrf_token == ''){
			layui.layer.alert('csrf_token 为空~');
			return false;
		} */
		// var body = jQuery('form').serialize();
		var body = data.field;
		rp({
			method: 'post',
			uri: 'http://127.0.0.1:'+port+'/demo/post',
			qs: {
				csrfmiddlewaretoken: csrf_token
			},
			body: body,
			json: true,
			/* transform: function(body){
				debugger;
				return cheerio.load(body);
			} */
		})
			.then(function(response){
				debugger;
				result.value = JSON.stringify(response);
				alert(JSON.stringify(response));
			})
			.catch(function(err){
				debugger;
				console.error(err);
			});
		return false;
	});
});

/**
 * 监听主线程和菜单事件
 */
listen_sub.listen_init();