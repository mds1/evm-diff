import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { chains } from '@/chains';
import { ChainDiffSelectorChainCombobox } from '@/components/ui/ChainDiffSelectorChainCombobox';
import { Chain } from '@/types';

interface Props {
  base: Chain;
  setBase: Dispatch<SetStateAction<Chain>>;
  target: Chain;
  setTarget: Dispatch<SetStateAction<Chain>>;
}

export const ChainDiffSelector = (props: Props) => {
  const router = useRouter();
  const { base, setBase, target, setTarget } = props;
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
