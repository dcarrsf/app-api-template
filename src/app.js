import { elasticsearch, mongo, redis } from './services';
import { errorHandler, healthCheck, ping, requestLogger } from './middleware';
import _ from 'lodash';
import bodyParser from 'koa-bodyparser';
import config from 'config';
import gracefulShutdown from 'http-graceful-shutdown';
import helmet from 'koa-helmet';
import Koa from 'koa';
import log from './logger';
import routes from './routes';

const app = new Koa();

app.use(errorHandler);
app.use(requestLogger(['/health']));
app.use(helmet());
app.use(bodyParser());
app.use(healthCheck(config.prefix + '/health'));
app.use(ping(config.prefix + '/ping'));
app.use(routes);

async function shutdown(services) {
    return Promise.all(_.map(services, (s) => s.close()));
}

async function startup(services) {
    const server = app.listen(config.port);
    await Promise.all(_.map(services, (s) => s(app)));
    gracefulShutdown(server, {
        timeout: config.shutdownTimeout,
        onShutdown: async () => await shutdown(services),
        finally: () => log.info('Server gracefully shut down...'),
    });
    return server;
}

export default {
    start: async () => {
        const servicesLifecycle = [elasticsearch, mongo, redis];
        const server = await startup(servicesLifecycle);
        return {
            server,
            shutdown: () => shutdown(servicesLifecycle),
        };
    },
};
