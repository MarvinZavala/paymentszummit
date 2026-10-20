import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/site';

export const alt = `${SITE_NAME} - ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logo = await readFile(join(process.cwd(), 'public/zummit.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0E2152',
          color: 'white',
          padding: 64,
        }}
      >
        <img src={logoSrc} width={160} height={160} alt="" />
        <div
          style={{
            marginTop: 32,
            fontSize: 84,
            fontWeight: 800,
            color: '#fbbf24',
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ marginTop: 16, fontSize: 40, color: '#e5e7eb' }}>{SITE_TAGLINE}</div>
        <div style={{ marginTop: 40, fontSize: 30, color: '#cbd5e1' }}>
          From zero to low processing fees
        </div>
      </div>
    ),
    { ...size }
  );
}
