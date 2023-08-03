import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';
import { toUppercase } from '@/lib/utils';

export const config = {
  runtime: 'edge',
};

const defaultBase = 'ethereum';
const defaultTarget = 'optimism';

export default function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // ?base=<base>
    const hasBase = searchParams.has('base');
    let base = hasBase ? searchParams.get('base')?.slice(0, 100) : defaultBase;
    if (!base) {
      base = defaultBase;
    }

    // ?target=<target>
    const hasTarget = searchParams.has('target');
    let target = hasTarget ? searchParams.get('target')?.slice(0, 100) : defaultTarget;
    if (!target) {
      target = defaultTarget;
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          <h2
            style={{
              fontSize: 100,
            }}
          >
            ✨ evm-diff ✨
          </h2>
          <p
            style={{
              fontSize: 34,
            }}
          >
            20 total differences between 💠 {toUppercase(base)} and 🔴 {toUppercase(target)}
          </p>
          <p
            style={{
              fontSize: 24,
            }}
          >
            ➡️ Precompiles (x5) / Predeploys (x5) / Signature Types (x10) / Opcodes (x33)
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
