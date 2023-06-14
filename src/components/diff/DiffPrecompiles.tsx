import { Address, getAddress } from 'viem';
import { Precompile, Predeploy } from '@/types';

type Props = {
  base: (Precompile | Predeploy)[];
  target: (Precompile | Predeploy)[];
  onlyShowDiff: boolean;
};

const formatPrecompile = (contents: Precompile | Predeploy | undefined) => {
  if (!contents) return <p>Not present</p>;
  return (
    <>
      <p>{contents.name}</p>
      <p className='text-secondary text-sm'>{contents.description}</p>
    </>
  );
};

const formatAddress = (addr: Address) => {
  addr = getAddress(addr);
  return <code className='text-sm'>{`${addr.slice(0, 6)}...${addr.slice(-4)}`}</code>;
};

export const DiffPrecompiles = ({ base, target, onlyShowDiff }: Props) => {
  // Generate a sorted list of all precompiles from both base and target.
  const sortedAddrs = [
    ...base.map((p) => getAddress(p.address)),
    ...target.map((p) => getAddress(p.address)),
  ].sort((a, b) => a.localeCompare(b));
  const precompileAddrs = [...new Set(sortedAddrs)];

  return (
    <>
      {precompileAddrs.map((addr) => {
        const basePrecompile = base.find((p) => getAddress(p.address) === addr);
        const targetPrecompile = target.find((p) => getAddress(p.address) === addr);

        const isEqual = JSON.stringify(basePrecompile) === JSON.stringify(targetPrecompile);
        const showPrecompile = !isEqual || !onlyShowDiff;

        return (
          showPrecompile && (
            <div
              key={addr}
              className='flex items-center justify-between border-b border-zinc-500/10 py-1 dark:border-zinc-500/20'
            >
              <div className='flex-1'>{formatPrecompile(basePrecompile)}</div>
              <div className='flex-1 text-center'>{formatAddress(addr)}</div>
              <div className='flex-1'>{formatPrecompile(targetPrecompile)}</div>
            </div>
          )
        );
      })}
    </>
  );
};
