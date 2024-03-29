import { Address, getAddress } from 'viem';
import { Collapsible } from '@/components/diff/utils/Collapsible';
import { Markdown } from '@/components/diff/utils/Markdown';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
import { Precompile } from '@/types';

type Props = {
  base: Precompile[];
  target: Precompile[];
  onlyShowDiff: boolean;
};

const Abi = ({ precompile }: { precompile: Precompile }) => {
  let abi = (
    <div className='text-sm italic'>
      This interface is not yet rendered, but the data exists in the EVM Diff repository.
    </div>
  );

  if ('logicAbi' in precompile && !precompile.logicAbi.length) {
    abi = <div className='text-sm'>ABI not found.</div>;
  } else if ('logicAbi' in precompile && precompile.logicAbi.length > 0) {
    abi = (
      <ul>
        {precompile.logicAbi.map((sig) => (
          <li key={sig} className='my-2 text-xs'>
            <code>{sig}</code>
          </li>
        ))}
      </ul>
    );
  }

  return <Collapsible kind='custom' contents={abi} title='ABI' />;
};

const formatPrecompile = (precompile: Precompile | undefined) => {
  if (!precompile) return <div>Not present</div>;
  return (
    <>
      <div>
        <Markdown codeSize='0.9rem' content={precompile.name} />
      </div>
      <div className='text-secondary text-sm'>
        <Markdown content={precompile.description} />
      </div>
      <div className='mt-4'>
        <Abi precompile={precompile} />
        <Collapsible kind='references' contents={precompile.references} />
      </div>
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
