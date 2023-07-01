module.exports = {
  devServer: {
    // proxy: {
    //   '^/api': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true,
    //     logLevel: 'debug',
    //     pathRewrite: { '^/api': '/' },
    //   },
    // }, 


    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/' },
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      },
    },


  },
  transpileDependencies: true
}