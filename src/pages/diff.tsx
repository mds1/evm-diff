import { useRouter } from 'next/router';
import { Chain, chains } from '@/chains';
import { ChainDiffSelector } from '@/components/ChainDiffSelector';
import { getAddress } from 'viem';

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
    <main className="text-center">
      <h1 className="text-primary text-3xl font-bold tracking-tight sm:text-5xl">Oops!</h1>
      <p className="text-secondary mt-6 text-base leading-7">
        Invalid chain(s) provided, please try again below.
      </p>
      <div className="mt-10">
        <div>
          <ChainDiffSelector />
        </div>
      </div>
    </main>
  );

  // -------- Show diff --------

  const showField = (section: string, field: string) => {
    if (section === 'metadata') {
      return !['network', 'rpcUrls', 'blockExplorers'].includes(field);
    }
    return true;
  };

  const fieldDisplayName = (field: string) => {
    if (field === 'metadata') return 'Metadata';
    if (field === 'id') return 'Chain ID';
    if (field === 'name') return 'Name';
    if (field === 'nativeCurrency') return 'Native Currency';
    if (field === 'contracts') return 'Multicall3';
    return field;
  };

  // We take `baseChain` and `targetChain` as arguments to ensure that they are not `undefined`
  // and remove the need for `?` and `!` operators.
  const DiffDiv = ({ baseChain, targetChain }: { baseChain: Chain; targetChain: Chain }) => {
    const SectionHeader = ({ section }: { section: string }) => {
      return (
        <h2 className="text-center font-bold border-b border-zinc-500/10 dark:border-zinc-500/20">
          {fieldDisplayName(section)}
        </h2>
      );
    };

    const MetadataDiff = ({
      baseChain,
      targetChain,
      section,
    }: {
      baseChain: Chain;
      targetChain: Chain;
      section: string;
    }) => {
      const baseInfo = baseChain[section as keyof Chain];
      const targetInfo = targetChain[section as keyof Chain];
      const fields = Object.keys(baseInfo);

      const formatFieldInfo = (field: string, contents: any) => {
        if (field === 'id') return contents as number;
        if (field === 'name') return contents as string;
        if (field === 'nativeCurrency') return `${contents.name} (${contents.symbol})`;
        if (field === 'contracts') return getAddress(contents.multicall3.address)
        return JSON.stringify(contents)
      }

      return (
        <>
          <SectionHeader section={section} />
          {fields.map((field) => {
            if (!showField(section, field)) return null;
            return (
              <div className="flex justify-between py-1 border-b border-zinc-500/10 dark:border-zinc-500/20">
                <p>{formatFieldInfo(field, baseInfo[field])}</p>
                <p className="text-center">{fieldDisplayName(field)}</p>
                <p>{formatFieldInfo(field, targetInfo[field])}</p>
              </div>
            );
          })}
        </>
      );
    };

    const sections = Object.keys(baseChain);

    return (
      <main>
        {sections.map((section) => (
          <MetadataDiff
            key={section}
            baseChain={baseChain}
            targetChain={targetChain}
            section={section}
          />
        ))}
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
