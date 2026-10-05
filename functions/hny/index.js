import { trackedRedirect } from '../../lib/track.js';

// joinpizza.fun/hny -> Hack & Yap Episode 2 registration on Luma.
export const onRequest = (ctx) => trackedRedirect(ctx, 'hny', 'https://luma.com/ekf47d40');
