// Redirect and log the click to D1 so we can show partners where traffic came from.
// No IPs or user agents are stored: just time, link, referral tag, referring site, country.
export function trackedRedirect(ctx, link, target, ref = null) {
  const { request, env } = ctx;
  const url = new URL(request.url);
  ref ??= url.searchParams.get('s'); // e.g. joinpizza.fun/ztp?s=qr

  // Only count production traffic so PR previews don't inflate the numbers.
  if (url.hostname === 'joinpizza.fun' && env.CLICKS) {
    let referer = null;
    try { referer = new URL(request.headers.get('referer')).hostname; } catch {}
    ctx.waitUntil(
      env.CLICKS.prepare('INSERT INTO clicks (link, ref, referer, country) VALUES (?, ?, ?, ?)')
        .bind(link, ref, referer, request.cf?.country ?? null)
        .run()
        .catch(() => {}) // never block the redirect on logging
    );
  }
  return Response.redirect(target, 302);
}
