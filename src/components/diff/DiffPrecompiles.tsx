import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Address, getAddress } from 'viem';
import { Markdown } from '@/components/diff/utils/Markdown';
import { References } from '@/components/diff/utils/References';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
import { classNames } from '@/lib/utils';
import { Precompile } from '@/types';

type Props = {
  base: Precompile[];
  target: Precompile[];
  onlyShowDiff: boolean;
};

const Abi = ({ precompile }: { precompile: Precompile }) => {
  let abi = (
    <p className='text-sm italic'>
      This interface is not yet rendered, but the data exists in the EVM Diff repository.
    </p>
  );

  if ('logicAbi' in precompile && !precompile.logicAbi.length) {
    abi = <p className='text-sm'>ABI not found.</p>;
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

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              'flex items-center text-sm',
              open ? 'text-secondary my-2' : 'text-zinc-300 dark:text-zinc-600'
            )}
          >
            ABI
            <ChevronRightIcon
              className={classNames('h-5 w-5', open ? 'rotate-90 transform' : '')}
            />
          </Disclosure.Button>
          <Disclosure.Panel className={open ? 'mb-2' : ''}>{abi}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const formatPrecompile = (precompile: Precompile | undefined) => {
  if (!precompile) return <p>Not present</p>;
  return (
    <>
      <p>
        <Markdown codeSize='0.9rem' content={precompile.name} />
      </p>
      <p className='text-secondary text-sm'>
        <Markdown content={precompile.description} />
      </p>
      <div className='mt-4'>
        <Abi precompile={precompile} />
        <References references={precompile.references} />
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
