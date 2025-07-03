// ==UserScript==
// @name         继续教育视频自动倍速播放跳转下个章节
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  继续教育在线刷课自动下个章节
// @author       李志航
// @match        https://*/*
// @icon         https://*/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    /* globals jQuery, $, waitForKeyElements */

    //if(location.origin == 'https://main.ahjxjy.cn'){
    if(location.href.indexOf('https://main.ahjxjy.cn/studentstudio/course/studying') > -1){
        console.log("自动跳转下个章节监听已开启！");
        alert("自动跳转下个章节监听已开启！");

        // 视频倍速设置功能
        const setVideoSpeed = () => {
            const video = document.querySelector('video');
            if (video) {
                video.playbackRate = 2;
                console.log('视频已设置为 2 倍速播放');
                alert("视频已设置为 2 倍速播放！");
            }
        };

        // 首次加载时尝试设置倍速
        setVideoSpeed();

        // 章节跳转检测
        const checkNextButton = setInterval(() => {
            const buttons = document.querySelectorAll('.btn-green');

            if (buttons.length === 1) {
                console.log("该章节已学习完成，自动跳转下一章节。");
                alert("该章节已学习完成，自动跳转下一章节。");
                buttons[0].click();

                // 跳转后在新页面重新设置倍速
                setTimeout(setVideoSpeed, 3000); // 延迟执行确保新页面加载
            } else if (buttons.length === 0) {
                console.log("未监听到下一章节按钮，继续监听...");
            } else {
                console.warn("发现多个下一章节按钮，请手动操作");
                alert("发现多个下一章节按钮，请手动操作！");
            }
        }, 3000);

        // 额外添加视频检测（应对动态加载）
        const videoCheck = setInterval(() => {
            if (document.querySelector('video')) {
                setVideoSpeed();
                clearInterval(videoCheck); // 找到视频后停止检测
            }
        }, 1000);
    }
})();