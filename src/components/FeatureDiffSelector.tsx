import { useState } from 'react';
import { useRouter } from 'next/router';
import { BaseCombobox } from '@/components/ui/BaseCombobox';
import features from '@/lib/features.json';

interface Section {
	title: string;
	infoText?: string;
}

const featureMap: Record<string, Section> = {
	metadata: { title: 'Metadata' },
	opcodes: {
		title: 'Opcodes',
		infoText: 'Whether or not standard opcodes are supported.',
	},
	deployedContracts: {
		title: 'Deployed Contracts',
		infoText: 'Whether common utility contracts used by developers and users exist.',
	},
	precompiles: {
		title: 'Precompiles',
		infoText: 'Whether or not standard precompiles are supported.',
	},
	evmStackAddresses: {
		title: 'EVM Stack Addresses',
		infoText:
			'Existence of "stack-specific" accounts on a chain, to determine what kind of chain it is. If an account exists on both chains but shows up in the diff, it indicates the code hash is different. This does not necessarily mean the contract is different.',
	},
};

export const FeatureDiffSelector = () => {
	// --- URL Parsing ---
	const router = useRouter();

	// --- Prepare options ---
	const options = features.map(({ feature }) => ({
		key: feature,
		name: featureMap[feature as keyof typeof featureMap].title,
	}));

	// --- Form handling ---
	// Set PUSH0 as the default.
	const opcodeIndex = options.findIndex((opt) => opt.name === 'Opcodes');
	const [option, setOption] = useState(options[opcodeIndex]);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		router.push({ pathname: '/features', query: { feature: option.key } });
	};

	// --- Selector Div ---
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center">
			<div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="bg-secondary px-6 py-12 shadow sm:rounded-lg sm:px-12">
					<form className="mx-auto max-w-md space-y-6" onSubmit={onSubmit}>
						<BaseCombobox
							label="Select feature"
							options={options}
							value={option}
							onChange={setOption}
						/>
						<button type="submit" className="button flex w-full justify-center">
							Compare
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
