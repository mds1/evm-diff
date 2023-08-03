import NextHead from 'next/head';
import { OG_ENDPOINT, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants';

interface Props {
  title?: string;
  description?: string;
  baseId: number;
  targetId: number;
}

export const Head = (props: Props) => {
  const { title, description, baseId, targetId } = props;
  return (
    <NextHead>
      <title>{props.title ? `${title} | ${SITE_NAME}` : SITE_NAME}</title>
      <meta name='description' content={description ?? SITE_DESCRIPTION} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta
        property='og:image'
        content={`${SITE_URL}/${OG_ENDPOINT}?base=${baseId}&target=${targetId}`}
      />
    </NextHead>
  );
};
