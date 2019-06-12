import * as Koa from 'koa';
import * as next from 'next';

import router from './router';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
  const server = new Koa();

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  router(app, server);

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
