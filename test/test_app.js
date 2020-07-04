import App from 'app';
import config from 'config';
import request from 'supertest';

// todo: create docker-compose test environment so we can run the server

describe('app bootstrap', () => {
    let app = null;

    before(async () => {
        app = await App.start();
    });

    after(async () => {
        if (app) {
            app.shutdown();
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
});
