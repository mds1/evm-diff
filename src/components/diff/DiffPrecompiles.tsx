import { Address, getAddress } from 'viem';
import { References } from '@/components/diff/utils/References';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
import { Precompile } from '@/types';

type Props = {
  base: Precompile[];
  target: Precompile[];
  onlyShowDiff: boolean;
};

const formatPrecompile = (contents: Precompile | undefined) => {
  if (!contents) return <p>Not present</p>;
  return (
    <>
      <p>{contents.name}</p>
      <p className='text-secondary text-sm'>{contents.description}</p>
      <References references={contents.references} />
    </>
  );
};

// TODO Dedupe this helper method
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

  const diffContent = (
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
              className='grid grid-cols-12 items-center border-b border-zinc-500/10 py-6 dark:border-zinc-500/20'
            >
              <div className='col-span-2'>
                <Copyable content={formatAddress(addr)} textToCopy={addr} />
              </div>
              <div className='col-span-5 pr-4'>{formatPrecompile(basePrecompile)}</div>
              <div className='col-span-5'>{formatPrecompile(targetPrecompile)}</div>
            </div>
          )
        );
      })}
    </>
  );

  return <RenderDiff content={diffContent} />;
};
