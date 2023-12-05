// popup的脚本逻辑,响应交互事件,和background通信。

// 获取父元素
const parentElement = document.getElementById("flexContainer");
const bgInput = document.getElementById("bgInput")

parentElement.addEventListener("click", function(event) {
  // 检查点击事件的目标元素是否以 "rate" 开头
  let rateNum = event.target.id.match(/\d+\.\d+/)[0]
  if (event.target.id && event.target.id.startsWith("rate")) {
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
console.log('bgInput',bgInput)
 bgInput.addEventListener('change', function(event) {
  // 在输入框内容改变时执行的操作
  var inputValue = event.target.value;
  console.log('输入框的值已改变为：', inputValue);
});


