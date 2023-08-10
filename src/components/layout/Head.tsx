import NextHead from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import {
  COMPANY_URL,
  OG_ENDPOINT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  TWITTER_URL,
} from '@/lib/constants';

// Function to generate the query parameter string based on base and target values.
const getImageUrl = (router: NextRouter) => {
  const path = router.pathname;
  if (path === '/diff') {
    const { base, target } = router.query;
    if (!base && !target) return '';
    return `?base=${base}&target=${target}`;
  }
  return '';
};

export const Head = ({ title, description }: { title?: string; description?: string }) => {
  const router = useRouter();
  const adjustedTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const imgUrl = `${SITE_URL}${OG_ENDPOINT}${getImageUrl(router)}`;

  return (
    <NextHead>
      <title>{adjustedTitle}</title>
      <meta name='description' content={description ?? SITE_DESCRIPTION} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />

      <meta property='og:title' content={adjustedTitle} />
      <meta property='og:description' content={SITE_DESCRIPTION} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={SITE_URL} />
      <meta property='og:image' content={imgUrl} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content={COMPANY_URL} />
      <meta name='twitter:creator' content={TWITTER_URL} />
    </NextHead>
  );
};
