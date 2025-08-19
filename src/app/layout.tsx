import { Navigation } from '@/components/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Perfly',
  description: 'Minimal, modern performance testing platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='min-h-dvh overflow-x-hidden'>
            <Navigation />
            <main className='w-full'>{children}</main>
          </div>
          <Toaster richColors position='top-center' />
        </ThemeProvider>
      </body>
    </html>
  );
}
