document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("clickButtonAudio"); // 获取音频元素

    var buttons = document.querySelectorAll(".button"); // 获取所有按钮

    buttons.forEach(function(button) { // 为每个按钮添加点击事件处理程序
        // button.addEventListener("mouseenter", function() {
        //     audio.currentTime = 0; // 将音频时间设置为0，以便每次点击都能从头开始播放
        //     audio.play(); // 播放音频
        // });
        button.addEventListener("mousedown", function() {
            audio.currentTime = 0; // 将音频时间设置为0，以便每次点击都能从头开始播放
            audio.volume = 0.2;
            audio.play(); // 播放音频
        });
    });
});
