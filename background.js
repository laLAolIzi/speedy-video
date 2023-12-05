// 后台持久运行的脚本,负责事件监听、消息通讯、全局状态管理等。

// 注册内容脚本
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  if (changeInfo.status === 'complete') {

    chrome.scripting.insertCSS({
      target: { tabId: tabId },
      files: ['/content.css']
    });

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      // setVideoSpeed 会直接执行
      func: setVideoSpeed, 
      // func: setVideoSpeed(rate = 1), 
    });

  }

});


// 接收来自popup的消息 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.type == 'CHANGE_RATE') {

//test
// var bg = chrome.extension.getBackgroundPage();
// var popupInput = bg.document.getElementById('customValue');


    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        func: setVideoSpeed,
        args: [request.rate]  
      });
    });

  }

});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.type == 'INPUT_RATE'){
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        func: setBgInput,
        args: [request.rate]
      })
    })
  }
})


// 将速率设置值传给content script
function setVideoSpeed(rate = 1) {
  console.log('当前视频倍率为,',rate)

  if(!isFinite(rate)) {
    console.log('background 传入的background rate格式不对 ，',rate)
    return;  
  }
  // const btn = document.getElementById('custom');
  // const text = document.getElementById('customValue');
  // console.log('---CHANGE_RATE',document,text)

  // text.innerText = 'Changed text';
  console.log('111,',)    
  
  let video = document.querySelector('video');
  video.playbackRate = rate;
  console.log('background video.playbackRate:',video.playbackRate)
}

function setBgInput(rate = 1) {
  console.log('INPUT_RATE',rate)

}