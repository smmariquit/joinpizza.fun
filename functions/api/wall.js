// Yap wall API for joinpizza.fun/wall.
// GET  -> { open, opensAt, messages: [{ id, name, msg, thing, photo }] }, photo is a URL or null
// POST multipart { code, name, msg, thing, photo? } -> adds a message once the wall is open and the code matches.
// The code is the WALL_CODE secret, shown on the slides all through Hack & Yap. Messages live in D1 (CLICKS binding, table `wall`),
// photos in R2 (WALL_PHOTOS, served by functions/wall-photos/[name].js).

const OPENS_AT = '2026-10-17T13:30:00+08:00'; // doors open, the wall stays open from here on; WALL_OPENS_AT overrides (local testing)
const opensAt = env => new Date(env.WALL_OPENS_AT || OPENS_AT);
const THINGS = ['pizza', 'brain', 'moai', 'skull', 'phone', '67'];
const PHOTO_TYPES = new Map([['image/jpeg', 'jpg'], ['image/png', 'png'], ['image/webp', 'webp']]);
const MAX_PHOTO = 5 * 1024 * 1024;
const json = (body, status = 200) => Response.json(body, { status, headers: { 'cache-control': 'no-store' } });
const withUrl = m => ({ ...m, photo: m.photo ? `/wall-photos/${m.photo.slice('wall/'.length)}` : null });

export async function onRequestGet({ env }) {
  const { results } = await env.CLICKS
    .prepare('SELECT id, name, msg, thing, photo FROM wall WHERE hidden = 0 ORDER BY id DESC LIMIT 500')
    .all();
  return json({ open: Date.now() >= opensAt(env).getTime(), opensAt: opensAt(env).toISOString(), messages: results.map(withUrl) });
}

export async function onRequestPost({ request, env }) {
  if (Date.now() < opensAt(env).getTime()) return json({ error: 'The wall opens when Hack & Yap starts.' }, 403);

  let body;
  try { body = Object.fromEntries(await request.formData()); } catch { return json({ error: 'Bad request.' }, 400); }
  const clean = (s, max) => String(s ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
  const code = clean(body.code, 40).toLowerCase();
  const name = clean(body.name, 30) || null;
  const msg = clean(body.msg, 140);
  const thing = THINGS.includes(body.thing) ? body.thing : 'pizza';
  const file = body.photo instanceof File && body.photo.size ? body.photo : null;

  if (!env.WALL_CODE || code !== env.WALL_CODE.toLowerCase()) return json({ error: "That's not the word from the event." }, 403);
  if (file && !PHOTO_TYPES.has(file.type)) return json({ error: 'Photos have to be JPEG, PNG or WebP.' }, 400);
  if (file && file.size > MAX_PHOTO) return json({ error: 'That photo is over 5 MB.' }, 400);
  if (!msg && !file) return json({ error: 'Write something or add a photo.' }, 400);

  let photo = null;
  if (file) {
    photo = `wall/${crypto.randomUUID()}.${PHOTO_TYPES.get(file.type)}`;
    await env.WALL_PHOTOS.put(photo, file, { httpMetadata: { contentType: file.type } });
  }

  // ponytail: no per-person limit (we don't store IPs). If someone spams, hide rows in D1 and rotate WALL_CODE.
  const row = await env.CLICKS
    .prepare('INSERT INTO wall (name, msg, thing, photo) VALUES (?, ?, ?, ?) RETURNING id, name, msg, thing, photo')
    .bind(name, msg, thing, photo)
    .first();
  return json(withUrl(row), 201);
}
