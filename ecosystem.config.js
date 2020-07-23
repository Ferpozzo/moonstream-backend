module.exports = {
  apps : [{
    name   : "index",
    script : "dist/src/index.js",
    exec_mode: "cluster",
    instances: 0/* ,
    env:{
      SERVER_PORT: 5000
    } */
  }]
}
