import { Collapsible } from '@/components/diff/utils/Collapsible';
import { Markdown } from '@/components/diff/utils/Markdown';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
import { Mempool } from '@/types';

type Props = {
  base: Mempool[];
  target: Mempool[];
  onlyShowDiff: boolean;
};

const formatMempool = (contents: Mempool | undefined) => {
  const mempoolPropertiesKeys = [
    'isPrivate',
    'tracksIpAddress',
    'refundsMev',
    'includesFailedTxs',
    'canSpecifyBuilders',
    'isFree',
    'configurable',
    'txLifespan',
    'rateLimit',
    'burstRateLimit',
  ];
  if (!contents) return <p>Not present</p>;
  return (
    <>
      <div>
        <Markdown content={contents.description} />
        <div className='mt-2'>
          <code className='text-xs'>{contents.rpcUrl}</code>
        </div>
      </div>
      <div className='mt-4 text-sm'>
        {mempoolPropertiesKeys.map((key) => {
          const value = contents.properties[key as keyof Mempool['properties']];
          // Return a two column table of the property name and description.
          return (
            <div key={key} className='grid grid-cols-2 space-y-1'>
              <div className='col-span-1'>
                {key === 'isPrivate' && 'Is private'}
                {key === 'tracksIpAddress' && 'Tracks IP Address'}
                {key === 'refundsMev' && 'Refunds MEV'}
                {key === 'includesFailedTxs' && 'Includes failed transactions'}
                {key === 'canSpecifyBuilders' && 'Can specify builders'}
                {key === 'isFree' && 'Is free'}
                {key === 'configurable' && 'Configurable'}
                {key === 'txLifespan' && 'Transaction lifespan'}
                {key === 'rateLimit' && 'Rate limit'}
                {key === 'burstRateLimit' && 'Burst Rate limit'}
              </div>
              <div className='col-span-1'>
                {typeof value === 'undefined' ? 'Unknown' : value ? 'Yes' : 'No'}
              </div>
            </div>
          );
        })}
      </div>

      <div className='mt-4'>
        {!!contents.notes?.length && <Collapsible kind='notes' contents={contents.notes} />}
        <Collapsible kind='references' contents={contents.references} />
      </div>
    </>
  );
};

export const DiffMempools = ({ base, target, onlyShowDiff }: Props) => {
  // Generate a sorted list of all account types from both base and target.
  const sortedMempoolNames = [...base.map((a) => a.name), ...target.map((a) => a.name)].sort(
    (a, b) => a.localeCompare(b)
  );
  const mempoolNames = [...new Set(sortedMempoolNames)];

  const diffContent = (
    <>
      {mempoolNames.map((name) => {
        const baseMempool = base.find((a) => a.name === name);
        const targetMempool = target.find((a) => a.name === name);

        const isEqual = JSON.stringify(baseMempool) === JSON.stringify(targetMempool);
        const showMempool = !isEqual || !onlyShowDiff;

        return (
          showMempool && (
            <div
              key={name}
              className='grid grid-cols-12 items-center border-b border-zinc-500/10 py-6 dark:border-zinc-500/20'
            >
              <div className='col-span-2'>
                <Copyable content={name} />
              </div>
              <div className='col-span-5 pr-4'>{formatMempool(baseMempool)}</div>
              <div className='col-span-5'>{formatMempool(targetMempool)}</div>
            </div>
          )
        );
      })}
    </>
  );

  return <RenderDiff content={diffContent} />;
};
