import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { chainLogoUrl, classNames } from '@/lib/utils';

interface Chain {
	name: string;
	chainId: number;
}

interface Props {
	label: string;
	chains: Chain[];
	value: Chain;
	onChange: (chain: Chain) => void;
}

export const ChainDiffSelectorChainCombobox = ({ label, chains, value, onChange }: Props) => {
	const [query, setQuery] = useState('');
	const [chain, setChain] = useState(value);

	useEffect(() => {
		setChain(value);
	}, [value]);

	const filteredChains =
		query === ''
			? chains
			: chains.filter((chain) => {
					return (
						chain.name.toLowerCase().includes(query.toLowerCase()) ||
						chain.chainId.toString().includes(query.toLowerCase())
					);
				});

	return (
		<Combobox
			as="div"
			value={chain}
			onChange={(val) => {
				setChain(val);
				onChange(val);
			}}
		>
			<Combobox.Label className="text-primary block text-sm font-medium leading-6">
				{label}
			</Combobox.Label>
			<div className="relative mt-2 flex items-center">
				<Image
					src={chainLogoUrl(chain)}
					alt=""
					className="h-6 w-6 flex-shrink-0 rounded-full absolute left-2"
					width={24}
					height={24}
				/>
				<Combobox.Input
					className="text-primary bg-primary w-full rounded-md border-0 py-1.5 pl-10 pr-12 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
					onChange={(event) => setQuery(event.target.value)}
					displayValue={(chain: Chain) => chain.name}
				/>
				<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
					<ChevronUpDownIcon className="h-5 w-5 text-zinc-400" aria-hidden="true" />
				</Combobox.Button>

				{filteredChains.length > 0 && (
					<Combobox.Options className="bg-primary absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-zinc-1000 ring-opacity-5 focus:outline-none sm:text-sm">
						{filteredChains.map((chain) => (
							<Combobox.Option
								key={chain.chainId}
								value={chain}
								className={({ active }) =>
									classNames(
										'relative cursor-pointer select-none py-2 pl-3 pr-9',
										active ? 'text-primary bg-green-600/10 dark:bg-green-500/10' : 'text-primary',
									)
								}
							>
								{({ active, selected }) => (
									<>
										<div className="flex items-center">
											<Image
												src={chainLogoUrl(chain)}
												alt=""
												className="h-6 w-6 flex-shrink-0 rounded-full"
												width={24}
												height={24}
											/>
											<span className={classNames('ml-3 truncate', selected && 'font-semibold')}>
												{chain.name}
											</span>
										</div>

										{selected && (
											<span
												className={classNames(
													'absolute inset-y-0 right-0 flex items-center pr-4',
													active ? 'text-primary' : 'text-green-600',
												)}
											>
												<CheckIcon className="h-5 w-5" aria-hidden="true" />
											</span>
										)}
									</>
								)}
							</Combobox.Option>
						))}
					</Combobox.Options>
				)}
			</div>
		</Combobox>
	);
};
