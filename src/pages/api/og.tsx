import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';
import { getAddress } from 'viem';
import { SITE_NAME } from '@/lib/constants';
import { Opcode, Precompile, Predeploy, SignatureType } from '@/types';
import { findChain } from '..';

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
  return precompileAddrs.reduce((count: number, addr: string) => {
    const basePrecompile = base.find((p) => getAddress(p.address) === addr);
    const targetPrecompile = target.find((p) => getAddress(p.address) === addr);
    if (!basePrecompile || !targetPrecompile) {
      count++;
      return count;
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
  return predeployAddrs.reduce((count: number, addr: string) => {
    const basePredeploy = base.find((p) => getAddress(p.address) === addr);
    const targetPredeploy = target.find((p) => getAddress(p.address) === addr);
    if (!basePredeploy || !targetPredeploy) {
      count++;
      return count;
    }

    const isEqual = JSON.stringify(basePredeploy) === JSON.stringify(targetPredeploy);
    if (!isEqual) {
      count++;
    }
    return count;
  }, 0);
};

const countOpcodeDiffs = (base: Opcode[], target: Opcode[]): number => {
  // Generate a sorted list of the base and target elements.
  const sortedNumbers = [...base.map((o) => o.number), ...target.map((o) => o.number)].sort(
    (a, b) => a - b
  );
  const opcodeNumbers = [...new Set(sortedNumbers)];

  // Return the number of differences.
  return opcodeNumbers.reduce((count: number, id: number) => {
    const baseOpcode = base.find((o) => o.number === id);
    const targetOpcode = target.find((o) => o.number === id);
    if (!baseOpcode || !targetOpcode) {
      count++;
      return count;
    }

    const isEqual =
      JSON.stringify(convertToComparableOpcode(baseOpcode as Opcode)) ===
      JSON.stringify(convertToComparableOpcode(targetOpcode as Opcode));
    if (!isEqual) {
      count++;
    }
    return count;
  }, 0);
};

const countSignatureTypeDiffs = (base: SignatureType[], target: SignatureType[]): number => {
  // Generate a sorted list of the base and target elements.
  const allPrefixBytes = [...base.map((t) => t.prefixByte), ...target.map((t) => t.prefixByte)];
  const prefixBytes = [...new Set(allPrefixBytes.sort((a, b) => a - b))];

  // Return the number of differences.
  return prefixBytes.reduce((count: number, prefix: number) => {
    const baseSigType = base.find((s) => s.prefixByte === prefix);
    const targetSigType = target.find((s) => s.prefixByte === prefix);
    if (!baseSigType || !targetSigType) {
      count++;
      return count;
    }

    const isEqual = JSON.stringify(baseSigType) === JSON.stringify(targetSigType);
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
