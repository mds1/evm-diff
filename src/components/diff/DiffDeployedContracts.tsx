import { getAddress } from 'viem';
import type { Chain } from '@/../script/index';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
import { FormattedAddress } from '@/lib/utils';

type DeployedContract = Chain['deployedContracts'][0];
type Props = {
	base: DeployedContract[];
	target: DeployedContract[];
	onlyShowDiff: boolean;
};

const FormattedDeployedContract = ({
	deployedContract,
}: { deployedContract: DeployedContract | undefined }) => {
	if (!deployedContract) return <p>Not present</p>;
	const addr = getAddress(deployedContract.address);
	return (
		<>
			<div className="grid grid-cols-8 space-y-1">
				<div className="col-span-2">Address</div>
				<div className="col-span-6">
					<Copyable
						content={<FormattedAddress addr={addr} className="text-sm" />}
						textToCopy={getAddress(addr)}
					/>
				</div>

				<div className="col-span-2">Deployed?</div>
				<div className="col-span-6">{deployedContract.hasCode ? 'Yes' : 'No'}</div>
			</div>
		</>
	);
};

export const convertToComparableContract = (contract: DeployedContract | undefined) => {
	if (typeof contract === 'undefined') return undefined;
	const slimmedContract = contract as any; // eslint-disable-line @typescript-eslint/no-explicit-any
	slimmedContract.codeHash = undefined;
	return slimmedContract;
};

export const DiffDeployedContracts = ({ base, target, onlyShowDiff }: Props) => {
	const sortedNames = [...base.map((c) => c.name), ...target.map((c) => c.name)].sort((a, b) =>
		a.localeCompare(b),
	);
	const deployedContractNames = [...new Set(sortedNames)];

	const diffContent = (
		<>
			{deployedContractNames.map((name) => {
				const baseDeployedContract = base.find((c) => c.name === name);
				const targetDeployedContract = target.find((c) => c.name === name);

				const isEqual =
					JSON.stringify(convertToComparableContract(baseDeployedContract)) ===
					JSON.stringify(convertToComparableContract(targetDeployedContract));

				const show = !isEqual || !onlyShowDiff;

				if (!show) return false;
				return (
					<div
						key={name}
						className="grid grid-cols-12 items-center border-b border-zinc-500/10 py-2 dark:border-zinc-500/20"
					>
						<div className="col-span-2">{name}</div>
						<div className="col-span-5 pr-4">
							<FormattedDeployedContract deployedContract={baseDeployedContract} />
						</div>
						<div className="col-span-5">
							<FormattedDeployedContract deployedContract={targetDeployedContract} />
						</div>
					</div>
				);
			})}
		</>
	);

	return <RenderDiff content={diffContent} />;
};
