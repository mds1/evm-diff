import { InformationCircleIcon } from '@heroicons/react/20/solid';

export const Tooltip = ({
	text,
	showIcon = true,
	width = 24,
}: {
	text: string;
	showIcon?: boolean;
	width?: number;
}) => {
	return (
		<div className="group relative">
			{showIcon && <InformationCircleIcon width={width} />}
			<span className="bg-primary absolute top-0 scale-0 rounded border border-zinc-300 p-3 text-xs group-hover:scale-100 dark:border-zinc-900">
				{text}
			</span>
		</div>
	);
};
