import NextHead from 'next/head';
import {
  COMPANY_URL,
  OG_ENDPOINT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  TWITTER_URL,
} from '@/lib/constants';

interface Props {
  title?: string;
  description?: string;
  base?: string | string[] | undefined;
  target?: string | string[] | undefined;
}

// Function to generate the query parameter string based on base and target values.
const getQueryParams = (
  base: string | string[] | undefined,
  target: string | string[] | undefined
) => {
  let queryParams = '';
  if (typeof base === 'string') {
    queryParams += `?base=${base}`;
  }
  if (typeof target === 'string') {
    queryParams += `${queryParams ? '&' : '?'}target=${target}`;
  }
  return queryParams;
};

export const Head = (props: Props) => {
  const { title, description, base, target } = props;
  return (
    <NextHead>
      <title>{props.title ? `${title} | ${SITE_NAME}` : SITE_NAME}</title>
      <meta name='description' content={description ?? SITE_DESCRIPTION} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />

      <meta property='og:title' content={SITE_NAME} />
      <meta property='og:description' content={SITE_DESCRIPTION} />
      <meta
        property='og:image'
        content={`${SITE_URL}${OG_ENDPOINT}${getQueryParams(base, target)}`}
      />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content={COMPANY_URL} />
      <meta name='twitter:creator' content={TWITTER_URL} />
    </NextHead>
  );
};
