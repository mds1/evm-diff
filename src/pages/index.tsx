import { ChainDiffSelector } from '@/components/ChainDiffSelector';
import { SITE_DESCRIPTION } from '@/lib/constants';

const Home = () => {
  return (
    <>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='relative isolate overflow-hidden px-6 py-0 sm:rounded-3xl sm:px-24 sm:py-20'>
          <h2 className='mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-zinc-1000 dark:text-zinc-0 sm:text-4xl'>
            {SITE_DESCRIPTION}
          </h2>
          <p className='text-secondary mx-auto mt-2 max-w-xl text-center text-lg leading-8'>
            Compare execution layer differences between chains in a friendly format
          </p>
          <div className='mx-auto mt-10 flex max-w-md gap-x-4 rounded-lg border border-zinc-200 dark:border-zinc-700'>
            <ChainDiffSelector />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
