// Renders the intro film's score (scripts/intro-score.js) in a headless browser and puts it under public/Intro.mp4,
// replacing whatever sound the film had. The picture is kept as it is, unless it is heavier than a phone should
// stream, in which case it is re-encoded once. Needs ffmpeg (on PATH, or in the FFMPEG environment variable).
//   npm run score-intro
import { execFileSync } from 'node:child_process';
import { readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const film = join(here, 'public/Intro.mp4'), wav = join(tmpdir(), 'starfall-intro-score.wav'), out = join(tmpdir(), 'starfall-intro.mp4');
const ffmpeg = process.env.FFMPEG || 'ffmpeg', ffprobe = process.env.FFPROBE || ffmpeg.replace(/ffmpeg(\.exe)?$/i, 'ffprobe$1');
/** Above this the picture is re-encoded, so the film starts quickly on a phone. */
const MAX_VIDEO_KBPS = 3500;

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  page.on('pageerror', e => console.error(e));
  await page.addScriptTag({ content: readFileSync(join(here, 'scripts/intro-score.js'), 'utf8') });
  const b64 = await page.evaluate(() => window.renderIntroScore());
  writeFileSync(wav, Buffer.from(b64, 'base64'));
} finally { await browser.close(); }

const kbps = Number(execFileSync(ffprobe, ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=bit_rate', '-of', 'csv=p=0', film], { encoding: 'utf8' }).trim()) / 1000;
const video = kbps > MAX_VIDEO_KBPS ? ['-c:v', 'libx264', '-preset', 'slow', '-crf', '22', '-pix_fmt', 'yuv420p', '-profile:v', 'high'] : ['-c:v', 'copy'];
execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', film, '-i', wav, '-map', '0:v:0', '-map', '1:a:0', ...video,
  '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-shortest', '-movflags', '+faststart', out], { stdio: 'inherit' });
renameSync(out, film); rmSync(wav, { force: true });
console.log(`Scored public/Intro.mp4${kbps > MAX_VIDEO_KBPS ? ` (picture re-encoded from ${Math.round(kbps)} kbps)` : ''}.`);
