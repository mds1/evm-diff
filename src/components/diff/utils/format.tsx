import { MainnetHardfork } from '@/chains/mainnet/hardforks';
import { CURRENT_MAINNET_HARDFORK } from '@/lib/constants';

export const formatHardfork = (array: string[]): JSX.Element => {
  if (array == undefined || array.length == 0) {
    return <p>No information provided on supported hard forks.</p>;
  }

  const length = array.length;
  const currentMainnetHardforkName = MainnetHardfork[CURRENT_MAINNET_HARDFORK];
  if (length == 1) {
    return (
      <p>
        Supported only in <b>{array[0]}</b> hard fork.
      </p>
    );
  } else if (
    length == CURRENT_MAINNET_HARDFORK + 1 ||
    array[length - 1] === currentMainnetHardforkName
  ) {
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
