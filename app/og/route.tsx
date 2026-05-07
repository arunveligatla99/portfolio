import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('title') || 'Arun Veligatla').slice(0, 120);
  const eyebrow = (searchParams.get('eyebrow') || 'Senior Software Engineer').slice(0, 80);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0b',
          color: '#ecedee',
          padding: '64px',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 22,
              color: '#7dd3fc',
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 78,
              fontWeight: 600,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              color: '#ecedee',
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
          <span
            style={{
              marginTop: 28,
              fontSize: 24,
              color: '#a1a1aa',
              fontFamily: 'monospace',
            }}
          >
            arunveligatla.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
