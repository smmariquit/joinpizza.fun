// joinpizza.fun/wall-photos/<uuid>.<ext> -> yap wall photo from R2 (WALL_PHOTOS, key wall/<uuid>.<ext>).
// One path segment, so only keys under wall/ can be read. Keys never change, so cache for a year.
export async function onRequestGet({ params, env }) {
  const obj = await env.WALL_PHOTOS.get(`wall/${params.name}`);
  if (!obj) return new Response('Not found', { status: 404 });
  return new Response(obj.body, {
    headers: {
      'content-type': obj.httpMetadata?.contentType || 'application/octet-stream',
      'cache-control': 'public, max-age=31536000, immutable',
      'x-content-type-options': 'nosniff', // _headers doesn't apply to function responses
    },
  });
}
