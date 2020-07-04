import App from './app';
import config from 'config';
import log from './logger';

try {
    await App.start();
    log.info('Serving on: ', config.port);
} catch (err) {
    log.error('Server error:', err);
    process.exit(1);
}
