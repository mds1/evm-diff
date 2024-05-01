import { Address, getAddress } from 'viem';
import { evmStackAddresses } from '@/../script/checks/evm-stack-addresses';
import { Chain } from '@/../script/index';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';

type EvmStackResults = Chain['evmStackAddresses'];
type Props = {
  base: EvmStackResults;
  target: EvmStackResults;
  onlyShowDiff: boolean;
};

const formatAddress = (addr: Address) => {
  addr = getAddress(addr);
  return <code>{`${addr.slice(0, 6)}...${addr.slice(-4)}`}</code>;
};

const formatStackHeader = (stack: keyof EvmStackResults) => {
  if (stack === 'OP') return 'OP Stack';
  if (stack === 'Orbit') return 'Orbit';
  return stack;
};

export const DiffEVMStackAddresses = ({ base, target, onlyShowDiff }: Props) => {
  const stacks = Object.keys(evmStackAddresses) as Array<keyof EvmStackResults>;

  const diffContent = (
    <>
      {stacks.map((stack) => {
        const baseStackAddresses = base[stack];
        const targetStackAddresses = target[stack];
        return (
          <div key={stack}>
            <div className='mt-4 text-lg font-bold tracking-wide'>{formatStackHeader(stack)}</div>
            <div>
              {baseStackAddresses.map((baseStackAddress) => {
                const targetStackAddress = targetStackAddresses.find(
                  (p) => getAddress(p.address) === getAddress(baseStackAddress.address)
                );
                const isEqual =
                  JSON.stringify(baseStackAddress) === JSON.stringify(targetStackAddress);
                const show = !isEqual || !onlyShowDiff;

                const name = baseStackAddress?.name || targetStackAddress?.name;
                const addr = getAddress(baseStackAddress.address);
                return (
                  show && (
                    <div
                      key={`${stack}-${addr}`}
                      className='grid grid-cols-12 items-center border-b border-zinc-500/10 py-2 dark:border-zinc-500/20'
                    >
                      <div className='col-span-2'>
                        <div>{name}</div>
                        <Copyable
                          className='text-secondary text-sm'
                          content={formatAddress(addr)}
                          textToCopy={addr}
                        />
                      </div>
                      <div className='col-span-5 pr-4'>
                        {baseStackAddress.exists ? 'Yes' : 'No'}
                      </div>
                      <div className='col-span-5'>{targetStackAddress?.exists ? 'Yes' : 'No'}</div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );

  return <RenderDiff content={diffContent} />;
};
