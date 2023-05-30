import { useRouter } from 'next/router';
import { chains } from '@/chains';
import { ChainDiff } from '@/components/ChainDiff';

const Diff = () => {
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

  const errorDiv = () => (
    <main className='text-center'>
      <h1 className='text-primary text-3xl font-bold tracking-tight sm:text-5xl'>Oops!</h1>
      <p className='text-secondary mt-6 text-base leading-7'>
        Invalid chain(s) provided, please try again below.
      </p>
      <div className='mt-10'>
        <div>
          <ChainDiff />
        </div>
      </div>
    </main>
  );

  const diffDiv = () => (
    <main>
      <p>Base: {baseChain?.metadata.id}</p>
      <p>Target: {targetChain?.metadata.id}</p>
    </main>
  );

  return (
    <div>
      {(!baseChain || !targetChain) && errorDiv()}
      {baseChain && targetChain && diffDiv()}
    </div>
  );
};

export default Diff;
