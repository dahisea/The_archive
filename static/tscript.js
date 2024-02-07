// 这是前端界面的 JS 文件，用于与 Workers 交互，发送和接收数据
// 获取 HTML 元素的引用
const form = document.getElementById("form");
const url = document.getElementById("url");
const method = document.getElementById("method");
const threads = document.getElementById("threads");
const requests = document.getElementById("requests");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const status = document.getElementById("status");
const statusText = document.getElementById("status-text");
const result = document.getElementById("result");
const resultText = document.getElementById("result-text");

// 定义 Workers 的地址，根据实际情况修改
const workersUrl = "https://cnnic-chinatelecom-chinamobile-chinaunicom--bili-d.dahi.icu";

// 定义一个定时器，用于定期查询测压的状态和结果
let timer = null;

// 为开始按钮添加点击事件监听器，发送开始测压的请求
start.addEventListener("click", async () => {
  // 获取表单中的数据，构造请求的参数
  const data = {
    url: url.value,
    method: method.value,
    threads: threads.value,
    requests: requests.value
  };
  // 发送 POST 请求到 Workers 的 /start 路径，附带请求的参数
  const response = await fetch(workersUrl + "/start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  // 获取响应的文本
  const text = await response.text();
  // 如果响应的状态码是 200，表示成功开始测压
  if (response.status === 200) {
    // 更新状态文本为响应的文本
    statusText.textContent = text;
    // 启动定时器，每隔一秒查询一次测压的状态和结果
    timer = setInterval(queryStatusAndResult, 1000);
  } else {
    // 否则，表示失败，弹出警告框显示响应的文本
    alert(text);
  }
});

// 为停止按钮添加点击事件监听器，发送停止测压的请求
stop.addEventListener("click", async () => {
  // 发送 GET 请求到 Workers 的 /stop 路径
  const response = await fetch(workersUrl + "/stop");
  // 获取响应的文本
  const text = await response.text();
  // 如果响应的状态码是 200，表示成功停止测压
  if (response.status === 200) {
    // 更新状态文本为响应的文本
    statusText.textContent = text;
    // 停止定时器
    clearInterval(timer);
  } else {
    // 否则，表示失败，弹出警告框显示响应的文本
    alert(text);
  }
});

// 定义一个查询测压的状态和结果的函数，用于定时器调用
async function queryStatusAndResult() {
  // 发送 GET 请求到 Workers 的 /status 路径，获取测压的状态
  const statusResponse = await fetch(workersUrl + "/status");
  // 获取响应的文本
  const statusText = await statusResponse.text();
  // 如果响应的状态码是 200，表示成功获取测压的状态
  if (statusResponse.status === 200) {
    // 更新状态文本为响应的文本
    statusText.textContent = statusText;
  } else {
    // 否则，表示失败，弹出警告框显示响应的文本
    alert(statusText);
  }

  // 发送 GET 请求到 Workers 的 /result 路径，获取测压的结果
  const resultResponse = await fetch(workersUrl + "/result");
  // 获取响应的文本
  const resultText = await resultResponse.text();
  // 如果响应的状态码是 200，表示成功获取测压的结果
  if (resultResponse.status === 200) {
    // 更新结果文本为响应的文本
    resultText.textContent = resultText;
  } else {
    // 否则，表示失败，弹出警告框显示响应的文本
    alert(resultText);
  }
}
