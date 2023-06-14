import { useState } from 'react';
import { useRouter } from 'next/router';
import { Chain, chains } from '@/chains';
import { ChainDiffSelector } from '@/components/ChainDiffSelector';
import { DiffMetadata } from '@/components/diff/DiffMetadata';
import { DiffPrecompiles } from '@/components/diff/DiffPrecompiles';
import { DiffSignatureTypes } from '@/components/diff/DiffSignatureTypes';
import { Toggle } from '@/components/ui/Toggle';

const SECTION_MAP: Record<string, string> = {
  metadata: 'Metadata',
  precompiles: 'Precompiles and Predeploys',
  signatureTypes: 'Transaction and Signature Types',
};

const Diff = () => {
  // -------- Parse query parameters --------

  const router = useRouter();
  const { base, target } = router.query;

  const findChain = (chainId: string) => {
    try {
      const id = BigInt(chainId);
      if (id <= 0n) return undefined;
      return Object.values(chains).find((chain) => BigInt(chain.metadata.id) === id);
    } catch (e) {
      return undefined; // `chainId` could not be parsed as a `BigInt`.
    }
  };

  const baseChain = findChain(base as string);
  const targetChain = findChain(target as string);

  const ErrorDiv = () => (
    <main className='text-center'>
      <h1 className='text-primary text-3xl font-bold tracking-tight sm:text-5xl'>Oops!</h1>
      <p className='text-secondary mt-6 text-base leading-7'>
        Invalid chain(s) provided, please try again below.
      </p>
      <div className='mt-10'>
        <div>
          <ChainDiffSelector />
        </div>
      </div>
    </main>
  );

  // -------- Show diff --------

  const [onlyShowDiff, setOnlyShowDiff] = useState(true);

  const SectionHeader = ({ section }: { section: string }) => (
    <h2 className='border-b border-zinc-500/10 text-center font-bold dark:border-zinc-500/20'>
      {SECTION_MAP[section] || section}
    </h2>
  );
  // We take `baseChain` and `targetChain` as arguments to ensure that they are not `undefined`
  // and remove the need for `?` and `!` operators.
  const DiffDiv = ({ baseChain, targetChain }: { baseChain: Chain; targetChain: Chain }) => {
    const sections = Object.keys(baseChain);
    return (
      <main>
        <Toggle enabled={onlyShowDiff} setEnabled={setOnlyShowDiff} label='Only show differences' />
        {sections.map((section) => {
          const header = <SectionHeader section={section} />;

          let content = <></>;
          if (section === 'metadata') {
            content = (
              <DiffMetadata
                base={baseChain.metadata}
                target={targetChain.metadata}
                onlyShowDiff={onlyShowDiff}
              />
            );
          } else if (section === 'precompiles') {
            content = (
              <DiffPrecompiles
                base={baseChain.precompiles}
                target={targetChain.precompiles}
                onlyShowDiff={onlyShowDiff}
              />
            );
          } else if (section === 'signatureTypes') {
            content = (
              <DiffSignatureTypes
                base={baseChain.signatureTypes}
                target={targetChain.signatureTypes}
                onlyShowDiff={onlyShowDiff}
              />
            );
          }

          return (
            <div key={section}>
              {header}
              {content}
            </div>
          );
        })}
      </main>
    );
  };

  return (
    <div>
      {(!baseChain || !targetChain) && <ErrorDiv />}
      {baseChain && targetChain && <DiffDiv baseChain={baseChain} targetChain={targetChain} />}
    </div>
  );
};

export default Diff;
