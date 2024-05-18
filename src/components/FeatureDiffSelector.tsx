import { useState } from 'react';
import { useRouter } from 'next/router';
import { BaseCombobox } from '@/components/ui/BaseCombobox';
import features from '@/lib/features.json';
import { featureMap } from '@/lib/constants';

export const FeatureDiffSelector = () => {
	// --- URL Parsing ---
	const router = useRouter();

	// --- Prepare options ---
	const options = features
		.filter(({ feature }) => !featureMap[feature as keyof typeof featureMap].hide)
		.map(({ feature }) => ({
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
