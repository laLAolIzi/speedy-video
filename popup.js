// popup的脚本逻辑,响应交互事件,和background通信。

// 获取父元素
const parentElement = document.getElementById("flexContainer");
const bgInput = document.getElementById("bgInput")

parentElement.addEventListener("click", function(event) {
  // 检查点击事件的目标元素是否以 "rate" 开头
  console.log('click button')
  if (event.target.id && event.target.id.startsWith("rate")) {
    // 处理所有速率按钮并传递对应消息
    chrome.runtime.sendMessage({
            type: 'CHANGE_RATE', 
            rate: parseFloat(event.target.id.match(/\d+\.\d+/)[0])
          });
  } else {
    console.log('custom click')
    bgInput = '111'
  }
});

// console.log('bgInput',bgInput)
// bgInput.addEventListener("click",function(event){
//   console.log('111111111')
//   chrome.runtime.sendMessage({
//     type: 'INPUT_RATE', 
//     rate: parseFloat(event.target.id.match(/\d+\.\d+/)[0])
//   });
// })


