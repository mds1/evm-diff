import { Chain as Metadata } from '@wagmi/chains';
import { getAddress } from 'viem';
import { classNames } from '@/lib/utils';
import { ExternalLink } from '../layout/ExternalLink';

type MetadataKey = keyof Metadata;

type Props = {
  base: Metadata;
  target: Metadata;
  onlyShowDiff: boolean;
};

const toUppercase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const hiddenField = (field: MetadataKey) => {
  return ['network'].includes(field);
};

const formatFieldDisplayName = (field: MetadataKey) => {
  if (field === 'id') return 'Chain ID';
  if (field === 'name') return 'Name';
  if (field === 'nativeCurrency') return 'Native Currency';
  if (field === 'contracts') return 'Multicall3';
  return field;
};

const formatRpcUrls = (data: Metadata['rpcUrls']) => {
  const renderRpcUrls = (rpcUrls: Metadata['rpcUrls']['default']) => (
    <ul>
      {rpcUrls.http.map((url) => (
        <li className='text-secondary text-sm' key={url}>
          {url}
        </li>
      ))}
      {rpcUrls.webSocket &&
        rpcUrls.webSocket.map((url) => (
          <li className='text-secondary text-sm' key={url}>
            {url}
          </li>
        ))}
    </ul>
  );

  return (
    <div>
      {Object.entries(data).map(([key, rpcUrls], index) => (
        <div key={key}>
          <h3 className={classNames('font-bold', index > 0 && 'mt-2')}>{toUppercase(key)}</h3>
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
          <h3 className={classNames('font-bold', index > 0 && 'mt-2')}>{toUppercase(key)}</h3>
          <p className='text-secondary text-sm'>
            <ExternalLink href={blockExplorer.url} text={blockExplorer.url} />
          </p>
        </div>
      ))}
    </div>
  );
};

const formatFieldInfo = (field: MetadataKey, contents: Metadata[MetadataKey]) => {
  if (field === 'id') return contents?.toString();
  if (field === 'name') return contents?.toString();
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
  return (
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
              className='flex items-center justify-between border-b border-zinc-500/10 py-1 dark:border-zinc-500/20'
            >
              <div className='flex-1'>{formatFieldInfo(field, base[field])}</div>
              <div className='flex-1 text-center'>{formatFieldDisplayName(field)}</div>
              <div className='flex-1'>{formatFieldInfo(field, target[field])}</div>
            </div>
          )
        );
      })}
    </>
  );
};
