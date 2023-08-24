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
        Support EVM Diff by contributing to our{' '}
        <ExternalLink
          className='text-zinc-1000 underline dark:text-zinc-0'
          href='https://explorer.gitcoin.co/#/round/10/0x8de918f0163b2021839a8d84954dd7e8e151326d/0x8de918f0163b2021839a8d84954dd7e8e151326d-145'
          text='Gitcoin Grant'
        />{' '}
        during this round.
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
