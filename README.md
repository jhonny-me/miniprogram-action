# wechat miniprogram cli action
The github action that wraps the official wechat [miniprogram-ci](https://www.npmjs.com/package/miniprogram-ci), no customize other than that.

You can refer the official miniprogram-ci for inputs and outputs. But here is a quick glance for your convenience:

## Inputs

### `appid`

**Required** 小程序/小游戏项目的 appid.

### `type`

**Optional** 项目的类型，有效值 miniProgram/miniProgramPlugin/miniGame/miniGamePlugin. Default `"miniProgram"`.

### `projectPath`

**Required** 项目的路径，即 project.config.json 所在的目录.

### `privateKey`

**Optional** 私钥，在获取项目属性和上传时用于鉴权使用，在 微信公众平台 上使用小程序管理员登录后下载.

### `privateKeyPath`

**Optional** 私钥文件的路径，（创建 Project 对象，需要传入私钥内容或私钥文件路径）.

### `ignores` SPECIAL

**Optional** 指定需要排除的规则, need to be stringified string array.

### `version`

**Required** 自定义版本号.

### `desc`

**Optional** 自定义备注.

### `setting` SPECIAL

**Optional** #编译设置, stringified object.

### `robot`

**Optional** 指定使用哪一个 ci 机器人，可选值：1 ~ 30.

### `threads`

**Optional** 指定本地编译过程中开启的线程数.

### `useCOS`

**Optional** 使用异步方式上传，当代码包大于 5MB 时，默认开启.

## Outputs

### `result`

Stringified Upload Response.

## Example usage

```yaml
uses: actions/miniprogram-action@v1.0
with:
  appid: 'appid'
  projectPath: 'projectPath'
  version: 'version'
```

