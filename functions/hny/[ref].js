import { trackedRedirect } from '../../lib/track.js';

// joinpizza.fun/hny/<name> -> Luma, tagged so registrations show who referred them.
export const onRequest = (ctx) => {
  const ref = ctx.params.ref;
  return trackedRedirect(ctx, 'hny', `https://luma.com/ekf47d40?utm_source=${encodeURIComponent(ref)}`, ref);
};
