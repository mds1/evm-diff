import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

interface Props {
  children: JSX.Element;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className='bg-gradient-to-br from-zinc-50 via-zinc-200 to-zinc-300 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900 flex min-h-screen flex-col'>
      <Header />
      <main className='text-primary my-4 h-full w-full flex-1 px-4 sm:px-6 md:justify-between lg:px-8'>
        {children}
      </main>
      <Footer />
    </div>
  );
};