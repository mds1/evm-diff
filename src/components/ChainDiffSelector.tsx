import { useState } from 'react';
import { useRouter } from 'next/router';
import { ChainDiffSelectorChainCombobox } from '@/components/ui/ChainDiffSelectorChainCombobox';
import chains from '@/lib/chains.json';

export const ChainDiffSelector = () => {
	const findChainById = (id: number) => {
		const chain = chains.find((chain) => chain.chainId === id);
		if (!chain) throw new Error(`Could not find chain with id: ${id}`);
		return chain;
	};

	const router = useRouter();
	const [base, setBase] = useState(findChainById(1)); // Ethereum Mainnet.
	const [target, setTarget] = useState(findChainById(10)); // OP Mainnet.

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		router.push({
			pathname: '/diff',
			query: { base: base.chainId, target: target.chainId },
		});
	};

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center">
				<div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
					<div className="bg-secondary px-6 py-12 shadow sm:rounded-lg sm:px-12">
						<form className="space-y-6" onSubmit={onSubmit}>
							<ChainDiffSelectorChainCombobox
								chains={chains}
								value={base}
								onChange={setBase}
								label="Compare"
							/>
							<ChainDiffSelectorChainCombobox
								chains={chains}
								value={target}
								onChange={setTarget}
								label="Against"
							/>
							<div className="pt-4">
								<button type="submit" className="button flex w-full justify-center">
									Diff
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
