import { MainnetHardfork } from '@/chains/mainnet/hardforks';
import { Collapsible } from '@/components/diff/utils/Collapsible';
import { Markdown } from '@/components/diff/utils/Markdown';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
import { CURRENT_MAINNET_HARDFORK } from '@/lib/constants';
import { EIP, EIPParameter, EIPState } from '@/types/eip';

type Props = {
  base: EIP[];
  target: EIP[];
  onlyShowDiff: boolean;
};

export const DiffEIPs = ({ base, target, onlyShowDiff }: Props): JSX.Element => {
  if (!Array.isArray(base) || !Array.isArray(target)) return <></>;

  // Generate a sorted list of all eips numbers from both base and target.
  const sortedEIPNumbers = [
    ...base.map((eip) => eip.number),
    ...target.map((eip) => eip.number),
  ].sort((a, b) => a - b);
  const eipNumbers = [...new Set(sortedEIPNumbers)];

  const diffContent = (
    <>
      {eipNumbers.map((number) => {
        const baseEIP = base.find((eip) => eip.number === number);
        const targetEIP = target.find((eip) => eip.number === number);
        if (!baseEIP || !targetEIP) {
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
                <Copyable content={'EIP-' + baseEIP?.number} />
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

const formatEIP = (eip: EIP): JSX.Element => {
  if (!eip) return <p>Not present</p>;
  // TODO: Add parameters
  return (
    <>
      <Markdown className='mb-4' content={eip.title} />
      {formatHardfork(eip.activeHardforks)}
      <div className='text-secondary mt-3 grid grid-cols-4 space-y-1 text-sm'>
        <div className='col-span-2'>Status</div>
        <div className='col-span-2'>{formatEIPState(eip.status)}</div>
        <div className='col-span-2'>Deprecated</div>
        <div className='col-span-2'>{eip.deprecated ? 'Yes' : 'No'}</div>
      </div>
      {eip.parameters && formatParameters(eip.parameters)}
      <div className='mt-4'>
        <Collapsible kind='references' contents={eip.link} />
      </div>
    </>
  );
};

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

const formatHardfork = (array: string[]): JSX.Element => {
  if (array == undefined || array.length == 0) {
    return <p>No information provided on supported hard forks.</p>;
  }

  const length = array.length;
  if (length == CURRENT_MAINNET_HARDFORK + 1) {
    return (
      <p>
        Supported since <b>{array[0]}</b> hard fork.
      </p>
    );
  } else if (length == 1) {
    return (
      <p>
        Supported only in <b>{array[0]}</b> hard fork.
      </p>
    );
  }

  const currentMainnetHardforkName = MainnetHardfork[CURRENT_MAINNET_HARDFORK];
  if (array[length - 1] === currentMainnetHardforkName) {
    return (
      <p>
        Supported since <b>{array[0]}</b> hard fork.
      </p>
    );
  }

  return (
    <p>
      Supported between <b>{array[0]}</b> and <b>{array[length - 1]}</b> hard forks.
    </p>
  );
};

const formatParameters = (params: EIPParameter[]): JSX.Element => {
  if (!Array.isArray(params)) return <></>;
  const contents = (
    <>
      <ul>
        {params.map((p) => (
          <li key={p.name}>
            {p.name}: {p.value.toString()}
          </li>
        ))}
      </ul>
    </>
  );
  return <Collapsible kind='custom' title='Parameters' contents={contents} />;
};
