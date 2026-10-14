import { trackedRedirect } from '../../lib/track.js';

// joinpizza.fun/ztp -> Zero-Ten Park, tagged so their analytics credit Pizza & Friends.
export const onRequest = (ctx) =>
  trackedRedirect(ctx, 'ztp', 'https://thecompany.ph/?utm_source=pizzaandfriends&utm_medium=referral&utm_campaign=hackandyap2');
