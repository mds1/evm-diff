import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
import { CURRENT_MAINNET_HARDFORK } from '@/lib/constants';
import { classNames, formatPrefixByte } from '@/lib/utils';
import { toUppercase } from '@/lib/utils';
import { Example, Opcode, Reference, Variable } from '@/types';
import { GasComputation } from '@/types/opcode';
import { ExternalLink } from '../layout/ExternalLink';

type Props = {
  base: Opcode[];
  target: Opcode[];
  onlyShowDiff: boolean;
};

const formatHardfork = (array: string[]): JSX.Element => {
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

const formatVariables = (title: string, array?: Variable[]): JSX.Element => {
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

const formatVariable = (v: Variable): JSX.Element => {
  return (
    <div key={v.name}>
      <p>
        <span className='text-secondary text-sm'>{v.name}</span>: {v.description}
      </p>
      {v.expression && (
        <>
          <div className='text-secondary text-sm'>
            <h5 className={classNames('font-bold', 'mt-4')}>Sub-variables ({v.name})</h5>
            {v.name} = {v.expression}
            {v.variables && (
              <>
                <ul>{v.variables.map((subvariables) => formatVariable(subvariables))}</ul>
              </>
            )}
          </div>
          <br />
        </>
      )}
    </div>
  );
};

const formatReference = (r: Reference): JSX.Element => {
  return (
    <p className='text-secondary text-sm'>
      <ExternalLink href={r.url} text={r.name ? r.name.toLowerCase() : 'link'} />
    </p>
  );
};

const formatExample = (e: Example, id: number): JSX.Element => {
  const input = e.input ? '[' + e.input.toString() + ']' : '[]';
  const output = '[' + (e.output ? e.output : '') + ']';
  return (
    <>
      <h4 className={classNames('font-bold', 'mt-3')}>Example #{id}</h4>
      {e.description && <p>{e.description}</p>}
      {input} {'=>'} {output}
      {e.memory && (
        <>
          <h5 className={classNames('font-bold', 'mt-4')}>Memory</h5>
          <h6 className={classNames('font-bold', 'mt-5')}>{'>'} Before</h6>
          <p>- Before: {e.memory.before ? e.memory.before : '[]'}</p>
          <h6 className={classNames('font-bold', 'mt-5')}>{'>'} After</h6>
          <p>- After: {e.memory.after ? e.memory.after : '[]'}</p>
        </>
      )}
      {e.storage && (
        <>
          <h5 className={classNames('font-bold', 'mt-4')}>Storage</h5>
          <h6 className={classNames('font-bold', 'mt-5')}>{'>'} Before</h6>
          {e.storage.before && formatStorage(e.storage.before)}
          <h6 className={classNames('font-bold', 'mt-5')}>{'>'} After</h6>
          {e.storage.after && formatStorage(e.storage.after)}
        </>
      )}
      {e.calldata && (
        <>
          <h5 className={classNames('font-bold', 'mt-4')}>Calldata</h5>
          {e.calldata}
        </>
      )}
      {e.code && (
        <>
          <h5 className={classNames('font-bold', 'mt-4')}>Code</h5>
          {e.code}
        </>
      )}
      {e.returndata && (
        <>
          <h5 className={classNames('font-bold', 'mt-4')}>Return Data</h5>
          {e.returndata}
        </>
      )}
    </>
  );
};

const formatStorage = (record: Record<string, string>): JSX.Element => {
  if (!record || record === undefined) return <></>;
  const keyValues: JSX.Element[] = [];
  for (const key in record) {
    keyValues.push(
      <li key={key}>
        {key}: {record[key]}
      </li>
    );
  }
  return <ul>{keyValues}</ul>;
};

const formatGasComputation = (gc: GasComputation | undefined): JSX.Element => {
  if (!gc) return <></>;
  return (
    <>
      <h3 className={classNames('font-bold', 'mt-2')}>Gas Computation</h3>
      <p>The gas cost of the function.</p>
      <p className='text-secondary text-sm'>gas_cost = static_gas_cost + dynamic_gas_cost</p>

      <h4 className={classNames('font-bold', 'mt-4')}>{'>'} Static gas cost</h4>
      {gc.staticGasCost && (
        <>
          <p className={classNames('text-secondary text-sm')}>
            static_gas_cost = {gc.staticGasCost.expression}
          </p>
          {gc.staticGasCost.variables && (
            <>
              <h5 className={classNames('font-bold', 'mt-4')}>Sub-variables (static_gas_cost)</h5>
              <ul>
                {gc.staticGasCost.variables.map((v) => (
                  <li key={v.name}>{formatVariable(v)}</li>
                ))}
              </ul>
            </>
          )}
        </>
      )}

      <h4 className={classNames('font-bold', 'mt-4')}>{'>'} Dynamic gas cost</h4>
      {gc.dynamicGasCost && (
        <>
          <p className={classNames('text-secondary text-sm')}>
            dynamic_gas_cost = {gc.dynamicGasCost.expression}
          </p>
          {gc.dynamicGasCost.variables && (
            <>
              <h5 className={classNames('font-bold', 'mt-4')}>Sub-variables (dynamic_gas_cost)</h5>
              <ul>
                {gc.dynamicGasCost.variables.map((v) => (
                  <li key={v.name}>{formatVariable(v)}</li>
                ))}
              </ul>
            </>
          )}
        </>
      )}

      <h4 className={classNames('font-bold', 'mt-4')}>{'>'} Refunds</h4>
      <p>{gc.refunds}</p>
    </>
  );
};

const formatStringList = (title: string, array: string[] | undefined): JSX.Element => {
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

const formatOpcode = (opcode: Opcode | undefined): JSX.Element => {
  if (!opcode) return <p>Not present</p>;
  return (
    <>
      <p className='mb-4'>{opcode.description}</p>
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
      {formatGasComputation(opcode.gasComputation)}
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

export const DiffOpcodes = ({ base, target, onlyShowDiff }: Props): JSX.Element => {
  if (!Array.isArray(base) || !Array.isArray(target)) return <></>;

  // Generate a sorted list of all opcode numbers from both base and target.
  const sortedOpcodeNumbers = [
    ...base.map((opcode) => opcode.number),
    ...target.map((opcode) => opcode.number),
  ].sort((a, b) => a - b);
  const opcodeNumbers = [...new Set(sortedOpcodeNumbers)];

  const diffContent = (
    <>
      {opcodeNumbers.map((number) => {
        const baseOpcode = base.find((opcode) => opcode.number === number);
        const targetOpcode = target.find((opcode) => opcode.number === number);
        if (!baseOpcode || !targetOpcode) {
          return <></>;
        }

        const isEqual =
          JSON.stringify(convertToComparableOpcode(baseOpcode)) ===
          JSON.stringify(convertToComparableOpcode(targetOpcode));
        const showOpcode = !isEqual || !onlyShowDiff;

        return (
          showOpcode && (
            <div
              key={number}
              className='grid grid-cols-12 items-center border-b border-zinc-500/10 py-6 dark:border-zinc-500/20'
            >
              <div className='col-span-2'>
                <Copyable content={baseOpcode?.name.toLocaleUpperCase()} />
                <Copyable content={formatPrefixByte(baseOpcode?.number)} />
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

// Convert an `Opcode` object to a simpler struct in order to compare it to other opcodes.
// Note: casting an object from a type with properties X, Y and Z to a subset type with properties
// X and Y using the `as` keyword will still retain the field Z unless you explicitly remove it.
// That's why this function exists.
const convertToComparableOpcode = (
  opcode: Opcode
): Omit<Opcode, 'examples' | 'playgroundLink' | 'notes' | 'references'> => {
  return {
    number: opcode.number,
    name: opcode.name,
    description: opcode.description,
    minGas: opcode.minGas,
    gasComputation: opcode.gasComputation,
    inputs: opcode.inputs,
    outputs: opcode.outputs,
    errorCases: opcode.errorCases,
    supportedHardforks: opcode.supportedHardforks,
  };
};
