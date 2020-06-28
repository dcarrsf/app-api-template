import log from '../logger';

export default async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.body = err.message;
        ctx.status = err.status || 500;
        log.info('Error: %j status %d', ctx.body, ctx.status);
    }
};
