let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.addEventListener('click', function(e) {
    createHalo(e.clientX, e.clientY);
});

// 定义一个函数来创建和移动气泡
function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    document.body.appendChild(bubble);

    // 设置气泡的初始位置为最后一次鼠标记录的位置
    bubble.style.left = `${mouseX - 5}px`;
    bubble.style.top = `${mouseY - 5}px`;

    // 随机设置气泡移动的方向和距离
    const x = (Math.random() - 0.5) * 100;
    const y = (Math.random() - 0.5) * 100;

    // 立即显示气泡
    bubble.style.opacity = 1;

    // 使用CSS的transform属性让气泡缓慢移动并消失
    setTimeout(() => {
        bubble.style.transform = `translate(${x}px, ${y}px)`;
        bubble.style.opacity = 0;
    }, 10); // 短延迟确保过渡效果可见

    // 1秒后删除气泡
    setTimeout(() => {
        bubble.remove();
    }, 3000);
}

// 每200毫秒创建一个气泡
setInterval(createBubble, 20);

function createHalo(x, y) {
    const halo = document.createElement('div');
    halo.className = 'halo';
    document.body.appendChild(halo);

    halo.style.left = `${x - 25}px`;
    halo.style.top = `${y - 25}px`;

    halo.style.opacity = 1;
    halo.style.transform = 'scale(0.5)';

    setTimeout(() => {
        halo.style.opacity = 0;
        halo.style.transform = 'scale(1.2)'; // 这里是光晕的最终大小
    }, 1);

    setTimeout(() => {
        halo.remove();
    }, 1000);
}


