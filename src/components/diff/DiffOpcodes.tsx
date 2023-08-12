import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Markdown } from '@/components/diff/utils/Markdown';
import { References } from '@/components/diff/utils/References';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { ExternalLink } from '@/components/layout/ExternalLink';
import { Copyable } from '@/components/ui/Copyable';
import { CURRENT_MAINNET_HARDFORK } from '@/lib/constants';
import { classNames, formatPrefixByte } from '@/lib/utils';
import { toUppercase } from '@/lib/utils';
import { Example, Opcode, Variable } from '@/types';
import { GasComputation } from '@/types/opcode';

type Props = {
  base: Opcode[];
  target: Opcode[];
  onlyShowDiff: boolean;
};

const formatHardfork = (array: string[]): JSX.Element => {
  if (array == undefined || array.length == 0) {
    return <p>No information provided on supported hard forks.</p>;
  }

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
    <div key={v.name} className='text-secondary'>
      <p>
        <code className='text-sm'>{v.name}</code>: <span>{v.description}</span>
      </p>
      {v.expression && (
        <>
          <div className='text-sm'>
            <h5 className='text-primary mt-4 font-semibold'>
              Sub-variables (<code>{v.name}</code>)
            </h5>
            <code>
              {v.name} = {v.expression}
            </code>
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

const formatExamples = (opcode: Opcode): JSX.Element => {
  if (!opcode.examples || opcode.examples.length === 0) return <></>;
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              'flex items-center text-sm',
              open ? 'text-secondary' : 'text-zinc-300 dark:text-zinc-600'
            )}
          >
            Examples
            <ChevronRightIcon
              className={classNames('h-5 w-5', open ? 'rotate-90 transform' : '')}
            />
          </Disclosure.Button>
          <Disclosure.Panel className={open ? 'mb-4' : ''}>
            <div className='text-secondary text-sm'>
              Stack inputs are shown on the left of the arrow symbol and stack outputs on the right.{' '}
              {opcode.playgroundLink && (
                <span>
                  Or,{' '}
                  <ExternalLink className='text-sm' href={opcode.playgroundLink}>
                    try it out
                  </ExternalLink>{' '}
                  on the playground.
                </span>
              )}
            </div>
            <ul>
              {opcode.examples.map((e, id) => (
                <li key={id}>{formatExample(e, id)}</li>
              ))}
            </ul>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const formatExample = (e: Example, id: number): JSX.Element => {
  const input = e.input ? '[' + e.input.toString() + ']' : '[]';
  const output = '[' + (e.output ? e.output : '') + ']';
  return (
    <>
      <h4 className='mt-3 font-semibold'>Example #{id}</h4>
      <div className='ml-3'>
        {e.description && <p>{e.description}</p>}
        <code className='text-secondary text-sm'>
          {input} {'=>'} {output}
        </code>
        {e.memory && (
          <>
            <h5 className='mt-4 font-bold'>Memory</h5>
            <h6 className='text-secondary font-semibold'>Before</h6>
            <code className='text-secondary text-sm'>
              {e.memory.before ? e.memory.before : '[]'}
            </code>
            <h6 className='text-secondary mt-2 font-semibold'>After</h6>
            <code className='text-secondary text-sm'>{e.memory.after ? e.memory.after : '[]'}</code>
          </>
        )}
        {e.storage && (
          <>
            <h5 className='mt-4 font-bold'>Storage</h5>
            <h6 className='text-secondary font-semibold'>Before</h6>
            <code className='text-secondary text-sm'>
              {e.storage.before && formatStorage(e.storage.before)}
            </code>
            <h6 className='text-secondary mt-2 font-semibold'>After</h6>
            <code className='text-secondary text-sm'>
              {e.storage.after && formatStorage(e.storage.after)}
            </code>
          </>
        )}
        {e.calldata && (
          <>
            <h5 className='mt-4 font-bold'>Calldata</h5>
            <code className='text-secondary text-sm'>{e.calldata}</code>
          </>
        )}
        {e.code && (
          <>
            <h5 className='mt-4 font-bold'>Code</h5>
            <code className='text-secondary text-sm'>{e.code}</code>
          </>
        )}
        {e.returndata && (
          <>
            <h5 className='mt-4 font-bold'>Return Data</h5>
            <code className='text-secondary text-sm'>{e.returndata}</code>
          </>
        )}
      </div>
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
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              'flex items-center text-sm',
              open ? 'text-secondary mt-4' : 'text-zinc-300 dark:text-zinc-600'
            )}
          >
            Gas Computation
            <ChevronRightIcon
              className={classNames('h-5 w-5', open ? 'rotate-90 transform' : '')}
            />
          </Disclosure.Button>
          <Disclosure.Panel className={open ? 'mb-4' : ''}>
            <code className='text-secondary text-sm'>
              gas_cost = static_gas_cost + dynamic_gas_cost
            </code>

            <div>
              {gc.staticGasCost && (
                <>
                  <code className='text-secondary text-sm'>
                    static_gas_cost = {gc.staticGasCost.expression}
                  </code>
                  {gc.staticGasCost.variables && (
                    <>
                      <h5 className='mt-4 font-bold'>Sub-variables (static_gas_cost)</h5>
                      <ul>
                        {gc.staticGasCost.variables.map((v) => (
                          <li key={v.name}>{formatVariable(v)}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
              )}
            </div>

            <div>
              {gc.dynamicGasCost && (
                <>
                  <code className='text-secondary text-sm'>
                    dynamic_gas_cost = {gc.dynamicGasCost.expression}
                  </code>
                  {gc.dynamicGasCost.variables && (
                    <>
                      <h5 className='mt-4 font-semibold'>
                        Sub-variables (<code className='text-sm'>dynamic_gas_cost</code>)
                      </h5>
                      <ul>
                        {gc.dynamicGasCost.variables.map((v) => (
                          <li key={v.name}>{formatVariable(v)}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
              )}
            </div>

            <h4 className='mt-3 font-semibold'>Refunds</h4>
            <p className='text-secondary'>{gc.refunds || 'No refunds'}</p>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
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
      <Markdown className='mb-4' content={opcode.description} />
      {formatHardfork(opcode.supportedHardforks)}
      <p className='text-secondary text-sm'>⛽️ Minimum Gas: {opcode.minGas}</p>
      {formatVariables('Inputs', opcode.inputs)}
      {formatVariables('Outputs', opcode.outputs)}
      {formatStringList('Error Cases', opcode.errorCases)}
      {formatStringList('Notes', opcode.notes)}
      <div className='mt-4'>
        {formatExamples(opcode)}
        {formatGasComputation(opcode.gasComputation)}
        <References references={opcode.references} />
      </div>
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
export const convertToComparableOpcode = (
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
