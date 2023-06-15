import { CURRENT_MAINNET_HARDFORK } from '@/lib/constants';
import { classNames } from '@/lib/utils';
import { toUppercase } from '@/lib/utils';
import { Example, Opcode, Reference, Variable } from '@/types';
import { ExternalLink } from '../layout/ExternalLink';

type Props = {
  base: Opcode[];
  target: Opcode[];
  onlyShowDiff: boolean;
};

const formatVariables = (title: string, array?: Variable[]) => {
  return (
    <>
      <h3 className={classNames('font-bold', 'mt-2')}>{toUppercase(title)}</h3>
      {array === undefined || array.length === 0 ? (
        <>None</>
      ) : (
        <ul>
          {array.map((v, id) => (
            <li key={id}>{formatVariable(v)}</li>
          ))}
        </ul>
      )}
    </>
  );
};

const formatVariable = (v: Variable) => {
  return (
    <>
      <p>
        <span className='text-secondary text-sm'>{v.name}</span>: {v.description.toLowerCase()}
      </p>
      {v.expression && (
        <>
          <p className='text-secondary text-sm'>
            {v.name} = {v.expression}
          </p>
          <br />
        </>
      )}
    </>
  );
};

const formatExample = (e: Example, id: number) => {
  const input = e.input ? '[' + e.input.toString() + ']' : '[]';
  const output = '[' + (e.output ? e.output : '') + ']';
  return (
    <>
      <h4 className={classNames('font-bold', 'mt-3')}>Example #{id}</h4>
      {input} {'=>'} {output}
      {e.memory && (
        <>
          <p>Memory</p>
          <p>- Before: {e.memory.before ? e.memory.before : '[]'}</p>
          <p>- After: {e.memory.after ? e.memory.after : '[]'}</p>
        </>
      )}
    </>
  );
};

const formatStringList = (title: string, array: string[] | undefined) => {
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

const formatReference = (r: Reference) => {
  return (
    <p className='text-secondary text-sm'>
      <ExternalLink href={r.url} text={r.name ? r.name.toLowerCase() : 'link'} />
    </p>
  );
};

const formatHardfork = (array: string[]) => {
  if (array == undefined || array.length == 0)
    return <p>No information provided on supported hard forks.</p>;
  const length = array.length;
  if (length == CURRENT_MAINNET_HARDFORK + 1)
    return (
      <p>
        Supported since <b>{array[0]}</b> hard fork.
      </p>
    );
  if (length == 1)
    return (
      <p>
        Supported only in <b>{array[0]}</b> hard fork.
      </p>
    );
  return (
    <p>
      Supported between <b>{array[0]}</b> and <b>{array[length - 1]}</b> hard forks.
    </p>
  );
};

const formatOpcode = (opcode: Opcode | undefined) => {
  if (!opcode) return <p>Not present</p>;
  return (
    <>
      {formatHardfork(opcode.supportedHardforks)}
      <p className='text-secondary text-sm'>⛽️ Minimum Gas: {opcode.minGas}</p>
      {formatVariables('Inputs', opcode.inputs)}
      {formatVariables('Outputs', opcode.outputs)}

      {opcode.examples !== undefined && opcode.examples.length > 0 && (
        <>
          <h3 className={classNames('font-bold', 'mt-2')}>Examples</h3>
          <p className='text-secondary text-sm'>
            Stack inputs are shown on the left of the arrow symbol and stack outputs on the right.
          </p>
          {opcode.playgroundLink &&
            formatReference({ name: '>> evm.codes playground link', url: opcode.playgroundLink })}
          <ul>
            {opcode.examples.map((e, id) => (
              <li key={id}>{formatExample(e, id)}</li>
            ))}
          </ul>
        </>
      )}

      {opcode.gasComputation && (
        <>
          <h3 className={classNames('font-bold', 'mt-2')}>
            Gas Computation: {toUppercase(opcode.gasComputation.name)}
          </h3>
          <p>{opcode.gasComputation.description}</p>
          <h4 className={classNames('font-bold', 'mt-3')}>Expression</h4>
          <p className='text-secondary text-sm'>{opcode.gasComputation.expression}</p>
          <h4 className={classNames('font-bold', 'mt-3')}>Variables</h4>
          <ul>
            {opcode.gasComputation.variables.map((v) => (
              <li key={v.name}>{formatVariable(v)}</li>
            ))}
          </ul>
        </>
      )}

      {formatStringList('Error Cases', opcode.errorCases)}
      {formatStringList('Notes', opcode.notes)}
      {opcode.references.length > 0 && (
        <>
          <h3 className={classNames('font-bold', 'mt-2')}>References</h3>
          <ul>
            {opcode.references.map((r, id) => (
              <li key={id}>{formatReference(r)}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export const DiffOpcodes = ({ base, target, onlyShowDiff }: Props) => {
  if (!Array.isArray(base) || !Array.isArray(target)) return <></>;

  // Generate a sorted list of all opcode numbers from both base and target.
  const sortedNumbers = [...base.map((p) => p.number), ...target.map((p) => p.number)].sort(
    (a, b) => a - b
  );
  const opcodeNumbers = [...new Set(sortedNumbers)];

  return (
    <>
      {opcodeNumbers.map((n) => {
        const baseOpcode = base.find((p) => p.number === n);
        const targetOpcode = target.find((p) => p.number === n);

        const isEqual = JSON.stringify(baseOpcode) === JSON.stringify(targetOpcode);
        const showOpcode = !isEqual || !onlyShowDiff;

        return (
          showOpcode && (
            <div
              key={n}
              className='flex items-center justify-between border-b border-zinc-500/10 py-1 dark:border-zinc-500/20'
            >
              <div className='flex-1'>{formatOpcode(baseOpcode)}</div>
              <p className='flex-1 text-center'>
                <p>
                  {baseOpcode?.name} (#{n})
                </p>
                <p className='text-secondary text-sm'>{baseOpcode?.description}</p>
              </p>
              <div className='flex-1'>{formatOpcode(targetOpcode)}</div>
            </div>
          )
        );
      })}
    </>
  );
};
