import config from 'config';
import Router from 'koa-router';
import searchController from './controllers/searchController';

const router = new Router({
    prefix: config.prefix,
});

router.get('/search', searchController);

export default router.routes();
