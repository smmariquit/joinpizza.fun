// joinpizza.fun/hny/<name> -> Luma, tagged so registrations show who referred them.
// ponytail: a function because _redirects can't put :splat in a query string.
export const onRequest = ({ params }) =>
  Response.redirect(`https://luma.com/ekf47d40?utm_source=${encodeURIComponent(params.ref)}`, 302);
