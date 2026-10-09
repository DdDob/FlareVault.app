// Vercel Routing Middleware for Flare Vault.
// 1. If a client asks for Markdown (Accept: text/markdown), the Markdown version of a page is returned.
// 2. Unknown pages return a real HTTP 404, as Markdown when requested (otherwise Vercel serves 404.html).
// Everything else passes straight through. If anything goes wrong, the normal site is served.

const PAGES = {
  '/': '/index.md',
  '/about': '/about.md',
  '/docs': '/docs.md',
  '/whitepaper': '/whitepaper.md',
  '/privacy': '/privacy.md',
  '/contact': '/contact.md'
};
const SITE = 'https://www.flarevaultapp.xyz';

// True when the client prefers Markdown over HTML.
function wantsMarkdown(accept) {
  let md = -1, html = -1;
  for (const part of String(accept || '').split(',')) {
    const [type, ...params] = part.trim().toLowerCase().split(';');
    let q = 1;
    for (const p of params) { const m = /^\s*q\s*=\s*([\d.]+)/.exec(p); if (m) q = parseFloat(m[1]); }
    if (type === 'text/markdown') md = Math.max(md, q);
    else if (type === 'text/html' || type === 'application/xhtml+xml') html = Math.max(html, q);
  }
  return md > 0 && md >= (html < 0 ? 1 : html);
}

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

export default async function middleware(request) {
  try {
    if (request.method !== 'GET' && request.method !== 'HEAD') return pass();
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';
    const wantsMd = wantsMarkdown(request.headers.get('accept'));
    if (path in PAGES) {
      if (wantsMd) { const r = await markdown(request, PAGES[path], 200, path === '/' ? '/' : path); if (r) return r; }
      return pass();
    }
    // Not a known page: a real 404. (Files with an extension never reach this middleware.)
    if (wantsMd) { const r = await markdown(request, '/404.md', 404, null); if (r) return r; }
  } catch (e) { /* fall through to the normal site */ }
  return pass();
}

// Only extension-less paths (pages), never assets such as /logo.png or /about.md.
export const config = { matcher: '/((?!.*\\.).*)' };
