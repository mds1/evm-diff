import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo.svg';
import { COMPANY_NAME } from '@/lib/constants';

export const Header = () => {
  return (
    <header>
      <div>
        <div className='flex items-center justify-between px-4 py-6 sm:px-6 md:space-x-10'>
          <div>
            <Link href='/' className='flex'>
              <span className='sr-only'>{COMPANY_NAME}</span>
              <Image className='h-14' src={logo} alt='logo' />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
