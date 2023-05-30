import { useState } from 'react';
import { useRouter } from 'next/router';
import { Chain, chains } from '@/chains';
import { ChainDiffSelectorChainCombobox } from '@/components/ui/ChainDiffSelectorChainCombobox';

export const ChainDiffSelector = () => {
  const router = useRouter();
  const [base, setBase] = useState(chains.mainnet);
  const [target, setTarget] = useState(chains.optimism);
  const chainsArray: Chain[] = Object.values(chains);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: '/diff',
      query: { base: base.metadata.id, target: target.metadata.id },
    });
  };

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center'>
        <div className='sm:mx-auto sm:w-full sm:max-w-[480px]'>
          <div className='bg-secondary px-6 py-12 shadow sm:rounded-lg sm:px-12'>
            <form className='space-y-6' onSubmit={onSubmit}>
              <ChainDiffSelectorChainCombobox
                chains={chainsArray}
                value={base}
                onChange={setBase}
                label='Compare'
              />
              <ChainDiffSelectorChainCombobox
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
