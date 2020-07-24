import App from './app';
import config from 'config';
import log from './logger';

App.start()
    .then(() => {
        log.info('Serving on: ', config.port);
    })
    .catch((err) => {
        log.error('Server error:', err.message);
        process.exit(1);
    });
