module.exports = {
    apps: [{
      name: 'school-server',
      script: './server.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-18-217-219-88.us-east-2.compute.amazonaws.com',
        key:  '~/.ssh/schoolserver.pem',
        ref:  'origin/master',
        repo: 'https://github.com/ramjibs/schoolApp.git',
        path: '/home/ubuntu/server',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }