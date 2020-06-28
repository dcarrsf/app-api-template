function assert(cond, message) {
    if (!cond) {
        throw new Error(message);
    }
}

export function koaContext(ctx) {
    return Object.assign(
        {
            assert,
            headers: {},
            request: {},
            params: {},
        },
        ctx
    );
}
