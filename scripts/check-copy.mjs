// Checks the visible text of every prerendered page against the copy document's rules:
// no em dashes, semicolons or exclamation points, "luxury" only in URLs and meta,
// no founding year or "since" line, no dollar figures.
// Run after a public build: NEXT_PUBLIC_SITE_MODE=public npm run build && npm run check-copy
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), '.next', 'server', 'app');

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith('.html') && !name.startsWith('_') ? [path] : [];
  });
}

function visibleText(html) {
  return html
    .replace(/<head[\s\S]*?<\/head>/gi, ' ')
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
}

const rules = [
  { name: 'em dash', re: /—/g },
  { name: 'semicolon', re: /;/g },
  { name: 'exclamation point', re: /!/g },
  { name: '"luxury" in body copy', re: /luxury(?! home remodeling)/gi },
  { name: 'founding year / since line', re: /\bsince \d{4}\b|\bfounded in\b|\bestablished in\b/gi },
  { name: 'dollar figure', re: /\$\s?\d/g },
];

let problems = 0;
for (const file of htmlFiles(root)) {
  const text = visibleText(readFileSync(file, 'utf8'));
  for (const rule of rules) {
    for (const match of text.matchAll(rule.re)) {
      const at = match.index ?? 0;
      console.log(`${file.slice(root.length)}  ${rule.name}:  …${text.slice(Math.max(0, at - 50), at + 50)}…`);
      problems++;
    }
  }
}

if (problems) {
  console.error(`\n${problems} copy rule violation(s).`);
  process.exit(1);
}
console.log('Copy rules pass on every page.');
