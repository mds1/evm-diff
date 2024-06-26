// This component is used to display the references for a section in a diff
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Markdown } from '@/components/diff/utils/Markdown';
import { classNames } from '@/lib/utils';

export const Collapsible = ({
	kind,
	contents,
	className,
	title,
}: {
	kind: 'references' | 'notes' | 'custom';
	contents: string[] | string | JSX.Element | undefined;
	className?: string;
	title?: string;
}) => {
	if (contents === undefined) return <></>;
	const refs = Array.isArray(contents) ? contents : [contents];

	let headerTitle = 'unknown';
	if (title) headerTitle = title;
	else if (kind === 'references') headerTitle = 'References';
	else if (kind === 'notes') headerTitle = 'Notes';

	const panelContent =
		kind === 'custom' ? (
			contents
		) : (
			<ol className="text-ellipses list-decimal pl-4 text-sm">
				{refs.map((reference) => {
					return (
						<li key={JSON.stringify(reference)} className="list-item">
							<Markdown content={reference as string} />
						</li>
					);
				})}
			</ol>
		);

	return (
		<div className={className}>
			<Disclosure>
				{({ open }) => (
					<>
						<Disclosure.Button
							className={classNames(
								'mt-1 flex items-center text-sm',
								open ? 'text-secondary' : 'text-zinc-300 dark:text-zinc-600',
							)}
						>
							{headerTitle}
							<ChevronRightIcon
								className={classNames('h-5 w-5', open ? 'rotate-90 transform' : '')}
							/>
						</Disclosure.Button>
						<Disclosure.Panel>{panelContent}</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
};
