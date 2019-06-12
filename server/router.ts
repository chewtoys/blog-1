import * as next from 'next';
import * as Koa from 'koa';
import * as Router from 'koa-router';

import PostController from './controllers/post';

export default (app: next.Server, server: Koa) => {
  const router = new Router();
  const handle = app.getRequestHandler();

  const apiRouter = new Router();
  apiRouter.get('/posts', PostController.getPosts);

  router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());
  router.get('*', async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(router.routes()).use(router.allowedMethods());
};
