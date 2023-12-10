//内容脚本,运行在网页环境中,可以读取DOM和JS上下文,实现页面交互。注入页面，刷新当前页面，或打开新页面执行

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

// 将速率设置值传给content script
// chrome.runtime.onMessage.addListener((msg)=> {
//     if(msg.type === 'SET_RATE') {
//         console.log('SET_RATE')
    
//         if(!isFinite(msg.value)) {
//         console.log('background 传入的background rate格式不对 ，',msg.value)
//         return;  
//         }
//         console.log('111,',)    
//         let video = document.querySelector('video');
//         console.log('222,',)  
//         video.playbackRate = msg.value;
//         console.log('background video.playbackRate:',video.playbackRate)
//   }
// })