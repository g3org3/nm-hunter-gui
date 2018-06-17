const url = ctx => endpoint =>
  ctx.req
    ? `${ctx.req.protocol}://${ctx.req.headers.host}${endpoint}?token=${
        (ctx.req.cookies || {})._id
      }`
    : endpoint;

exports._fetch = ctx => (endpoint, opts) =>
  fetch(url(ctx)(endpoint), { ...opts, credentials: 'same-origin' });

exports.prettyPathName = (rpath, { path = false } = {}) => {
  const p = rpath.split('/');
  p.pop();
  const appName = p.pop();
  return path ? p.join('/') : appName;
};
