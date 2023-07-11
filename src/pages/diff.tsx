import { useState } from 'react';
import { useRouter } from 'next/router';
import { chains } from '@/chains';
import { ChainDiffSelector } from '@/components/ChainDiffSelector';
import { DiffMetadata } from '@/components/diff/DiffMetadata';
import { DiffOpcodes } from '@/components/diff/DiffOpcodes';
import { DiffPrecompiles } from '@/components/diff/DiffPrecompiles';
import { DiffSignatureTypes } from '@/components/diff/DiffSignatureTypes';
import { Toggle } from '@/components/ui/Toggle';
import { Chain } from '@/types';

interface Props<T> {
  base: T;
  target: T;
  onlyShowDiff: boolean;
}

const SECTION_MAP: Record<
  string,
  { title: string; component: React.ComponentType<Props<any>>; hide?: boolean }
> = {
  metadata: { title: 'Metadata', component: DiffMetadata },
  precompiles: { title: 'Precompiles and Predeploys', component: DiffPrecompiles },
  signatureTypes: { title: 'Transaction and Signature Types', component: DiffSignatureTypes },
  opcodes: { title: 'Opcodes', component: DiffOpcodes },
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
      {SECTION_MAP[section].title || section}
    </h2>
  );

  const SectionComponent = ({
    section,
    base,
    target,
    onlyShowDiff,
  }: {
    section: string;
    base: Chain[keyof Chain];
    target: Chain[keyof Chain];
    onlyShowDiff: boolean;
  }) => {
    const Component = SECTION_MAP[section].component;
    return <Component {...{ base, target, onlyShowDiff }} />;
  };

  // We take `baseChain` and `targetChain` as arguments to ensure that they are not `undefined`
  // and remove the need for `?` and `!` operators.
  const DiffDiv = ({ baseChain, targetChain }: { baseChain: Chain; targetChain: Chain }) => {
    const sections = Object.keys(baseChain);
    return (
      <main>
        <Toggle enabled={onlyShowDiff} setEnabled={setOnlyShowDiff} label='Only show differences' />
        {sections.map((section) => {
          const hideComponent = SECTION_MAP[section].hide;
          if (hideComponent) return <></>;

          const base = baseChain[section as keyof Chain];
          const target = targetChain[section as keyof Chain];
          return (
            <div key={section}>
              <SectionHeader section={section} />
              <SectionComponent {...{ section, base, target, onlyShowDiff }} />
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
