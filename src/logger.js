import { createLogger, format, transports } from 'winston';
import config from 'config';

const { name, level } = config.logger;

export default createLogger({
    name,
    level,
    transports: [
        new transports.Console({
            level,
            format: format.combine(format.timestamp(), format.splat(), format.json()),
        }),
    ],
});
