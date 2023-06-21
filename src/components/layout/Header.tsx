import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo.svg';
import { COMPANY_NAME } from '@/lib/constants';
import { ExternalLink } from './ExternalLink';

export const Header = () => {
  return (
    <header>
      <div className='bg-yellow-500 py-2 text-center text-sm font-semibold dark:bg-yellow-600'>
        This site is a work in progress and should not yet be relied on! Check out{' '}
        <ExternalLink
          className='text-black underline dark:text-white'
          href='https://github.com/mds1/evm-diff'
          text='the repo'
        />{' '}
        if you want to contribute.
      </div>
      <div>
        <div className='flex items-center justify-between px-4 py-2 sm:px-6 sm:py-6 md:space-x-10'>
          <div>
            <Link href='/' className='flex'>
              <span className='sr-only'>{COMPANY_NAME}</span>
              <Image className='h-8 sm:h-14' src={logo} alt='logo' />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
