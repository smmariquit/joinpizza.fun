import { trackedRedirect } from '../../lib/track.js';

// joinpizza.fun/ztp/chat -> Zero-Ten Park community chat on Messenger.
export const onRequest = (ctx) => trackedRedirect(ctx, 'ztp-chat', 'https://m.me/ch/AbYFiqw_VqQ_RxR4/');
