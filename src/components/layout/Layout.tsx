import { useRouter } from 'next/router';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { classNames } from '@/lib/utils';

interface Props {
	children: JSX.Element;
}

export const Layout = ({ children }: Props) => {
	const { route } = useRouter();
	const isHome = route === '/';

	return (
		<div className="relative isolate flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-900">
			<Header />
			<main className="text-primary my-4 h-full w-full flex-1 px-4 sm:px-6 md:justify-between lg:px-8">
				{children}
			</main>
			<Footer />
			<svg
				viewBox="0 0 1024 1024"
				className={classNames(
					'fixed left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2',
					!isHome && 'opacity-0',
				)}
				aria-hidden="true"
			>
				<circle
					cx={512}
					cy={512}
					r={512}
					fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
					fillOpacity="0.2"
				/>
				<defs>
					<radialGradient
						id="759c1415-0410-454c-8f7c-9a820de03641"
						cx={0}
						cy={0}
						r={1}
						gradientUnits="userSpaceOnUse"
						gradientTransform="translate(512 512) rotate(90) scale(512)"
					>
						<stop stopColor="#10B981" />
						<stop offset={1} stopColor="#059669" stopOpacity={0} />
					</radialGradient>
				</defs>
			</svg>
		</div>
	);
};
