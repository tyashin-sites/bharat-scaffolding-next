import { graphJson, type PageGraphOptions } from '@/lib/knowledge-graph';

/** Emits the page's single interlinked schema.org @graph. */
export function JsonLd(props: PageGraphOptions) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: graphJson(props) }}
    />
  );
}
