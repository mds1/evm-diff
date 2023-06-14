import { pad } from 'viem';
import { SignatureType } from '@/types';

type Props = {
  base: SignatureType[];
  target: SignatureType[];
  onlyShowDiff: boolean;
};

const formatSigType = (contents: SignatureType | undefined) => {
  if (!contents) return <p>Not present</p>;
  return (
    <>
      <p>{contents.description}</p>
      <p className='text-secondary text-sm'>{contents.signedData}</p>
    </>
  );
};

// Returns a hex string with a leading `0x` and padded to 2 characters.
const formatPrefixByte = (prefix: number) => {
  return pad(`0x${prefix.toString(16).toUpperCase()}`, { size: 1 });
};

export const DiffSignatureTypes = ({ base, target, onlyShowDiff }: Props) => {
  // Generate a sorted list of all transaction types from both base and target.
  const allPrefixBytes = [...base.map((t) => t.prefixByte), ...target.map((t) => t.prefixByte)];
  const prefixBytes = [...new Set(allPrefixBytes.sort((a, b) => a - b))];

  return (
    <>
      {prefixBytes.map((prefix) => {
        const baseSigType = base.find((s) => s.prefixByte === prefix);
        const targetSigType = target.find((s) => s.prefixByte === prefix);

        const isEqual = JSON.stringify(baseSigType) === JSON.stringify(targetSigType);
        const showSigType = !isEqual || !onlyShowDiff;

        return (
          showSigType && (
            <div
              key={prefix}
              className='flex items-center justify-between border-b border-zinc-500/10 py-1 dark:border-zinc-500/20'
            >
              <div className='flex-1'>{formatSigType(baseSigType)}</div>
              <div className='flex-1 text-center'>{formatPrefixByte(prefix)}</div>
              <div className='flex-1'>{formatSigType(targetSigType)}</div>
            </div>
          )
        );
      })}
    </>
  );
};
