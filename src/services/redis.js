import config from 'config';
import log from 'logger';
import redis from 'redis';

let redisClient;

function close() {
    return new Promise((resolve, reject) => {
        log.info('Redis closing...');
        try {
            redisClient.once('end', resolve);
            redisClient.once('error', reject);
            redisClient.quit();
        } catch (err) {
            reject(err);
        }
    });
}

export default function open() {
    return new Promise((resolve, reject) => {
        try {
            const { port, host } = config.redis;
            redisClient = redis.createClient(port, host);
            redisClient.once('end', () => (redisClient = null));
            redisClient.once('error', reject);
            redisClient.once('ready', () => {
                log.info('Redis initialized');
                resolve({
                    client: redisClient,
                    close,
                });
            });
        } catch (err) {
            reject(err);
        }
    });
}
