
// 存储用户消息和助手回复的数组
var pages = [];
// 当前页的索引
var currentPage = 0;






function sendMessage() {
    // 获取用户输入的消息
    var userInput = document.getElementById('userInput');
    var userMessage = userInput.value;
    // 获取对话框元素
    var dialogBox = document.querySelector('.dialog-box');

    // 将之前的对话框内容隐藏
    dialogBox.innerHTML = '';

    // 创建并添加用户消息的元素
    var userMessageElement = document.createElement('p');
    userMessageElement.textContent = userMessage;
    userMessageElement.classList.add('user-message');
    dialogBox.appendChild(userMessageElement);

    // 创建并添加助手回复的元素
    var assistantMessage = 'This is an assistant response.';
    var assistantMessageElement = document.createElement('p');
    assistantMessageElement.textContent = assistantMessage;
    assistantMessageElement.classList.add('assistant-message');
    dialogBox.appendChild(assistantMessageElement);

    // 将用户消息和助手回复存储到数组中
    pages.push({
        userMessage: userMessage,
        assistantMessage: assistantMessage
    });

    // 显示对话框，并设置当前页为最后一页
    dialogBox.classList.remove('hidden');
    currentPage = pages.length - 1;


    // 清空输入框内容
    userInput.value = '';

    // 添加渐变动画
    setTimeout(function() {
        userMessageElement.style.opacity = '1';
        assistantMessageElement.style.opacity = '1';
    }, 10); // 稍微延迟一点，避免动画触发太快
}

// 显示上一页的函数
function showPrevPage() {
    // 如果当前页不是第一页，则将当前页减一并显示该页内容
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
}

// 显示下一页的函数
function showNextPage() {
    // 如果当前页不是最后一页，则将当前页加一并显示该页内容
    if (currentPage < pages.length - 1) {
        currentPage++;
        showPage(currentPage);
    }
}

// 根据页码显示对应页的内容的函数
function showPage(pageIndex) {
    var dialogBox = document.querySelector('.dialog-box');
    // 清空对话框原有内容
    dialogBox.innerHTML = '';
    // 从第一页到当前页逐个显示消息
    for (var i = 0; i <= pageIndex; i++) {
        var page = pages[i];
        var userMessageElement = document.createElement('p');
        userMessageElement.textContent = page.userMessage;
        userMessageElement.classList.add('user-message');
        dialogBox.appendChild(userMessageElement);
        var assistantMessageElement = document.createElement('p');
        assistantMessageElement.textContent = page.assistantMessage;
        assistantMessageElement.classList.add('assistant-message');
        dialogBox.appendChild(assistantMessageElement);

        // 添加渐变动画
        setTimeout(function() {
            userMessageElement.style.opacity = '1';
            assistantMessageElement.style.opacity = '1';
        }, 10); // 稍微延迟一点，避免动画触发太快
    }
}



// 显示上一页的函数
function showPrevPage() {
    // 如果当前页不是第一页，则将当前页减一并显示该页内容
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
}

// 显示下一页的函数
function showNextPage() {
    // 如果当前页不是最后一页，则将当前页加一并显示该页内容
    if (currentPage < pages.length - 1) {
        currentPage++;
        showPage(currentPage);
    }
}

// 根据页码显示对应页的内容的函数
function showPage(pageIndex) {
    var dialogBox = document.querySelector('.dialog-box');
    dialogBox.innerHTML = '';
    var page = pages[pageIndex];
    var userMessageElement = document.createElement('p');
    userMessageElement.textContent = page.userMessage;
    userMessageElement.classList.add('user-message');
    dialogBox.appendChild(userMessageElement);
    var assistantMessageElement = document.createElement('p');
    assistantMessageElement.textContent = page.assistantMessage;
    assistantMessageElement.classList.add('assistant-message');
    dialogBox.appendChild(assistantMessageElement);
}
