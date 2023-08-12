import { useState } from 'react';
import { useRouter } from 'next/router';
import { chains } from '@/chains';
import { BaseCombobox } from '@/components/ui/BaseCombobox';
import { Chain } from '@/types';

const Features = () => {
  // --- URL Parsing ---
  const router = useRouter();
  const { name, kind } = router.query;

  // --- Prepare options ---
  type Kind = 'opcode'; // TODO Support more kinds.
  type FeatureHeader = {
    name: string;
    isHeader: boolean;
  };

  type FeatureItem = {
    name: string;
    kind: Kind;
  };

  type Feature = FeatureHeader | FeatureItem;

  const chainsArray: Chain[] = Object.values(chains);
  const opcodeOptions = chainsArray
    .map(({ opcodes }) => {
      return opcodes.map(({ name }) => ({
        name: name!.toLocaleUpperCase(),
        kind: 'opcode' as Kind,
      }));
    })
    .flat();

  const options: Feature[] = [{ name: 'Opcodes', isHeader: true }, ...opcodeOptions];

  // --- Form handling ---
  const [option, setOption] = useState(options[1]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: '/features',
      query: option,
    });
  };

  // --- Selector Div ---
  const SelectorDiv = () => (
    <main className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <div className='relative isolate overflow-hidden px-6 py-0 sm:rounded-3xl sm:px-24 sm:py-20'>
        <h2 className='mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-zinc-1000 dark:text-zinc-0 sm:text-4xl'>
          Compare Feature Support
        </h2>
        <p className='text-secondary mx-auto mt-2 max-w-prose text-center text-lg leading-8'>
          Choose an opcode and check its support across chains.
        </p>
        <p className='text-secondary mx-auto max-w-prose text-center text-sm italic leading-8'>
          More feature comparisons coming soon!
        </p>
        <form className='mx-auto mt-6 max-w-md space-y-6' onSubmit={onSubmit}>
          <BaseCombobox
            label='Select a feature'
            options={options}
            value={option}
            onChange={setOption}
          />
          <button type='submit' className='button flex w-full justify-center'>
            View
          </button>
        </form>
      </div>
    </main>
  );

  // --- Feature Table ---
  const FeatureTable = () => (
    <main>
      <h2 className='mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-zinc-1000 dark:text-zinc-0 sm:text-4xl'>
        Compare {name} Support
      </h2>
    </main>
  );

  // --- Render ---
  return <>{name && kind ? <FeatureTable /> : <SelectorDiv />}</>;
};

export default Features;
