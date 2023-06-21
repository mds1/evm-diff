import * as React from 'react';
import type { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import { Layout } from '@/components/layout/Layout';
import '@/styles/globals.css';

const font = Open_Sans({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <ThemeProvider attribute='class'>
      {mounted && (
        <Layout>
          <div className={font.className}>
            <Component {...pageProps} />
            <Analytics />
          </div>
        </Layout>
      )}
    </ThemeProvider>
  );
}

export default App;
