import { trackedRedirect } from '../lib/track.js';

// joinpizza.fun/discord -> Discord invite. The short link we give out for "hear about the next Hack & Yap first".
export const onRequest = (ctx) => trackedRedirect(ctx, 'discord', 'https://discord.gg/TrycsErM4R');
