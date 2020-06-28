import { utils } from 'wonderland-commons';
import App from 'app';
import config from 'config';
import request from 'supertest';

const { safely, conditionalOnEnv } = utils;

describe('app bootstrap', () => {
    let app = null;

    before(
        conditionalOnEnv('test-docker', async () => {
            app = await safely(App.start);
        })
    );

    after(async () => {
        if (app) {
            await safely(app.shutdown);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    });

    it('should ping', async () => {
        await request(app.server)
            .get(`${config.prefix}/ping`)
            .expect(200);
    });

    it('should respond to health check', async () => {
        await request(app.server)
            .get(`${config.prefix}/health`)
            .expect(200);
    });

    it('should respond to heartbeat', async () => {
        await request(app.server)
            .get(`${config.prefix}/heartbeat`)
            .expect(200);
    });

    it('should return config', async () => {
        await request(app.server)
            .get(`${config.prefix}/config`)
            .expect(200);
    });
});
