import { Client } from '@elastic/elasticsearch';
import config from 'config';
import log from 'logger';

let esClient;

function close() {
    return new Promise((resolve, reject) => {
        log.error('Elasticsearch closing');
        try {
            esClient.close();
            esClient = null;
            resolve(esClient);
        } catch (err) {
            reject(err);
        }
    });
}

export default function open() {
    return new Promise((resolve, reject) => {
        try {
            esClient = new Client(config.elasticsearch);
            esClient.ping({ requestTimeout: 1000 }, (err) => {
                if (err) {
                    log.error('Elasticsearch failed');
                    reject(err);
                } else {
                    log.error('Elasticsearch initialized');
                    resolve({ close });
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}
