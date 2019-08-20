const Redis = require('ioredis')
const redisConfig = {
  port: 6379, // Redis port
  host: '127.0.0.1', // Redis host
  prefix: 'sam:', //存诸前缀
  ttl: 60 * 60 * 23, //过期时间
  family: 4,
  db: 0
}
const newRedis = new Redis(redisConfig)
module.exports = newRedis
