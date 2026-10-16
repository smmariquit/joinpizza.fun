import { trackedRedirect } from '../lib/track.js';

// joinpizza.fun/card -> Discord invite. Printed on the business card QR so scans show up in the click log.
export const onRequest = (ctx) => trackedRedirect(ctx, 'card', 'https://discord.gg/TrycsErM4R');
