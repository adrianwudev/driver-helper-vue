module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8080',
        // target: 'http://172.21.64.1:8080',
        // target: 'http://backend:8080',
        // target: process.env.VUE_APP_API_URL || 'http://localhost:3080',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/' },
      },
    }, 


  },
  transpileDependencies: true
}