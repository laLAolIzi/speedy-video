// 后台持久运行的脚本,负责事件监听、消息通讯、全局状态管理等。从开始一直执行.插件存在则存在, 随着浏览器的打开而打开，随着浏览器的关闭而关闭, 通常把需要一直运行的、启动就运行的、全局的代码放在background里面
const RATE_KEY = 'default_rate';  
// 初始化时读取  
// 注册内容脚本
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    console.log('complete',tabId)
    // 获取存储的默认速率  
    chrome.storage.local.get('default_rate', (res) => {
      let defaultRate = 1;
      if(res['default_rate']) {
        defaultRate = res['default_rate'];  
      }
      console.log('res[RATE_KEY],',res['default_rate'],'defaultRate',defaultRate)
      // chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      chrome.tabs.query({active: true, audible: true}, tabs => {
        chrome.scripting.executeScript({
          target: {tabId},
          func: setVideoRate,
          args: [defaultRate]  
        });
      });
    });
  }

});


// 接收来自popup的消息 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.type == 'CHANGE_RATE') {
    chrome.tabs.query({active: true, audible: true}, tabs => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        func: setVideoRate,
        args: [request.rate]  
      });
    });

  }

});

// 将速率设置值传给content script,在本js处理播放速度
function setVideoRate(rate = 1) {
  console.log('当前视频倍率为,',rate)
  if(!isFinite(rate)) {
    console.log('background 传入的background rate格式不对 ，',rate)
    return;  
  }
  let video = document.querySelector('video');
  video.playbackRate = rate;
  chrome.storage.local.set({['default_rate']:rate})
  chrome.storage.local.get('default_rate',(res)=>{console.log('default_rate:',res['default_rate'])})
}