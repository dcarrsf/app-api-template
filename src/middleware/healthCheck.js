const DEFAULT_PATH = '/health';

async function getHealthCheck() {
    return {
        timestamp: Date.now(),
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
    };
}

function getErrorMessage(err) {
    return {
        timestamp: Date.now(),
        message: err.message,
    };
}

export default (route) => {
    const path = route || DEFAULT_PATH;
    return async (ctx, next) => {
        if (path === ctx.path) {
            let result, status;
            try {
                status = 200;
                result = await getHealthCheck();
            } catch (err) {
                status = 500;
                result = getErrorMessage(err);
            }
            ctx.body = result;
            ctx.status = status;
        } else {
            await next();
        }
    };
};
