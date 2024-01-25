import { Collapsible } from '@/components/diff/utils/Collapsible';
import { Markdown } from '@/components/diff/utils/Markdown';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
import { EIP, EIPCategory, EIPParameter, EIPState, EIPType } from '@/types/eip';
import { formatHardfork, formatStringList } from './utils/format';

type Props = {
  base: EIP[];
  target: EIP[];
  onlyShowDiff: boolean;
};

export const DiffEIPs = ({ base, target, onlyShowDiff }: Props): JSX.Element => {
  if (!Array.isArray(base) || !Array.isArray(target)) return <></>;

  // Keep the order defined in `eips.ts`.
  const sortedEIPNumbers = [...base.map((eip) => eip.number), ...target.map((eip) => eip.number)];
  const eipNumbers = [...new Set(sortedEIPNumbers)];

  const diffContent = (
    <>
      {eipNumbers.map((number) => {
        const baseEIP = base.find((eip) => eip.number === number);
        const targetEIP = target.find((eip) => eip.number === number);
        if (!baseEIP && !targetEIP) {
          return <></>;
        }

        const isEqual = JSON.stringify(baseEIP) === JSON.stringify(targetEIP);
        const showOpcode = !isEqual || !onlyShowDiff;

        return (
          showOpcode && (
            <div
              key={number}
              className='grid grid-cols-12 items-center border-b border-zinc-500/10 py-6 dark:border-zinc-500/20'
            >
              <div className='col-span-2'>
                <Copyable
                  content={
                    baseEIP
                      ? 'EIP-' + baseEIP.number
                      : targetEIP
                      ? 'EIP-' + targetEIP.number
                      : 'EIP-???'
                  }
                />
              </div>
              <div className='col-span-5 pr-4'>{formatEIP(baseEIP)}</div>
              <div className='col-span-5'>{formatEIP(targetEIP)}</div>
            </div>
          )
        );
      })}
    </>
  );

  return <RenderDiff content={diffContent} />;
};

const formatEIP = (eip: EIP | undefined): JSX.Element => {
  if (!eip) return <p>Missing data for this EIP on this chain.</p>;
  return (
    <>
      <Markdown content={eip.title} />
      {formatHardfork(eip.activeHardforks)}
      <div className='text-secondary mt-3 grid grid-cols-4 space-y-1 text-sm'>
        <div className='col-span-2'>Category</div>
        <div className='col-span-2'>{formatEIPCategory(eip.category)}</div>
        <div className='col-span-2'>Type</div>
        <div className='col-span-2'>{formatEIPType(eip.type)}</div>
        <div className='col-span-2'>Status</div>
        <div className='col-span-2'>{formatEIPState(eip.status)}</div>
        {eip.deprecated && (
          <>
            <div className='col-span-2'>Deprecated</div>
            <div className='col-span-2'>Yes</div>
          </>
        )}
      </div>
      {eip.parameters && formatEIPParameters(eip.parameters)}
      {formatStringList('Notes', eip.notes)}
      <div className='mt-4'>
        <Collapsible kind='references' contents={eip.references} />
      </div>
    </>
  );
};

const formatEIPCategory = (s: EIPCategory): string =>
  s === EIPCategory.Execution
    ? 'Execution'
    : s === EIPCategory.Consensus
    ? 'Consensus'
    : (() => {
        throw new Error(`Unsupported categoy: ${s}`);
      })();

const formatEIPType = (s: EIPType): string =>
  s === EIPType.Core
    ? 'Core'
    : s === EIPType.Networking
    ? 'Networking'
    : s === EIPType.Interface
    ? 'Interface'
    : s === EIPType.ERC
    ? 'ERC'
    : s === EIPType.Meta
    ? 'Meta'
    : s === EIPType.Informational
    ? 'Informational'
    : (() => {
        throw new Error(`Unsupported type: ${s}`);
      })();

const formatEIPState = (s: EIPState): string =>
  s === EIPState.Draft
    ? 'Draft'
    : s === EIPState.Review
    ? 'Review'
    : s === EIPState.LastCall
    ? 'LastCall'
    : s === EIPState.Final
    ? 'Final'
    : s === EIPState.Stagnant
    ? 'Stagnant'
    : s === EIPState.Withdrawn
    ? 'Withdrawn'
    : s === EIPState.Living
    ? 'Living'
    : (() => {
        throw new Error(`Unsupported status: ${s}`);
      })();

const formatEIPParameters = (params: EIPParameter[]): JSX.Element => {
  if (!Array.isArray(params)) return <></>;
  const contents = (
    <>
      <ul className='text-sm'>
        {params.map((p) => (
          <li key={p.name}>
            - {p.name}: {p.value.toString()}
          </li>
        ))}
      </ul>
    </>
  );
  return <Collapsible kind='custom' title='Parameters' contents={contents} />;
};
