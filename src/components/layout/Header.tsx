import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import logoDark from 'public/logo-dark.png';
import logoLight from 'public/logo-light.png';
import { COMPANY_NAME } from '@/lib/constants';
import { ExternalLink } from './ExternalLink';

export const Header = () => {
  const { resolvedTheme } = useTheme();
  const logo = resolvedTheme === 'light' ? logoDark.src : logoLight.src;
  return (
    <header>
      <div className='bg-primary py-2 text-center text-sm font-semibold'>
        This site is under active development. Check out{' '}
        <ExternalLink
          className='text-zinc-1000 underline dark:text-zinc-0'
          href='https://github.com/mds1/evm-diff'
          text='the repo'
        />{' '}
        to help contribute.
      </div>
      <div>
        <div className='flex items-center justify-between px-4 py-2 sm:px-6 sm:py-6 md:space-x-10'>
          <div>
            <Link href='/' className='flex'>
              <span className='sr-only'>{COMPANY_NAME}</span>
              <Image height='60' width='60' src={logo} alt='logo' />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
