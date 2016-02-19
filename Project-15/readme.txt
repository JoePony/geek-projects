数据库文件 baidunews.sql

数据库配置文件 config.json   

先执行 pm2 start app.js   

后执行 pm2 monit | grep [100|99|98] %  && pm2 restart all
目的是通过pm2监测node进程，如果cpu占有率达到或超过98%则重启服务