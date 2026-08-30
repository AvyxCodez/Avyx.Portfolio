// Link-preview image, generated per request.
//
// Renders the card Discord/X/Slack show when avyx.lol is pasted anywhere, using
// live presence rather than a fixed screenshot: current Discord status, what's
// playing on Spotify, and the view count.
//
// Crawlers cache these hard (Discord for roughly a day), so any given embed
// shows a snapshot from whenever that crawler last looked — not the state at
// the moment a human reads it. The Cache-Control below is a hint to them, not a
// guarantee.
//
// The card itself lives in lib/og-card.js so it can be rendered and checked
// without the Edge runtime; this file is just the wrapper.
import { ImageResponse } from '@vercel/og';
import { buildCard, fetchCardData, loadFonts, OG_WIDTH, OG_HEIGHT } from '../lib/og-card.js';

export const config = { runtime: 'edge' };

export default async function handler(request) {
  const origin = new URL(request.url).origin;
  const [fonts, data] = await Promise.all([loadFonts(), fetchCardData(origin)]);

  return new ImageResponse(buildCard(data), {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts,
    headers: {
      // Long enough that crawlers aren't hammered, short enough that the card
      // still turns over through the day.
      'Cache-Control': 'public, no-transform, s-maxage=900, max-age=900',
    },
  });
}
