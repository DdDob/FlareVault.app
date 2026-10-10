// Vercel Routing Middleware for Flare Vault.
// 1. If a client asks for Markdown (Accept: text/markdown), the Markdown version of a page is returned.
// 2. Unknown pages return a real HTTP 404: as Markdown when Markdown is requested, as JSON when JSON is
//    requested (or for anything under /api/, since Flare Vault has no API), otherwise Vercel serves 404.html.
// Everything else passes straight through. If anything goes wrong, the normal site is served.

const PAGES = {
  '/': '/index.md',
  '/about': '/about.md',
  '/docs': '/docs.md',
  '/whitepaper': '/whitepaper.md',
  '/privacy': '/privacy.md',
  '/terms': '/terms.md',
  '/contact': '/contact.md'
};
const SITE = 'https://www.flarevaultapp.xyz';

// Reads the q-values the client gave for Markdown, HTML and JSON (-1 when not mentioned).
function qvalues(accept) {
  const q = { md: -1, html: -1, json: -1 };
  for (const part of String(accept || '').split(',')) {
    const [type, ...params] = part.trim().toLowerCase().split(';');
    let v = 1;
    for (const p of params) { const m = /^\s*q\s*=\s*([\d.]+)/.exec(p); if (m) v = parseFloat(m[1]); }
    if (type === 'text/markdown') q.md = Math.max(q.md, v);
    else if (type === 'text/html' || type === 'application/xhtml+xml') q.html = Math.max(q.html, v);
    else if (type === 'application/json') q.json = Math.max(q.json, v);
  }
  return q;
}
function wantsMarkdown(accept) { const q = qvalues(accept); return q.md > 0 && q.md >= Math.max(q.html < 0 ? 1 : q.html, q.json); }
function wantsJson(accept) { const q = qvalues(accept); return q.json > 0 && q.json >= Math.max(q.html < 0 ? 1 : q.html, q.md); }

function pass() {
  return new Response(null, { headers: { 'x-middleware-next': '1' } });
}

async function markdown(request, file, status, canonicalPath) {
  const res = await fetch(new URL(file, request.url));
  if (!res.ok) return null;
  const headers = {
    'content-type': 'text/markdown; charset=utf-8',
    'vary': 'Accept',
    'cache-control': 'public, max-age=0, must-revalidate',
    'x-content-type-options': 'nosniff'
  };
  if (canonicalPath) headers['link'] = '<' + SITE + canonicalPath + '>; rel="canonical"';
  return new Response(await res.text(), { status, headers });
}

function notFoundJson(path) {
  const body = {
    error: {
      code: 'not_found',
      status: 404,
      message: 'No page exists at ' + path + '.',
      hint: 'Flare Vault has no account or transaction API. Public pages are listed in /llms.txt and described in /openapi.json. Send Accept: text/markdown to get Markdown versions of pages.',
      docs: SITE + '/docs',
      pages: Object.keys(PAGES).map((p) => SITE + p)
    }
  };
  return new Response(JSON.stringify(body, null, 2), {
    status: 404,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'vary': 'Accept',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff'
    }
  });
}

export default async function middleware(request) {
  try {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';
    const accept = request.headers.get('accept');
    // There is no API: anything under /api returns a structured JSON 404, whatever the method.
    if (path === '/api' || path.startsWith('/api/')) return notFoundJson(path);
    if (request.method !== 'GET' && request.method !== 'HEAD') return pass();
    if (path in PAGES) {
      if (wantsMarkdown(accept)) { const r = await markdown(request, PAGES[path], 200, path); if (r) return r; }
      return pass();
    }
    // Not a known page: a real 404. (Files with an extension never reach this middleware.)
    if (wantsMarkdown(accept)) { const r = await markdown(request, '/404.md', 404, null); if (r) return r; }
    if (wantsJson(accept)) return notFoundJson(path);
  } catch (e) { /* fall through to the normal site */ }
  return pass();
}

// Only extension-less paths (pages), never assets such as /logo.png or /about.md.
export const config = { matcher: '/((?!.*\\.).*)' };
