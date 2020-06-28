import config from 'config';
import log from 'logger';
import mongoose from 'mongoose';

function close() {
    return new Promise((resolve, reject) => {
        log.info('Mongo closing...');
        try {
            mongoose.connection.once('close', resolve);
            mongoose.connection.once('error', reject);
            mongoose.connection.close();
        } catch (err) {
            reject(err);
        }
    });
}

export default function open() {
    return new Promise((resolve, reject) => {
        try {
            mongoose.connection.once('open', function () {
                log.info('Mongo initialized');
                resolve({ close });
            });

            mongoose.connection.once('error', (error) => {
                log.error('Mongo failed');
                reject(error);
            });

            mongoose.connect(config.connectString, config.mongo);
        } catch (err) {
            reject(err);
        }
    });
}
