import { Address, getAddress } from 'viem';
import { Abi } from '@/components/diff/utils/Abi';
import { Collapsible } from '@/components/diff/utils/Collapsible';
import { Markdown } from '@/components/diff/utils/Markdown';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
import { Predeploy } from '@/types';

type Props = {
  base: Predeploy[];
  target: Predeploy[];
  onlyShowDiff: boolean;
};

const formatPredeploy = (predeploy: Predeploy | undefined) => {
  if (!predeploy) return <p>Not present</p>;
  return (
    <>
      <div>
        <Markdown codeSize='0.9rem' content={predeploy.name} />
      </div>
      <div className='text-secondary text-sm'>
        <Markdown content={predeploy.description} />
      </div>
      <div className='mt-4'>
        <Abi contract={predeploy} />
        <Collapsible kind='references' contents={predeploy.references} />
      </div>
    </>
  );
};

const formatAddress = (addr: Address) => {
  addr = getAddress(addr);
  return <code className='text-sm'>{`${addr.slice(0, 6)}...${addr.slice(-4)}`}</code>;
};

export const DiffPredeploys = ({ base, target, onlyShowDiff }: Props) => {
  // Generate a sorted list of all predeploys from both base and target.
  const sortedAddrs = [
    ...base.map((p) => getAddress(p.address)),
    ...target.map((p) => getAddress(p.address)),
  ].sort((a, b) => a.localeCompare(b));
  const predeployAddrs = [...new Set(sortedAddrs)];

  const diffContent = (
    <>
      {predeployAddrs.map((addr) => {
        const basePredeploy = base.find((p) => getAddress(p.address) === addr);
        const targetPredeploy = target.find((p) => getAddress(p.address) === addr);

        const isEqual = JSON.stringify(basePredeploy) === JSON.stringify(targetPredeploy);
        const showPredeploy = !isEqual || !onlyShowDiff;

        return (
          showPredeploy && (
            <div
              key={addr}
              className='grid grid-cols-12 items-center border-b border-zinc-500/10 py-6 dark:border-zinc-500/20'
            >
              <div className='col-span-2'>
                <Copyable content={formatAddress(addr)} textToCopy={addr} />
              </div>
              <div className='col-span-5 pr-4'>{formatPredeploy(basePredeploy)}</div>
              <div className='col-span-5'>{formatPredeploy(targetPredeploy)}</div>
            </div>
          )
        );
      })}
    </>
  );

  return <RenderDiff content={diffContent} />;
};
