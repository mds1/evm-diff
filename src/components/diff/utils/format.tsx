import { MainnetHardfork } from '@/chains/mainnet/hardforks';
import { CURRENT_MAINNET_HARDFORK } from '@/lib/constants';
import { classNames, toUppercase } from '@/lib/utils';

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
