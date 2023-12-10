// popup的脚本逻辑,响应交互事件,和background通信。打开pop页面执行,仅仅该页面使用

// 获取父元素
const parentElement = document.getElementById("flexContainer");
const bgInput = document.getElementById("bgInput")
const customPlus = document.getElementById("customPlus")
const customSub = document.getElementById("customSub")

parentElement.addEventListener("click", function(event) {
  // 检查点击事件的目标元素是否以 "rate" 开头
  if (event.target.id && event.target.id.startsWith("rate")) {
    let rateNum = event.target.id.match(/\d+\.\d+/)[0]
    // 处理所有速率按钮并传递对应消息
    bgInput.value = parseFloat(rateNum)
    chrome.runtime.sendMessage({
            type: 'CHANGE_RATE', 
            rate: parseFloat(rateNum)
          });
  } else {
    console.log('custom click')
    // bgInput.value = '111'
  }
});

// 处理修改输入速率
 bgInput.addEventListener('change', function(event) {
  // 在输入框内容改变时执行的操作
  let inputValue = Number(event.target.value);
  console.log('input change to:', event,inputValue);
  chrome.runtime.sendMessage({
    type: 'CHANGE_RATE', 
    rate: parseFloat(inputValue)
  });
});

// handle plus button
customPlus.addEventListener('click',function(event) {
  console.log('event.target.value:', event.target.value);
  let currentRate = bgInput.value
  chrome.runtime.sendMessage({
    type: 'CHANGE_RATE', 
    rate: currentRate+1
  });
})

