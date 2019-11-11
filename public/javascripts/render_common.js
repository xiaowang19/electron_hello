const { remote } = require('electron');
const Darkmode = require('darkmode-js');
require('devtron').install();

const mouse_event_init = () => {
    document.onmousedown = (evt) => {
        // debugger;
        let time = new Date().getTime();
        let click_count = remote.getGlobal('mouse_info').click_count;
        if(time - remote.getGlobal('mouse_info').time < 500){
            click_count ++;
        }else{
            click_count = 1;
        }
        
        remote.getGlobal('mouse_info').time = time;
        remote.getGlobal('mouse_info').click_count = click_count;
        remote.getGlobal('mouse_info').x = evt.pageX;
        remote.getGlobal('mouse_info').y = evt.pageY;
        remote.getGlobal('mouse_info').ctrl_key = evt.ctrlKey;
        remote.getGlobal('mouse_info').alt_key = evt.altKey;
        remote.getGlobal('mouse_info').shift_key = evt.shiftKey;
        remote.getGlobal('mouse_info').left_click = evt.button == click_count ? click_count : 0;
    };
}

const render_darkmode = exports.render_darkmode = () => {
    /**
     * 黑暗模式
     */
    const darkmode = new Darkmode({
        time: '1s',
        color: '#242424'
    });
    darkmode.showWidget();
    darkmode.toggle();
    setTimeout(() => {
        document.querySelector('.darkmode-toggle').click();
        setTimeout(() => {
            document.querySelector('.darkmode-toggle').click();
        }, 10);
    }, 10);
};

const window_key_event = exports.window_key_event = () => {
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
            let win = remote.getCurrentWindow();
            if(win){
                win.webContents.reload();
            }
        }else if(evt.keyCode == 123){	// F12
            // let win = remote.BrowserWindow.getFocusedWindow();
            let win = remote.getCurrentWindow();
            if(win){
                /* if(win.webContents.isDevToolsOpened()){
                    win.webContents.closeDevTools();
                }else{
                    win.webContents.openDevTools({mode: 'right'});
                } */
                win.webContents.toggleDevTools();
            }
        }
    }, true);
};

exports.render_common = () => {
    // debugger;
    mouse_event_init();
    // render_darkmode();
    window_key_event();
};