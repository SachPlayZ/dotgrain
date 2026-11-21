import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

// Also the ASCII glyph font: next/font renames the family, so pass `mono.style.fontFamily` to the provider.
export const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

// Display italic for the landing headline, against the mono.
export const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: 'italic', variable: '--font-instrument-serif' });
