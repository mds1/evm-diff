import { MainnetHardfork } from '@/chains/mainnet/hardforks';
import { CURRENT_MAINNET_HARDFORK } from '@/lib/constants';

export const formatHardfork = (array: string[]): JSX.Element => {
  if (!array || array.length == 0) {
    return <p>No information provided on supported hard forks.</p>;
  }

  const [first, ...rest] = array;
  const last = rest.pop();
  const length = array.length;
  const currentMainnetHardforkName = MainnetHardfork[CURRENT_MAINNET_HARDFORK];
  if (length == 1) {
    return (
      <p className='text-sm'>
        Supported only in <b>{first}</b> hard fork.
      </p>
    );
  } else if (length == CURRENT_MAINNET_HARDFORK + 1 || last === currentMainnetHardforkName) {
    return (
      <p className='text-sm'>
        Supported since <b>{first}</b> hard fork.
      </p>
    );
  }
  return (
    <p className='text-sm'>
      Supported between <b>{first}</b> and <b>{last}</b> hard forks.
    </p>
  );
};
