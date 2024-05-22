import { ExternalLink } from '@/components/layout/ExternalLink';
import { COMPANY_NAME, COMPANY_URL } from '@/lib/constants';

export const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer>
			<div className="text-secondary text-center text-sm px-4 py-6 sm:px-6 lg:px-8">
				&copy; {currentYear} <ExternalLink href={COMPANY_URL} text={COMPANY_NAME} />. All rights
				reserved.
			</div>
		</footer>
	);
};
