import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';
import { getAddress } from 'viem';
import { COMPANY_NAME, SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants';
import { Opcode, Precompile, Predeploy, SignatureType } from '@/types';
import { findChain } from '..';

export const config = {
  runtime: 'edge',
};

type Comparator<T> = (a: T, b: T) => boolean;
type ObjectKeyExtractor<T> = (item: T) => string | number;

function countDifferences<T>(
  base: T[],
  target: T[],
  getKey: ObjectKeyExtractor<T>,
  isEqual: Comparator<T>
): number {
  const sortedKeys = [...base.map(getKey), ...target.map(getKey)].sort((a, b) => {
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    } else if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    } else {
      throw new Error('Invalid key types for sorting.');
    }
  });
  const keys = [...new Set(sortedKeys)];

  return keys.reduce((count: number, key: string | number) => {
    const baseItem = base.find((item) => getKey(item) === key);
    const targetItem = target.find((item) => getKey(item) === key);
    if (!baseItem || !targetItem) {
      count++;
      return count;
    }

    if (!isEqual(baseItem, targetItem)) {
      count++;
    }
    return count;
  }, 0);
}

const countPrecompilesDiff = (base: Precompile[], target: Precompile[]): number => {
  const getKey = (p: Precompile) => getAddress(p.address);
  const isEqual = (a: Precompile, b: Precompile) => JSON.stringify(a) === JSON.stringify(b);
  return countDifferences(base, target, getKey, isEqual);
};

const countPredeployDiffs = (base: Predeploy[], target: Predeploy[]): number => {
  const getKey = (p: Predeploy) => getAddress(p.address);
  const isEqual = (a: Predeploy, b: Predeploy) => JSON.stringify(a) === JSON.stringify(b);
  return countDifferences(base, target, getKey, isEqual);
};

const countOpcodeDiffs = (base: Opcode[], target: Opcode[]): number => {
  const getKey = (o: Opcode) => o.number;
  const isEqual = (a: Opcode, b: Opcode) =>
    JSON.stringify(convertToComparableOpcode(a)) === JSON.stringify(convertToComparableOpcode(b));
  return countDifferences(base, target, getKey, isEqual);
};

const countSignatureTypeDiffs = (base: SignatureType[], target: SignatureType[]): number => {
  const getKey = (s: SignatureType) => s.prefixByte;
  const isEqual = (a: SignatureType, b: SignatureType) => JSON.stringify(a) === JSON.stringify(b);
  return countDifferences(base, target, getKey, isEqual);
};

const defaultImageResponse = new ImageResponse(
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 34,
        }}
      >
        <p>{SITE_DESCRIPTION}</p>
        <p>Made by {COMPANY_NAME}</p>
      </p>
    </div>
  ),
  {
    width: 1200,
    height: 630,
  }
);

export default function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // ?base=<base>
    const hasBase = searchParams.has('base');
    const base = hasBase ? searchParams.get('base')?.slice(0, 100) : '';

    // ?target=<target>
    const hasTarget = searchParams.has('target');
    const target = hasTarget ? searchParams.get('target')?.slice(0, 100) : '';

    if (base === undefined || base === '' || target === undefined || target === '') {
      return defaultImageResponse;
    }

    const baseChain = findChain(base as string);
    if (baseChain === undefined) {
      return defaultImageResponse;
    }

    const targetChain = findChain(target as string);
    if (targetChain === undefined) {
      return defaultImageResponse;
    }

    const precompileDiffs = countPrecompilesDiff(baseChain.precompiles, targetChain.precompiles);
    const predeployDiffs = countPredeployDiffs(baseChain.predeploys, targetChain.predeploys);
    const opcodeDiffs = countOpcodeDiffs(
      baseChain.opcodes as Opcode[],
      targetChain.opcodes as Opcode[]
    );
    const signatureTypeDiffs = countSignatureTypeDiffs(
      baseChain.signatureTypes,
      targetChain.signatureTypes
    );
    const totalDiffs = precompileDiffs + predeployDiffs + opcodeDiffs + signatureTypeDiffs;

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
            {`${totalDiffs} total differences between ${baseChain.metadata.name} and ${targetChain.metadata.name}`}
          </p>
          <p></p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              //justifyContent: 'center',
              fontSize: 24,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p>{precompileDiffs > 0 && `/Precompiles (x${precompileDiffs})`}</p>
              <p>{predeployDiffs > 0 && `/Predeploys (x${predeployDiffs})`}</p>
              <p>{opcodeDiffs > 0 && `/Opcodes (x${opcodeDiffs})`}</p>
              <p>{signatureTypeDiffs > 0 && `/SignatureTypes (x${signatureTypeDiffs})`}</p>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

// Convert an `Opcode` object to a simpler struct in order to compare it to other opcodes.
// Note: casting an object from a type with properties X, Y and Z to a subset type with properties
// X and Y using the `as` keyword will still retain the field Z unless you explicitly remove it.
// That's why this function exists.
const convertToComparableOpcode = (
  opcode: Opcode
): Omit<Opcode, 'examples' | 'playgroundLink' | 'notes' | 'references'> => {
  return {
    number: opcode.number,
    name: opcode.name,
    description: opcode.description,
    minGas: opcode.minGas,
    gasComputation: opcode.gasComputation,
    inputs: opcode.inputs,
    outputs: opcode.outputs,
    errorCases: opcode.errorCases,
    supportedHardforks: opcode.supportedHardforks,
  };
};
