
let gulp = require('gulp') //加载gulp模块
let minimist = require('minimist') //传参
let pro = require('child_process') //运行子进程库
let sftp = require('gulp-sftp') //sftp上传程序
let projectName='tcweixin'
let gutil = require('gulp-util');


let username=process.env['tjdusername'];
let password=process.env['tjdpassword']
let assets = process.cwd() + '/'+projectName,
  remoteServer1Prep = {
      host: '123.56.7.118',
      port: 22444,
      remotePath: '/server/nginx/html/tcweixin/tcweixin',
      user: username,
      pass: password
  },
  remoteServer2Prep = {
      host: '123.56.8.169',
      port: 22444,
      remotePath: '/server/nginx/html/tcweixin/tcweixin',
      user: username,
      pass: password
  },
  remoteServer1Test = {
      host: '39.106.124.125',
      port: 22444,
      remotePath: '/server/nginx/html/tcweixin/tcweixin',
      user: 'root',
      pass: 'Tceasy01'
  },
  remoteServer1Dev = {
      host: '192.5.0.20',
      port: 22,
      remotePath: '/server/nginx/html/tcweixin/tcweixin',
      user: 'root',
      pass: 'Tceasy01'
  }


const build = (env) => {
  return new Promise((resolve, reject) => {
    pro.exec('npm run '+env, (error, stdout, stderr) => {
      if (error !== null) {
        console.log('exec error: ' + error)
      }
      resolve()
      console.log('build codeing finished')
    })
  })
}

//先执行build命令打包。在把程序上传至服务器
gulp.task('dev', () => build('realDev').then(() => {
  gulp.src(assets + '/**').pipe(sftp(remoteServer1Dev));
}))
gulp.task('test', () => build('realTest').then(() => {
  gulp.src(assets + '/**').pipe(sftp(remoteServer1Test));
}))
gulp.task('prep', () => build('realPrep').then(() => {
    gulp.src(assets + '/**').pipe(sftp(remoteServer1Prep)).pipe(sftp(remoteServer2Prep))
}))
gulp.task('neutral', () => build('neutral').then(() => {
    gulp.src(assets + '/**').pipe(sftp(remoteServer1Prep)).pipe(sftp(remoteServer2Prep))
}))


