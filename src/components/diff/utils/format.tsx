import { MainnetHardfork } from '@/chains/mainnet/hardforks';
import { CURRENT_OPTIMISM_HARDFORK, OptimismHardfork } from '@/chains/optimism/hardforks';
import { CURRENT_MAINNET_HARDFORK } from '@/lib/constants';
import { classNames, toUppercase } from '@/lib/utils';

export const formatHardfork = (array: string[]): JSX.Element => {
  if (!array || array.length == 0) {
    return <p>No information provided on supported hard forks.</p>;
  }

  const first = array[0];
  const last = array[array.length - 1];
  const currentMainnetHardforkName = MainnetHardfork[CURRENT_MAINNET_HARDFORK];
  const currentOptimismHardforkName = OptimismHardfork[CURRENT_OPTIMISM_HARDFORK];
  if (array.length == 1) {
    const supportedText =
      first === currentMainnetHardforkName || first === currentOptimismHardforkName
        ? `Supported since ${first} hard fork.`
        : `Supported only in ${first} hard fork.`;
    return (
      <p className='text-sm'>
        <b>{supportedText}</b>
      </p>
    );
  }

  const supportedText =
    last === currentMainnetHardforkName || last === currentOptimismHardforkName
      ? `Supported since ${first} hard fork.`
      : `Supported between ${first} and ${last} hard forks.`;
  return (
    <p className='text-sm'>
      <b>{supportedText}</b>
    </p>
  );
};

export const formatStringList = (title: string, array: string[] | undefined): JSX.Element => {
  if (array === undefined || array.length === 0) return <></>;
  return (
    <>
      <h3 className={classNames('font-bold', 'mt-2')}>{toUppercase(title)}</h3>
      <ul>
        {array.map((v, id) => (
          <li key={id}>{toUppercase(v)}</li>
        ))}
      </ul>
    </>
  );
};
