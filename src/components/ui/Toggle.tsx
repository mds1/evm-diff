import { Tab } from '@headlessui/react';
import { classNames } from '@/lib/utils';
import { useRouter } from 'next/router';

type Props = {
	enabled: boolean;
	setEnabled: (enabled: boolean) => void;
	enabledText: string;
	disabledText: string;
	queryParamName?: string;
};

export const Toggle = ({
	enabled,
	setEnabled,
	enabledText,
	disabledText,
	queryParamName,
}: Props) => {
	const router = useRouter();

	const setQueryParam = (newValue: boolean) => {
		if (!queryParamName) return;

		const currentQueryParams = router.query;
		const isParamPresent = Object.prototype.hasOwnProperty.call(currentQueryParams, queryParamName);
		const newQueryParams = { ...currentQueryParams, [queryParamName]: newValue.toString() };

		if (isParamPresent && currentQueryParams[queryParamName] === newValue.toString()) return;
		router.replace({ pathname: router.pathname, query: newQueryParams });
	};

	const onChange = (index: number) => {
		setEnabled(index === 0);
		setQueryParam(index === 0);
	};

	return (
		<div className="flex items-center">
			<Tab.Group selectedIndex={enabled ? 0 : 1} onChange={(index) => onChange(index)}>
				<Tab.List className="flex space-x-1 rounded-md bg-zinc-100 p-1 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700">
					<Tab
						className={({ selected }) =>
							classNames(
								selected
									? 'bg-zinc-50 text-zinc-900 shadow dark:bg-zinc-900 dark:text-zinc-100'
									: 'text-zinc-500 hover:bg-zinc-50/[0.12] hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-zinc-700 dark:hover:text-zinc-300',
								'rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 ease-in-out',
							)
						}
					>
						{enabledText}
					</Tab>
					<Tab
						className={({ selected }) =>
							classNames(
								selected
									? 'bg-zinc-50 text-zinc-900 shadow dark:bg-zinc-900 dark:text-zinc-100'
									: 'text-zinc-500 hover:bg-zinc-50/[0.12] hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-zinc-700 dark:hover:text-zinc-300',
								'rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 ease-in-out',
							)
						}
					>
						{disabledText}
					</Tab>
				</Tab.List>
			</Tab.Group>
		</div>
	);
};
