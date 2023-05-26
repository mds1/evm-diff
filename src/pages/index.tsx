import { Head } from '@/components/layout/Head';
import { SITE_DESCRIPTION } from '@/lib/constants';

const Home = () => {
  return (
    <>
      <Head />
      <div className='mx-auto mt-6 w-full max-w-screen-lg sm:mt-20'>
        <h1 className='text-accent mb-10 text-center text-3xl font-bold sm:text-4xl'>
          {SITE_DESCRIPTION}
        </h1>
      </div>
    </>
  );
};

export default Home;
