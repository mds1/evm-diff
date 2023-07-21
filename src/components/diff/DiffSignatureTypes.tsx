import { formatPrefixByte } from '@/lib/utils';
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
              className='grid grid-cols-12 items-center border-b border-zinc-500/10 py-6 dark:border-zinc-500/20'
            >
              <div className='col-span-2'>{formatPrefixByte(prefix)}</div>
              <div className='col-span-5 pr-4'>{formatSigType(baseSigType)}</div>
              <div className='col-span-5'>{formatSigType(targetSigType)}</div>
            </div>
          )
        );
      })}
    </>
  );
};
