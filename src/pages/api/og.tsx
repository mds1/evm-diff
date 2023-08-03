import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';
import { SITE_NAME } from '@/lib/constants';
import { findChain } from '../utils';

export const config = {
  runtime: 'edge',
};

const defaultBase = 1; // ethereum
const defaultTarget = 10; // optimism

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

    const baseChain = findChain(base as string);
    if (!baseChain) {
      return new Response(`Chain ID ${base} doesn't exist`, {
        status: 400,
      });
    }

    const targetChain = findChain(target as string);
    if (!targetChain) {
      return new Response(`Chain ID ${target} doesn't exist`, {
        status: 400,
      });
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
            {`✨ ${SITE_NAME} ✨`}
          </h2>
          <p
            style={{
              fontSize: 34,
            }}
          >
            20 total differences between 💠 {baseChain.metadata.name} and 🔴{' '}
            {targetChain.metadata.name}
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
