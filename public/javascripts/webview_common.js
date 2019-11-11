const { remote } = require('electron');

const window_key_event = () => {
    /**
     * 键盘事件
     */
    window.addEventListener('keydown', (evt) => {
        // debugger;
        console.log('keyCode == '+evt.keyCode);
    }, true);

    window.addEventListener('keyup', (evt) => {
        // debugger;
        console.log('keyCode == '+evt.keyCode);
        if(evt.keyCode == 116){	// F5
            window.location.href = window.location.href;
        }else{
            // debugger;
            // 向渲染进程发送消息
			remote.getCurrentWindow().send('key-down-from-webview', {
                keyCode: evt.keyCode
            });
		}
    }, true);
};

onload = () => {
    window_key_event();
};