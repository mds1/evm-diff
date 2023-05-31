import { Chain as Metadata } from '@wagmi/chains';
import { getAddress } from 'viem';

type MetadataKey = keyof Metadata;

const showField = (field: MetadataKey) => {
  return !['network', 'rpcUrls', 'blockExplorers'].includes(field);
};

const formatFieldDisplayName = (field: MetadataKey) => {
  if (field === 'id') return 'Chain ID';
  if (field === 'name') return 'Name';
  if (field === 'nativeCurrency') return 'Native Currency';
  if (field === 'contracts') return 'Multicall3';
  return field;
};

const formatFieldInfo = (field: string, contents: Metadata[MetadataKey]) => {
  if (field === 'id') return contents;
  if (field === 'name') return contents;
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

export const MetadataDiff = ({ base, target }: { base: Metadata; target: Metadata }) => {
  const fields = Object.keys(base);
  return (
    <>
      {fields.map((field: string) => {
        const metadataField = field as MetadataKey;
        if (!showField(metadataField)) return null;
        return (
          <div className='flex justify-between border-b border-zinc-500/10 py-1 dark:border-zinc-500/20'>
            <p>{formatFieldInfo(field, base[metadataField])?.toString()}</p>
            <p className='text-center'>{formatFieldDisplayName(metadataField)}</p>
            <p>{formatFieldInfo(field, target[metadataField])?.toString()}</p>
          </div>
        );
      })}
    </>
  );
};
