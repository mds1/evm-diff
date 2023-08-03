import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';
import { getAddress } from 'viem';
import { SITE_NAME } from '@/lib/constants';
import { Precompile, Predeploy } from '@/types';
import { findChain } from '../utils';

const defaultBase = 1; // ethereum
const defaultTarget = 10; // optimism

export const config = {
  runtime: 'edge',
};

const countPrecompilesDiff = (base: Precompile[], target: Precompile[]): number => {
  // Generate a sorted list of the base and target elements.
  const sortedAddrs = [
    ...base.map((p) => getAddress(p.address)),
    ...target.map((p) => getAddress(p.address)),
  ].sort((a, b) => a.localeCompare(b));
  const precompileAddrs = [...new Set(sortedAddrs)];

  // Return the number of differences.
  return precompileAddrs.reduce((count, addr) => {
    const basePrecompile = base.find((p) => getAddress(p.address) === addr);
    const targetPrecompile = target.find((p) => getAddress(p.address) === addr);
    if (!basePrecompile || !targetPrecompile) {
      return 0;
    }

    const isEqual = JSON.stringify(basePrecompile) === JSON.stringify(targetPrecompile);
    if (!isEqual) {
      count++;
    }
    return count;
  }, 0);
};

const countPredeployDiffs = (base: Predeploy[], target: Predeploy[]): number => {
  // Generate a sorted list of the base and target elements.
  const sortedAddrs = [
    ...base.map((p) => getAddress(p.address)),
    ...target.map((p) => getAddress(p.address)),
  ].sort((a, b) => a.localeCompare(b));
  const predeployAddrs = [...new Set(sortedAddrs)];

  // Return the number of differences.
  return predeployAddrs.reduce((count, addr) => {
    const basePredeploy = base.find((p) => getAddress(p.address) === addr);
    const targetPredeploy = target.find((p) => getAddress(p.address) === addr);
    if (!basePredeploy || !targetPredeploy) {
      return 0;
    }

    const isEqual = JSON.stringify(basePredeploy) === JSON.stringify(targetPredeploy);
    if (!isEqual) {
      count++;
    }
    return count;
  }, 0);
};

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

    const precompileDiffs = countPrecompilesDiff(baseChain.precompiles, targetChain.precompiles);
    const predeployDiffs = countPredeployDiffs(baseChain.predeploys, targetChain.predeploys);
    //const predeployDiffs = 3;
    const opcodeDiffs = 22;
    const signatureTypeDiff = 5;
    const totalDiff = precompileDiffs + predeployDiffs + opcodeDiffs + signatureTypeDiff;

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
          <p></p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
            }}
          >
            <p>{`⚠️ ${totalDiff} total differences ⚠️`}</p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p>{precompileDiffs > 0 && `/Precompiles (x${precompileDiffs})`}</p>
              <p>{predeployDiffs > 0 && `/Predeploys (x${predeployDiffs})`}</p>
              <p>{signatureTypeDiff > 0 && `/SignatureTypes (x${signatureTypeDiff})`}</p>
              <p>{opcodeDiffs > 0 && `/Opcodes (x${opcodeDiffs})`}</p>
            </div>
          </div>
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
