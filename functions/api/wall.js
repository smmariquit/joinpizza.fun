// Yap wall API for joinpizza.fun/wall.
// GET  -> { open, opensAt, messages: [{ id, name, msg, thing }] }
// POST { code, name, msg, thing } -> adds a message once the wall is open and the code matches.
// The code is the WALL_CODE secret, shown on the closing slide at Hack & Yap. Messages live in D1 (CLICKS binding, table `wall`).

const OPENS_AT = '2026-10-17T17:00:00+08:00'; // the word goes up at awards; WALL_OPENS_AT overrides (local testing, opening early)
const opensAt = env => new Date(env.WALL_OPENS_AT || OPENS_AT);
const THINGS = ['pizza', 'brain', 'moai', 'skull', 'phone', '67'];
const json = (body, status = 200) => Response.json(body, { status, headers: { 'cache-control': 'no-store' } });

export async function onRequestGet({ env }) {
  const { results } = await env.CLICKS
    .prepare('SELECT id, name, msg, thing FROM wall WHERE hidden = 0 ORDER BY id DESC LIMIT 500')
    .all();
  return json({ open: Date.now() >= opensAt(env).getTime(), opensAt: opensAt(env).toISOString(), messages: results });
}

export async function onRequestPost({ request, env }) {
  if (Date.now() < opensAt(env).getTime()) return json({ error: 'The wall opens at the end of Hack & Yap.' }, 403);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Bad request.' }, 400); }
  const clean = (s, max) => String(s ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
  const code = clean(body.code, 40).toLowerCase();
  const name = clean(body.name, 30) || null;
  const msg = clean(body.msg, 140);
  const thing = THINGS.includes(body.thing) ? body.thing : 'pizza';

  if (!env.WALL_CODE || code !== env.WALL_CODE.toLowerCase()) return json({ error: "That's not the word from the event." }, 403);
  if (!msg) return json({ error: 'Write something first.' }, 400);

  // ponytail: no per-person limit (we don't store IPs). If someone spams, hide rows in D1 and rotate WALL_CODE.
  const row = await env.CLICKS
    .prepare('INSERT INTO wall (name, msg, thing) VALUES (?, ?, ?) RETURNING id, name, msg, thing')
    .bind(name, msg, thing)
    .first();
  return json(row, 201);
}
