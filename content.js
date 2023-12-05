//内容脚本,运行在网页环境中,可以读取DOM和JS上下文,实现页面交互。

// 接收来自background的消息
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

//   // 改变播放器速率
//   changeVideoSpeed(request.playbackRate);
  
//   return true;

// });


// 改变速率的方法
// function changeVideoSpeed(rate) {
//   if(!isFinite(rate)) {
//     console.log('content 传入的content rate格式不对，',rate)
//     return;  
//   }
//   let video = document.querySelector('video');
  
//   if(video) {
//     video.playbackRate = rate;
//     console.log('content video.playbackRate:',video.playbackRate)
//   } 
  
// }
var bg = chrome.extension.getBackgroundPage();
var popupInput = bg.document.getElementById('customValue');

let input = document.getElementById('customValue');
console.log('2222')
// input.addEventListener('change', function() {
//   let value = this.value; 
//   chrome.runtime.sendMessage({content: value}); 
//   console.log('2222')
// });