#!/usr/bin/env node
// Rejects UTF-8 BOMs and mojibake before they reach a commit.
//
// Mojibake here means UTF-8 text that was decoded as Windows-1252 and re-saved
// as UTF-8, which is how "•" once turned into "a-euro-cent" in this repo. The
// signature is always the same: a UTF-8 lead byte rendered as a Latin-1
// character, immediately followed by a continuation byte rendered as one too.
//
// Patterns are built from code points rather than written as literals on
// purpose — otherwise this file would trip its own check.
//
//   node scripts/check-encoding.mjs         # staged content (pre-commit)
//   node scripts/check-encoding.mjs --all   # every tracked text file
import { execFileSync } from 'node:child_process';

const TEXT = /\.(js|jsx|ts|tsx|mjs|cjs|css|scss|html|json|md|txt|yml|yaml|svg)$/i;

// Bytes C2-F4 (UTF-8 leads) as seen through CP1252.
const LEAD = '\\u00C2-\\u00F4';
// Bytes 80-BF (UTF-8 continuations) as seen through CP1252: A0-BF map straight
// through, while 80-9F land on CP1252's punctuation block.
const CONT = [
  '\\u00A0-\\u00BF',
  ...[0x20ac, 0x201a, 0x0192, 0x201e, 0x2026, 0x2020, 0x2021, 0x02c6, 0x2030,
      0x0160, 0x2039, 0x0152, 0x017d, 0x2018, 0x2019, 0x201c, 0x201d, 0x2022,
      0x2013, 0x2014, 0x02dc, 0x2122, 0x0161, 0x203a, 0x0153, 0x017e, 0x0178]
    .map((cp) => '\\u' + cp.toString(16).padStart(4, '0')),
].join('');
const MOJIBAKE = new RegExp(`[${LEAD}][${CONT}]`);

const git = (args) => execFileSync('git', args, { encoding: 'buffer' });

const all = process.argv.includes('--all');
const files = git(['diff', '--cached', '--name-only', '--diff-filter=ACM'])
  .toString('utf8')
  .split('\n');
const list = (all
  ? git(['ls-files']).toString('utf8').split('\n')
  : files
).map((f) => f.trim()).filter((f) => f && TEXT.test(f));

const problems = [];

for (const file of list) {
  let buf;
  try {
    buf = all ? git(['show', `HEAD:${file}`]) : git(['show', `:${file}`]);
  } catch {
    continue; // not resolvable (deleted, unmerged) — nothing to check
  }
  if (buf.includes(0)) continue; // binary

  if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
    problems.push({ file, line: 1, what: 'UTF-8 BOM at start of file' });
  }

  buf.toString('utf8').split('\n').forEach((text, i) => {
    const m = MOJIBAKE.exec(text);
    if (m) {
      const codes = [...m[0]].map((c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'));
      problems.push({ file, line: i + 1, what: `mojibake (${codes.join(' ')})`, text: text.trim().slice(0, 80) });
    }
  });
}

if (!problems.length) process.exit(0);

console.error('\nEncoding check failed — these look like Windows-1252 damage:\n');
for (const p of problems) {
  console.error(`  ${p.file}:${p.line}  ${p.what}`);
  if (p.text) console.error(`    ${p.text}`);
}
console.error(`
${problems.length} problem(s). Re-save the file(s) as UTF-8 without a BOM.
To commit anyway: git commit --no-verify
`);
process.exit(1);
