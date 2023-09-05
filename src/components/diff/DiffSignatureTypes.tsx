import { Collapsible } from '@/components/diff/utils/Collapsible';
import { Markdown } from '@/components/diff/utils/Markdown';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
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
      <div>
        <Markdown content={contents.description} />
      </div>
      {contents.signedData?.map((data) => (
        <div key={data} className='text-secondary mb-1 text-sm'>
          <Markdown content={data} />
        </div>
      ))}

      <Collapsible className='mt-4' kind='references' contents={contents.references} />
    </>
  );
};

export const DiffSignatureTypes = ({ base, target, onlyShowDiff }: Props) => {
  // Generate a sorted list of all transaction types from both base and target.
  const allPrefixBytes = [...base.map((t) => t.prefixByte), ...target.map((t) => t.prefixByte)];
  const prefixBytes = [...new Set(allPrefixBytes.sort((a, b) => a - b))];

  const diffContent = (
    <>
      <p className='text-secondary mb-4 text-sm'>
        The <code className='text-xs'>||</code> symbol indicates concatenation
      </p>
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
              <div className='col-span-2'>
                <Copyable content={formatPrefixByte(prefix)} />
              </div>
              <div className='col-span-5 pr-4'>{formatSigType(baseSigType)}</div>
              <div className='col-span-5'>{formatSigType(targetSigType)}</div>
            </div>
          )
        );
      })}
    </>
  );

  return <RenderDiff content={diffContent} />;
};
