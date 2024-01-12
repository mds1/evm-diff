import { Chain as Metadata } from '@wagmi/chains';
import { getAddress } from 'viem';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
import { classNames, toUppercase } from '@/lib/utils';
import { ExternalLink } from '../layout/ExternalLink';

type MetadataKey = keyof Metadata;

type Props = {
  base: Metadata;
  target: Metadata;
  onlyShowDiff: boolean;
};

const hiddenField = (field: MetadataKey) => {
  return ['network'].includes(field);
};

const formatFieldDisplayName = (field: MetadataKey) => {
  if (field === 'id') return 'Chain ID';
  if (field === 'name') return 'Name';
  if (field === 'rpcUrls') return 'RPC URLs';
  if (field === 'blockExplorers') return 'Block Explorers';
  if (field === 'nativeCurrency') return 'Native Currency';
  if (field === 'contracts') return 'Multicall3';
  return field;
};

const formatRpcUrls = (data: Metadata['rpcUrls']) => {
  const renderRpcUrls = (rpcUrls: Metadata['rpcUrls']['default']) => (
    <ul>
      {rpcUrls.http.map((url) => (
        <li className='text-secondary text-sm' key={url}>
          <Copyable content={url} />
        </li>
      ))}
      {rpcUrls.webSocket &&
        rpcUrls.webSocket.map((url) => (
          <li className='text-secondary text-sm' key={url}>
            <Copyable content={url} />
          </li>
        ))}
    </ul>
  );

  return (
    <div>
      {Object.entries(data).map(([key, rpcUrls], index) => (
        <div key={key}>
          <h3 className={classNames('font-bold', index > 0 && 'mt-6')}>{toUppercase(key)}</h3>
          {renderRpcUrls(rpcUrls)}
        </div>
      ))}
    </div>
  );
};

const formatBlockExplorerUrls = (data: Metadata['blockExplorers']) => {
  if (!data) return null;
  return (
    <div>
      {Object.entries(data).map(([key, blockExplorer], index) => (
        <div key={key}>
          <h3 className={classNames('font-bold', index > 0 && 'mt-6')}>{toUppercase(key)}</h3>
          <p className='text-secondary text-sm'>
            <ExternalLink href={blockExplorer.url} text={blockExplorer.url} />
          </p>
        </div>
      ))}
    </div>
  );
};

const formatFieldInfo = (field: MetadataKey, contents: Metadata[MetadataKey]) => {
  if (field === 'id') return <Copyable content={contents?.toString() || ''} />;
  if (field === 'name') return <Copyable content={contents?.toString() || ''} />;
  if (field === 'rpcUrls') return formatRpcUrls(contents as Metadata['rpcUrls']);
  if (field === 'blockExplorers') {
    return formatBlockExplorerUrls(contents as Metadata['blockExplorers']);
  }
  if (field === 'nativeCurrency') {
    const c = contents as Metadata['nativeCurrency'];
    return `${c.name} (${c.symbol})`;
  }
  if (field === 'contracts') {
    const c = contents as Metadata['contracts'];
    const multicall3 = c?.multicall3?.address;
    return multicall3 ? getAddress(multicall3) : 'None';
  }
  return JSON.stringify(contents);
};

export const DiffMetadata = ({ base, target, onlyShowDiff }: Props) => {
  const fields = Object.keys(base) as MetadataKey[];
  const diffContent = (
    <>
      {fields.map((field) => {
        if (hiddenField(field)) return null;

        // When comparing the contracts field, we only consider the Multicall3 field. The other
        // fields are around ENS which is just mainnet (and a testnet).
        const isEqual =
          field === 'contracts'
            ? JSON.stringify(base[field]?.multicall3?.address) ===
              JSON.stringify(target[field]?.multicall3?.address)
            : JSON.stringify(base[field]) === JSON.stringify(target[field]);
        const showField = !isEqual || !onlyShowDiff;

        return (
          showField && (
            <div
              key={field}
              className='grid grid-cols-12 items-center border-b border-zinc-500/10 py-6 dark:border-zinc-500/20'
            >
              <div className='col-span-2'>{formatFieldDisplayName(field)}</div>
              <div className='col-span-5 pr-4'>{formatFieldInfo(field, base[field])}</div>
              <div className='col-span-5'>{formatFieldInfo(field, target[field])}</div>
            </div>
          )
        );
      })}
    </>
  );

  return <RenderDiff content={diffContent} />;
};
