const DEFAULT_PATH = '/ping';

async function info() {
    return {
        title: process.title,
        pid: process.pid,
        argv: process.argv,
        node_env: process.env.NODE_ENV,
        platform: process.platform,
        timestamp: Date.now(),
        uptime: process.uptime(),
        versions: process.versions,
    };
}

export default (route) => {
    const path = route || DEFAULT_PATH;
    return async (ctx, next) => {
        if (path === ctx.path) {
            ctx.body = await info();
        } else {
            await next();
        }
    };
};
