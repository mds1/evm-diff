import { type Address, getAddress } from 'viem';
import type { Chain } from '@/../script/index';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';

type Precompile = Chain['precompiles'][0];
type Props = {
	base: Precompile[];
	target: Precompile[];
	onlyShowDiff: boolean;
};

const formatPrecompile = (precompile: Precompile | undefined) => {
	if (!precompile) return <div>Not present</div>;
	return <div>{precompile.implemented ? 'Yes' : 'No'}</div>;
};

// TODO Dedupe this helper method
const formatAddress = (addr: Address) => {
	const a = getAddress(addr);
	return <code>{`${a.slice(0, 6)}...${a.slice(-4)}`}</code>;
};

export const DiffPrecompiles = ({ base, target, onlyShowDiff }: Props) => {
	// Generate a sorted list of all precompiles from both base and target.
	const sortedAddrs = [
		...base.map((p) => getAddress(p.address)),
		...target.map((p) => getAddress(p.address)),
	].sort((a, b) => a.localeCompare(b));
	const precompileAddrs = [...new Set(sortedAddrs)];

	const diffContent = (
		<>
			{precompileAddrs.map((addr) => {
				const basePrecompile = base.find((p) => getAddress(p.address) === addr);
				const targetPrecompile = target.find((p) => getAddress(p.address) === addr);

				const isEqual = JSON.stringify(basePrecompile) === JSON.stringify(targetPrecompile);
				const show = !isEqual || !onlyShowDiff;

				if (!show) return false;
				return (
					<div
						key={addr}
						className="grid grid-cols-12 items-center border-b border-zinc-500/10 py-2 dark:border-zinc-500/20"
					>
						<div className="col-span-2">
							<div>{basePrecompile?.name || targetPrecompile?.name}</div>
							<Copyable
								className="text-secondary text-sm"
								content={formatAddress(addr)}
								textToCopy={addr}
							/>
						</div>
						<div className="col-span-5 pr-4">{formatPrecompile(basePrecompile)}</div>
						<div className="col-span-5">{formatPrecompile(targetPrecompile)}</div>
					</div>
				);
			})}
		</>
	);

	return (
		<>
			<div className="text-secondary text-sm">
				Whether or not standard precompiles are supported.
			</div>
			<RenderDiff content={diffContent} />
		</>
	);
};
