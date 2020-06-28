import _ from 'lodash';

export default async function search(ctx) {
    const body = ctx.request.body;
    ctx.assert(body, 400, 'missing body');
    ctx.body = 'Search results...';
    ctx.status = 200;
}
