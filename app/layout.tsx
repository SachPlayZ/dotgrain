import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { inter, mono } from '@/lib/fonts';
import { TerminalSearch } from '@/components/site/terminal-search';
import { SiteStyle } from '@/components/site/site-style';
import { DEFAULT_THEME, themeCss, themeInit } from '@/lib/themes';

// Off Vercel, Next can't infer the origin, so absolute OG URLs need it spelled out.
export const metadata: Metadata = {
  metadataBase: new URL('https://dotgrain.space'),
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.className} ${mono.variable}`} data-dg-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <style dangerouslySetInnerHTML={{ __html: themeCss() }} />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider search={{ SearchDialog: TerminalSearch }}>
          <SiteStyle font={mono.style.fontFamily}>{children}</SiteStyle>
        </RootProvider>
      </body>
    </html>
  );
}
