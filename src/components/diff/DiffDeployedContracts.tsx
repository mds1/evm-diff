import { Address, getAddress } from 'viem';
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

const Abi = ({ deployedContract }: { deployedContract: DeployedContract }) => {
  const hasProxyAbi = 'proxyAbi' in deployedContract && deployedContract.proxyAbi.length > 0;
  const hasLogicAbi = 'logicAbi' in deployedContract && deployedContract.logicAbi.length > 0;
  const hasLogicAddress =
    'logicAddress' in deployedContract && deployedContract.logicAddress.length > 0;

  let proxyAbi = <></>;
  let logicAbi = <></>;

  if (!hasProxyAbi) {
    proxyAbi = <p className='text-sm'>ABI not found.</p>;
  } else if (hasProxyAbi) {
    proxyAbi = (
      <ul>
        {deployedContract.proxyAbi.map((sig) => (
          <li key={sig} className='my-2 text-xs'>
            <code>{sig}</code>
          </li>
        ))}
      </ul>
    );
  }

  if (!hasLogicAbi) {
    logicAbi = <p className='text-sm'>ABI not found.</p>;
  } else if (hasLogicAbi) {
    logicAbi = (
      <ul>
        {deployedContract.logicAbi.map((sig) => (
          <li key={sig} className='my-2 text-xs'>
            <code>{sig}</code>
          </li>
        ))}
      </ul>
    );
  }

  const proxyAbiContent = (
    <>
      <div className='font-semibold'>Proxy Contract ABI</div>
      {proxyAbi}
      <div className='mt-4 font-semibold'>Logic Contract ABI</div>
      <div className='text-secondary text-sm'>
        {hasLogicAddress && (
          <div className='mt-2 flex flex-1 items-center'>
            {/* For some reason the text is not horizontally aligned so we manually add some margin to fix it */}
            <div className='mr-1' style={{ marginBottom: '0.2rem' }}>
              Implementation at
            </div>
            <Copyable
              content={formatAddress(deployedContract.logicAddress)}
              textToCopy={deployedContract.logicAddress}
            />
          </div>
        )}
      </div>
      {logicAbi}
    </>
  );

  return (
    <Collapsible kind='custom' contents={hasProxyAbi ? proxyAbiContent : logicAbi} title='ABI' />
  );
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
        <Abi deployedContract={deployedContract} />
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

        console.log('==========');
        console.log(name);
        console.log(
          'convertToComparableContract(baseDeployedContract):',
          convertToComparableContract(baseDeployedContract)
        );
        console.log(
          'convertToComparableContract(targetDeployedContract):',
          convertToComparableContract(targetDeployedContract)
        );
        const isEqual =
          JSON.stringify(convertToComparableContract(baseDeployedContract)) ===
          JSON.stringify(convertToComparableContract(targetDeployedContract));
        console.log('isEqual:', isEqual);
        const showDeployedContract = !isEqual || !onlyShowDiff;

        return (
          showDeployedContract && (
            <div
              key={name}
              className='grid grid-cols-12 items-center border-b border-zinc-500/10 py-6 dark:border-zinc-500/20'
            >
              <div className='col-span-2'>
                <Copyable content={name} textToCopy={name} />
              </div>
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
