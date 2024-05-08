import { type Address, getAddress } from 'viem';
import { evmStackAddresses, type EVMStackResult } from '@/../script/checks/evm-stack-addresses';
import type { Chain } from '@/../script/index';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';

type EvmStackResults = Chain['evmStackAddresses'];
type Props = {
	base: EvmStackResults;
	target: EvmStackResults;
	onlyShowDiff: boolean;
};

const formatAddress = (addr: Address) => {
	const a = getAddress(addr);
	return <code>{`${a.slice(0, 6)}...${a.slice(-4)}`}</code>;
};

const formatStackHeader = (stack: keyof EvmStackResults) => {
	if (stack === 'OP') return 'OP Stack';
	if (stack === 'Orbit') return 'Orbit';
	return stack;
};

export const DiffEVMStackAddresses = ({ base, target, onlyShowDiff }: Props) => {
	const stacks = Object.keys(evmStackAddresses) as Array<keyof EvmStackResults>;

	const isEqual = (base: EVMStackResult | undefined, target: EVMStackResult | undefined) => {
		return JSON.stringify(base) === JSON.stringify(target);
	};

	const diffContent = (
		<>
			{stacks.map((stack) => {
				const baseStackAddresses = base[stack];
				const targetStackAddresses = target[stack];

				const diffAddresses = baseStackAddresses.filter((baseAddr) => {
					const targetStackAddress = targetStackAddresses.find(
						(p) => getAddress(p.address) === getAddress(baseAddr.address),
					);
					return !isEqual(baseAddr, targetStackAddress);
				});

				return (
					<div key={stack}>
						<div className="mt-4 text-lg font-bold tracking-wide">{formatStackHeader(stack)}</div>
						<div>
							{diffAddresses.length === 0 ? (
								<div className="text-secondary py-2">No differences found.</div>
							) : (
								diffAddresses.map((baseStackAddress) => {
									const targetStackAddress = targetStackAddresses.find(
										(p) => getAddress(p.address) === getAddress(baseStackAddress.address),
									);

									const isEqual =
										JSON.stringify(baseStackAddress) === JSON.stringify(targetStackAddress);
									const show = !isEqual || !onlyShowDiff;
									if (!show) return false;

									const name = baseStackAddress?.name || targetStackAddress?.name;
									const addr = getAddress(baseStackAddress.address);
									return (
										<div
											key={`${stack}-${addr}`}
											className="grid grid-cols-12 items-center border-b border-zinc-500/10 py-2 dark:border-zinc-500/20"
										>
											<div className="max-sm:pr-4 max-sm:col-span-8 col-span-6">
												<div>{name}</div>
												<Copyable
													className="text-secondary text-sm"
													content={formatAddress(addr)}
													textToCopy={addr}
												/>
											</div>
											<div className="max-sm:col-span-2 col-span-3 pr-4 max-sm:text-right">
												{baseStackAddress.exists ? 'Yes' : 'No'}
											</div>
											<div className="max-sm:col-span-2 col-span-3 max-sm:text-right">{targetStackAddress?.exists ? 'Yes' : 'No'}</div>
										</div>
									);
								})
							)}
						</div>
					</div>
				);
			})}
		</>
	);

	return (
		<>
			<div className="text-secondary text-sm">
				Existence of &quot;stack-specific&quot; accounts on a chain, to determine what kind of chain
				it is. If an account exists on both chains but shows up in the diff, it indicates the code
				hash is different. This does not necessarily mean the contract is different.
			</div>
			<RenderDiff content={diffContent} />
		</>
	);
};
