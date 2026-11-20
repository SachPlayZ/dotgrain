import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { StyleBar } from '@/components/site/site-style';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout tree={source.getPageTree()} {...baseOptions()} sidebar={{ banner: <StyleBar /> }}>
      {children}
    </DocsLayout>
  );
}
