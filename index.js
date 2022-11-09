const core = require('@actions/core');
const github = require('@actions/github');
const ci = require('miniprogram-ci')

(async () => {
    // Project option

  // REQUIRED: 小程序/小游戏项目的 appid
  const appid = core.getInput('appid');
  // REQUIRED: 项目的类型，有效值 miniProgram/miniProgramPlugin/miniGame/miniGamePlugin
  const type = core.getInput('type');
  // 项目的路径，即 project.config.json 所在的目录
  const projectPath = core.getInput('projectPath');
  // 私钥，在获取项目属性和上传时用于鉴权使用，在 微信公众平台 上使用小程序管理员登录后下载
  const privateKey = core.getInput('privateKey');
  // 私钥文件的路径，（创建 Project 对象，需要传入私钥内容或私钥文件路径）
  const privateKeyPath = core.getInput('privateKeyPath');
  // 指定需要排除的规则
  const ignores = core.getInput('ignores');

  // Upload option

  // REQUIRED: 自定义版本号
  const version = core.getInput('version');
  // 自定义备注
  const desc = core.getInput('desc');
  // #编译设置
  const setting = core.getInput('setting');
  // 指定使用哪一个 ci 机器人，可选值：1 ~ 30
  const robot = core.getInput('robot');
  // 指定本地编译过程中开启的线程数
  const threads = core.getInput('threads');
  // 使用异步方式上传，当代码包大于 5MB 时，默认开启
  const useCOS = core.getInput('useCOS');

  let ignoreRules;
  if (ignores) {
    ignoreRules = JSON.parse(ignores);
  }

  let settingsObj;
  if (setting) {
    settingsObj = JSON.parse(setting);
  }


  const project = new ci.Project({
    appid,
    type,
    projectPath,
    privateKey,
    privateKeyPath,
    ignores: ignoreRules,
  })

  try {
    const uploadResult = await ci.upload({
      project,
      version: version,
      desc,
      setting: settingsObj,
      robot,
      threads,
      useCOS,
      onProgressUpdate: console.log,
    });
    const resultString = JSON.stringify(uploadResult, undefined, 2);
    core.setOutput("result", resultString);
    console.log(resultString)
  } catch(error) {
    core.setFailed(error.message);
  }
})()
