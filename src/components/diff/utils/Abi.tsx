import { Address, getAddress } from 'viem';
import { Collapsible } from '@/components/diff/utils/Collapsible';
import { Copyable } from '@/components/ui/Copyable';

const formatAddress = (addr: Address) => {
  addr = getAddress(addr);
  return <code className='text-sm'>{`${addr.slice(0, 6)}...${addr.slice(-4)}`}</code>;
};

type StandardContractAbi = {
  logicAbi: string[];
};

type ProxiedContractAbi = {
  proxyAbi: string[];
  logicAbi: string[];
  logicAddress: Address;
};

type ContractAbi = StandardContractAbi | ProxiedContractAbi;

export const Abi = ({ contract }: { contract: ContractAbi }) => {
  const hasProxyAbi = 'proxyAbi' in contract && contract.proxyAbi.length > 0;
  const hasLogicAbi = 'logicAbi' in contract && contract.logicAbi.length > 0;
  const hasLogicAddress = 'logicAddress' in contract && contract.logicAddress.length > 0;

  let proxyAbi = <></>;
  let logicAbi = <></>;

  if (!hasProxyAbi) {
    proxyAbi = <div className='text-sm'>ABI not found.</div>;
  } else if (hasProxyAbi) {
    proxyAbi = (
      <ul>
        {contract.proxyAbi.map((sig) => (
          <li key={sig} className='my-2 text-xs'>
            <code>{sig}</code>
          </li>
        ))}
      </ul>
    );
  }

  if (!hasLogicAbi) {
    logicAbi = <div className='text-sm'>ABI not found.</div>;
  } else if (hasLogicAbi) {
    logicAbi = (
      <ul>
        {contract.logicAbi.map((sig) => (
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
              content={formatAddress(contract.logicAddress)}
              textToCopy={contract.logicAddress}
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
