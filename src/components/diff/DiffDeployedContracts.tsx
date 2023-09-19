import { Address, getAddress } from 'viem';
import { Abi } from '@/components/diff/utils/Abi';
import { Collapsible } from '@/components/diff/utils/Collapsible';
import { Markdown } from '@/components/diff/utils/Markdown';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
import {
  DeployedContract,
  DeployedContractKind,
  ProxiedDeployedContract,
  StandardDeployedContract,
} from '@/types';

type Props = {
  base: DeployedContract[];
  target: DeployedContract[];
  onlyShowDiff: boolean;
};

const formatDeployedContract = (deployedContract: DeployedContract | undefined) => {
  if (!deployedContract) return <p>Not present</p>;

  const title =
    deployedContract.kind === DeployedContractKind.WrappedNativeAsset ? (
      <Markdown
        codeSize='0.9rem'
        content={`${deployedContract.tokenName!} (${deployedContract.tokenSymbol!})`}
      />
    ) : (
      <Markdown codeSize='0.9rem' content={deployedContract.name} />
    );

  const addr = getAddress(deployedContract.address);
  const deployInstructions = deployedContract.deploymentInstructions || 'N/A';

  return (
    <>
      <div>{title}</div>
      <div className='text-secondary text-sm'>
        <Markdown content={deployedContract.description} />
      </div>
      <div className='text-secondary mt-3 grid grid-cols-4 space-y-1 text-sm'>
        <div className='col-span-2'>Address</div>
        <div className='col-span-2'>
          <Copyable content={formatAddress(addr)} textToCopy={getAddress(addr)} />
        </div>

        <div className='col-span-2'>Deploy Instructions</div>
        <div className='col-span-2'>
          <Markdown content={deployInstructions} />
        </div>
      </div>
      <div className='mt-4'>
        <Abi contract={deployedContract} />
        <Collapsible kind='references' contents={deployedContract.references} />
      </div>
    </>
  );
};

const formatAddress = (addr: Address) => {
  addr = getAddress(addr);
  return <code className='text-sm'>{`${addr.slice(0, 6)}...${addr.slice(-4)}`}</code>;
};

type OmittedStandardDeployedContract = Omit<
  StandardDeployedContract,
  'description' | 'deploymentInstructions' | 'references'
>;
type OmittedProxiedDeployedContract = Omit<
  ProxiedDeployedContract,
  'description' | 'deploymentInstructions' | 'references'
>;

export const convertToComparableContract = (
  contract: DeployedContract | undefined
): OmittedStandardDeployedContract | OmittedProxiedDeployedContract | undefined => {
  if (typeof contract === 'undefined') return undefined;

  const baseReturnData: OmittedStandardDeployedContract = {
    name: contract.name,
    kind: contract.kind,
    tokenName: contract.tokenName,
    tokenSymbol: contract.tokenSymbol,
    address: contract.address,
    notes: contract.notes,
    logicAbi: contract.logicAbi.sort(),
  };

  if ('proxyAbi' in contract) {
    const proxiedReturnData: OmittedProxiedDeployedContract = {
      ...baseReturnData,
      proxyAbi: contract.proxyAbi.sort(),
      logicAddress: contract.logicAddress,
    };
    return proxiedReturnData;
  }

  return baseReturnData;
};

export const DiffDeployedContracts = ({ base, target, onlyShowDiff }: Props) => {
  const sortedNames = [...base.map((c) => c.name), ...target.map((c) => c.name)].sort((a, b) =>
    a.localeCompare(b)
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

        const showDeployedContract = !isEqual || !onlyShowDiff;

        let formattedName: string | JSX.Element = name;
        if (name.includes('Create2 Deployer')) {
          const [first, _] = name.split('Create2 Deployer');
          formattedName = (
            <>
              <div>{first}</div>
              <div>Create2 Deployer</div>
            </>
          );
        }

        return (
          showDeployedContract && (
            <div
              key={name}
              className='grid grid-cols-12 items-center border-b border-zinc-500/10 py-6 dark:border-zinc-500/20'
            >
              <div className='col-span-2'>{formattedName}</div>
              <div className='col-span-5 pr-4'>{formatDeployedContract(baseDeployedContract)}</div>
              <div className='col-span-5'>{formatDeployedContract(targetDeployedContract)}</div>
            </div>
          )
        );
      })}
    </>
  );

  return <RenderDiff content={diffContent} />;
};
