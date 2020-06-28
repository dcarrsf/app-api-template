import _ from 'lodash';
import log from '../logger';

export default (ignorePaths) => {
    return async (ctx, next) => {
        if (_.includes(ignorePaths, ctx.path)) {
            return next();
        }
        log.info(`${ctx.method} ${ctx.originalUrl}`);
        const start = new Date().getTime();
        try {
            await next();
            const end = new Date().getTime();
            const elapsed = end - start;
            log.info(`${ctx.method} ${ctx.originalUrl} ${ctx.status} ${elapsed}`);
        } catch (err) {
            const end = new Date().getTime();
            const elapsed = end - start;
            log.info(`${ctx.method} ${ctx.originalUrl} ${ctx.status} ${elapsed}`);
            throw err;
        }
    };
};
