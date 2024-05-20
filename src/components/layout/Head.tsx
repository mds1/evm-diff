import NextHead from 'next/head';
import { type NextRouter, useRouter } from 'next/router';
import { chainNameFromId } from '@/lib/utils';
import { featureMap } from '@/lib/constants';
import {
	COMPANY_URL,
	OG_ENDPOINT,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL,
	TWITTER_URL,
} from '@/lib/constants';

// Function to generate the query parameter string based on base and target values.
const getRouteData = (router: NextRouter) => {
	const defaultRouteData = { title: SITE_NAME, imageUrl: '' };
	const path = router.pathname;
	if (path === '/diff') {
		const { base, target } = router.query;
		if (!base || !target) defaultRouteData;

		const baseTitle = chainNameFromId(Number(base));
		const targetTitle = chainNameFromId(Number(target));
		if (!baseTitle || !targetTitle) return defaultRouteData;

		const title = `${baseTitle} vs. ${targetTitle} | ${SITE_NAME}`;
		const imageUrl = `?base=${base}&target=${target}`;
		return { title, imageUrl };
	}

	if (path === '/features') {
		const { feature } = router.query;
		if (!feature) return defaultRouteData;

		const title = `${featureMap[feature as string].title} Comparison | ${SITE_NAME}`;
		return { title, imageUrl: '' };
	}

	return defaultRouteData;
};

export const Head = () => {
	const router = useRouter();
	const { title, imageUrl } = getRouteData(router);
	const imgUrl = `${SITE_URL}${OG_ENDPOINT}${imageUrl}`;

	return (
		<NextHead>
			<title>{title}</title>
			<meta name="description" content={SITE_DESCRIPTION} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />

			<meta property="og:title" content={title} />
			<meta property="og:description" content={SITE_DESCRIPTION} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={SITE_URL} />
			<meta property="og:image" content={imgUrl} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content={COMPANY_URL} />
			<meta name="twitter:creator" content={TWITTER_URL} />
		</NextHead>
	);
};
