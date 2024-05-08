import { useState } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { classNames, copyToClipboard } from '@/lib/utils';
import { Tooltip } from './Tooltip';

// When content is a string, `textToCopy` is optional.
interface ContentStringProps {
	content: string;
	textToCopy?: string;
	Icon?: typeof ClipboardDocumentIcon;
	className?: string;
}

// When text is a JSX element, `textToCopy` is required.
interface ContentElementProps {
	content: JSX.Element;
	textToCopy: string;
	Icon?: typeof ClipboardDocumentIcon;
	className?: string;
}

export const Copyable = ({
	content,
	textToCopy,
	Icon = ClipboardDocumentIcon,
	className = '',
}: ContentStringProps | ContentElementProps) => {
	const [isShowing, setIsShowing] = useState(false);

	const onCopy = (text: string) => {
		setIsShowing(true);
		copyToClipboard(text);
		setTimeout(() => setIsShowing(false), 1000);
	};

	return (
		<div className={classNames('group group relative flex items-center', className)}>
			<div className="relative flex w-full items-center break-all">
				{content}
				<Icon
					onClick={() => onCopy(String(textToCopy || content))}
					className="ml-2 h-4 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
				/>
			</div>
			<div
				className={classNames(isShowing ? 'opacity-100' : 'opacity-0', 'transition duration-150')}
			>
				<Tooltip text="Copied!" showIcon={false} />
			</div>
		</div>
	);
};
