import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import { ThemePicker } from '@/components/site/site-style';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: appName,
    },
    links: [
      { text: "Docs", url: "/docs" },
      { text: "Gallery", url: "/gallery" },
      { text: "Convert", url: "/convert" },
      { type: "custom", secondary: true, children: <ThemePicker /> },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
