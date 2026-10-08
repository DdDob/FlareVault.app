// Builds the site into ./dist:
//   1. copies your site files (index.html, ethers.umd.min.js, images, ...) into dist/
//   2. bundles the Reown AppKit wallet popup into dist/appkit.bundle.js
// Vercel runs this automatically on every deploy (see vercel.json).
import { build } from 'esbuild';
import { cpSync, rmSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';

const SKIP = new Set([
  'node_modules', '.git', '.github', '.vercel', 'dist',
  'package.json', 'package-lock.json', 'build.mjs', 'appkit-entry.js', '.gitignore'
]);

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
for (const name of readdirSync('.')) {
  if (SKIP.has(name)) continue;
  cpSync(name, 'dist/' + name, { recursive: true });
}

await build({
  entryPoints: ['appkit-entry.js'],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  minify: true,
  outfile: 'dist/appkit.bundle.js',
  define: { global: 'globalThis', 'process.env.NODE_ENV': '"production"' },
  logLevel: 'info'
});

// Sanity check: the page needs both exports.
const out = readFileSync('dist/appkit.bundle.js', 'utf8');
for (const needle of ['createAppKit', 'EthersAdapter']) {
  if (!out.includes(needle)) throw new Error('Bundle is missing ' + needle);
}
console.log('appkit.bundle.js: ' + Math.round(statSync('dist/appkit.bundle.js').size / 1024) + ' KB');
console.log('Site files copied to dist/: ' + readdirSync('dist').join(', '));
