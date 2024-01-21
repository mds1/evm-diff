import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
import {
  Method,
  MethodExample,
  MethodNamespace,
  MethodVariableType as Type,
  MethodVariable as Variable,
} from '@/types';
import { Collapsible } from './utils/Collapsible';
import { Markdown } from './utils/Markdown';

type Props = {
  base: Method[];
  target: Method[];
  onlyShowDiff: boolean;
};

export const DiffMethods = ({ base, target, onlyShowDiff }: Props) => {
  const sortedMethodNames = [...base.map((n) => n.name), ...target.map((n) => n.name)].sort(
    (a, b) => a.localeCompare(b)
  );
  const methodNames = [...new Set(sortedMethodNames)];

  const diffContent = (
    <>
      {methodNames.map((name) => {
        const baseMethod = base.find((n) => n.name === name);
        const targetMethod = target.find((n) => n.name === name);
        if (!baseMethod && !targetMethod) {
          return <></>;
        }

        const isEqual = JSON.stringify(baseMethod) === JSON.stringify(targetMethod);
        const showNode = !isEqual || !onlyShowDiff;

        return (
          showNode && (
            <div
              key={name}
              className='grid grid-cols-12 items-center border-b border-zinc-500/10 py-6 dark:border-zinc-500/20'
            >
              <div className='col-span-2'>
                <Copyable content={name} />
              </div>
              <div className='col-span-5 pr-4'>{formatMethod(baseMethod)}</div>
              <div className='col-span-5'>{formatMethod(targetMethod)}</div>
            </div>
          )
        );
      })}
    </>
  );

  return <RenderDiff content={diffContent} />;
};

const formatMethod = (method: Method | undefined) => {
  if (!method) return <div>Not present</div>;
  return (
    <>
      <Markdown codeSize='0.9rem' content={method.name} />
      <div className='text-secondary text-sm'>
        <Markdown content={method.description} />
      </div>
      <div className='text-secondary mt-3 grid grid-cols-4 space-y-1 text-sm'>
        <div className='col-span-2'>Namespace</div>
        <div className='col-span-2'>{formatNamespace(method.namespace)}</div>
      </div>
      {method.parameters && formatParameters(method.parameters)}
      <div className='mt-4 text-sm'>
        <Collapsible
          kind='custom'
          title='Return'
          contents={`- ${formatType(method.return.type)}: ${method.return.description}`}
        />
        <br/>
      </div>
      {method.example && formatExample(method.name, method.example)}
      <div className='mt-4'>
        <Collapsible kind='references' contents={method.references} />
      </div>
    </>
  );
};

const formatNamespace = (n: MethodNamespace) =>
  n === MethodNamespace.Web3
    ? 'Web3'
    : n === MethodNamespace.Net
    ? 'Net'
    : n === MethodNamespace.Eth
    ? 'Web3'
    : (() => {
        throw new Error(`Unsupported namespace: ${n}`);
      })();

const formatType = (t: Type): string =>
  t === Type.String
    ? 'String'
    : t === Type.Data
    ? 'Data'
    : (() => {
        throw new Error(`Unsupported type: ${t}`);
      })();

const formatParameters = (params: Variable[]): JSX.Element => {
  if (!Array.isArray(params)) return <></>;
  const contents = (
    <>
      <ul className='text-sm'>
        {params.map((p) => (
          <li key={p.description}>
            - {formatType(p.type)}: {p.description}
          </li>
        ))}
      </ul>
    </>
  );
  return <Collapsible kind='custom' title='Parameters' contents={contents} />;
};

const formatExample = (name: string, example: MethodExample): JSX.Element => {
  const id = 74;
  const version = '2.0';
  const request = `curl -H 'Content-Type: application/json' -d '{"jsonrpc": "${version}", "method": "${name}", "params": [${
    example.parameters === undefined ? '' : example.parameters.map((p) => `"${p}"`).join(', ')
  }], "id": ${id}}' <url>`;
  const result = `{"jsonrpc":"${version}","id":${id},"result":"${example.result}"}`;
  const contents = (
    <code className='text-secondary text-xs'>
      # request
      <br />
      {request}
      <br />
      # result
      <br />
      {result}
    </code>
  );
  return <Collapsible kind='custom' title='Example' contents={contents} />;
};
