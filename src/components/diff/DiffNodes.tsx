import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
import { Language, Node, NodeType, SyncStrategy } from '@/types';
import { Collapsible } from './utils/Collapsible';
import { Markdown } from './utils/Markdown';

type Props = {
  base: Node[];
  target: Node[];
  onlyShowDiff: boolean;
};

export const DiffNodes = ({ base, target, onlyShowDiff }: Props) => {
  const sortedNodeNames = [...base.map((n) => n.name), ...target.map((n) => n.name)].sort((a, b) =>
    a.localeCompare(b)
  );
  const nodeNames = [...new Set(sortedNodeNames)];

  const diffContent = (
    <>
      {nodeNames.map((name) => {
        const baseNode = base.find((n) => n.name === name);
        const targetNode = target.find((n) => n.name === name);
        if (!baseNode && !targetNode) {
          return <></>;
        }

        const isEqual = JSON.stringify(baseNode) === JSON.stringify(targetNode);
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
              <div className='col-span-5 pr-4'>{formatNode(baseNode)}</div>
              <div className='col-span-5'>{formatNode(targetNode)}</div>
            </div>
          )
        );
      })}
    </>
  );

  return <RenderDiff content={diffContent} />;
};

const formatNode = (node: Node | undefined) => {
  if (!node) return <div>Not present</div>;
  return (
    <>
      <Markdown codeSize='0.9rem' content={node.name} />
      <div className='text-secondary text-sm'>
        <Markdown content={node.description} />
      </div>
      <div className='text-secondary mt-3 grid grid-cols-4 space-y-1 text-sm'>
        {node.forkOf && (
          <>
            <div className='col-span-2'>Fork of</div>
            <div className='col-span-2'>{node.forkOf}</div>
          </>
        )}
        <div className='col-span-2'>Language</div>
        <div className='col-span-2'>{formatLanguage(node.language)}</div>
        {node.type == NodeType.Execution && node.syncStrategy && formatSyncStrategies(node)}
      </div>
      <div className='mt-4'>
        <Collapsible
          kind='references'
          contents={[`[Repository](${node.repository})`, `[Documentation](${node.documentation})`]}
        />
      </div>
    </>
  );
};

const formatLanguage = (l: Language) => {
  if (l === Language.Java) return 'Java';
  if (l === Language.Go) return 'Go';
  if (l === Language.CSharp) return 'CSharp';
  if (l === Language.Rust) return 'Rust';
  if (l === Language.TypeScript) return 'TypeScript';
  if (l === Language.Nim) return 'Nim';
};

const formatSyncStrategies = (n: Node) => {
  return (
    <>
      <div className='col-span-2'>Sync Strategies</div>
      <div className='col-span-2'>
        {n.syncStrategy && n.syncStrategy.map((s) => formatSyncStrategy(s)!).join(', ')}
      </div>
    </>
  );
};

const formatSyncStrategy = (s: SyncStrategy) => {
  if (s === SyncStrategy.Snap) return 'Snap';
  if (s === SyncStrategy.Full) return 'Full';
  if (s === SyncStrategy.Fast) return 'Fast';
};
