import { Chain } from '@/../script/index';
import { Collapsible } from '@/components/diff/utils/Collapsible';
import { Markdown } from '@/components/diff/utils/Markdown';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { ExternalLink } from '@/components/layout/ExternalLink';
import { Copyable } from '@/components/ui/Copyable';
import { classNames, formatPrefixByte } from '@/lib/utils';
import { toUppercase } from '@/lib/utils';
import { GasComputation } from '@/types/opcode';
import { formatHardfork, formatStringList } from './utils/format';

type Opcodes = Chain['opcodes'];
type Opcode = Opcodes[0];

type Props = {
  base: Opcodes;
  target: Opcodes;
  onlyShowDiff: boolean;
};

const formatOpcode = (opcode: Opcode | undefined): JSX.Element => {
  return (
    <div>{opcode?.supported === 'unknown' ? 'Unknown' : opcode?.supported ? 'Yes' : 'No'}</div>
  );
};

export const DiffOpcodes = ({ base, target, onlyShowDiff }: Props): JSX.Element => {
  if (!Array.isArray(base) || !Array.isArray(target)) return <></>;

  const opcodeNumbers = Array.from(Array(0xff + 1).keys());

  const diffContent = (
    <>
      {opcodeNumbers.map((number) => {
        const baseOpcode = base.find((opcode) => Number(opcode.number) === number);
        const targetOpcode = target.find((opcode) => Number(opcode.number) === number);
        if (!baseOpcode || !targetOpcode) {
          return false;
        }

        const isEqual = JSON.stringify(baseOpcode) === JSON.stringify(targetOpcode);
        const showOpcode = !isEqual || !onlyShowDiff;

        return (
          showOpcode && (
            <div
              key={number}
              className='grid grid-cols-12 items-center border-b border-zinc-500/10 py-2 dark:border-zinc-500/20'
            >
              <div className='col-span-2'>
                <Copyable content={baseOpcode?.name.toLocaleUpperCase()} />
                <Copyable content={formatPrefixByte(Number(baseOpcode?.number))} />
              </div>
              <div className='col-span-5 pr-4'>{formatOpcode(baseOpcode)}</div>
              <div className='col-span-5'>{formatOpcode(targetOpcode)}</div>
            </div>
          )
        );
      })}
    </>
  );

  return <RenderDiff content={diffContent} />;
};
