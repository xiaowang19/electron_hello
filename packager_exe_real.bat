@echo off

:: cd /d G:\AppData\Nutstore\Works\Electron\ele\

set version=0.0.1
set icopath=./public/icos/toolbar-utilities.ico
if exist "G:\AppData\MEGA\Works\Electron\app" (
	set topath=G:\AppData\MEGA\Works\Electron\app
)
if exist "F:\AppData\MEGA\Works\Electron\app" (
	set topath=F:\AppData\MEGA\Works\Electron\app
)

echo topath :: %topath%
echo version :: %version%
echo icopath :: %icopath%

:: if not exist %topath% (
:: 	mkdir %topath%
:: )

:: 更换阿里镜像源
:: 加上下面这句会造成 EPERM: operation not permitted
:: set ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
set SELENIUM_CDNURL=http://npm.taobao.org/mirrorss/selenium
set CHROMEDRIVER_CDNURL=https://npm.taobao.org/mirrors/chromedriver
set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/
:: 加上下面这句会提前退出
:: npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/

electron-packager . ele --platform=win32 --arch=x64 --icon=%icopath% --out=%topath% --app-version=%version% --overwrite --electron-version 6.0.11 --asar

echo
echo 创建最终EXE成功
echo 按任意键，退出...
pause>nul
exit 0
