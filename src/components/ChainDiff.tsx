import { useState } from 'react';
import { chains } from '@/chains';
import { Chain } from '@/chains/types';
import { ChainSelector } from '@/components/ui/ChainSelector';

export const ChainDiff = () => {
  const [base, setBase] = useState(chains.mainnet);
  const [target, setTarget] = useState(chains.optimism);

  const chainsArray: Chain[] = Object.values(chains);

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center'>
        <div className='sm:mx-auto sm:w-full sm:max-w-[480px]'>
          <div className='bg-secondary px-6 py-12 shadow sm:rounded-lg sm:px-12'>
            <form className='space-y-6' action='#' method='POST'>
              <ChainSelector chains={chainsArray} value={base} onChange={setBase} label='Compare' />
              <ChainSelector
                chains={chainsArray}
                value={target}
                onChange={setTarget}
                label='Against'
              />
              <div className='pt-4'>
                <button type='submit' className='button flex w-full justify-center'>
                  Diff
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
