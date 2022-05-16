module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: "com.jakerieger.sessions4live",
        productName: "Sessions4Live",
        mac: {
          icon: "./icon.icns",
        },
        win: {
          icon: "./icon.ico",
        }
      }
    }
  }
}