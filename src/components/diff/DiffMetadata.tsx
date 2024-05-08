import type { Chain } from '@/../script/index';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
import { ExternalLink } from '../layout/ExternalLink';

type Metadata = Chain['metadata'];
type MetadataKey = keyof Metadata;

type Props = {
	base: Metadata;
	target: Metadata;
	onlyShowDiff: boolean;
};

const hiddenField = (field: MetadataKey) => {
	return [
		'networkId',
		'ens',
		'features',
		'icon',
		'slip44',
		'faucets',
		'chain',
		'parent',
		'status',
	].includes(field);
};

const formatFieldDisplayName = (field: MetadataKey) => {
	if (field === 'chainId') return 'Chain ID';
	if (field === 'explorers') return 'Block Explorers';
	if (field === 'name') return 'Name';
	if (field === 'nativeCurrency') return 'Native Currency';
	if (field === 'rpc') return 'RPC URLs';
	if (field === 'shortName') return 'Short Name';
	if (field === 'infoURL') return 'Info URL';
	return field;
};

const formatShortName = (shortName: string, className:string='') => {
	return <Copyable content={shortName.replace(/^['"]|['"]$/g, '')} className={className}/>; // Remove leading and trailing quotes.
};

const formatInfoURL = (infoURL: string, className:string='') => {
	return <ExternalLink href={infoURL} text={infoURL} className={className} />;
};

const formatNativeCurrency = (nativeCurrency: Metadata['nativeCurrency']) => {
	return (
		<>
			<div>
				{nativeCurrency.name} ({nativeCurrency.symbol})
			</div>
			<div className="text-secondary text-sm">{nativeCurrency.decimals} decimals</div>
		</>
	);
};

const formatRpcUrls = (rpcUrls: Metadata['rpc'], className:string='') => {
	return rpcUrls.map((url) => (
		<Copyable className={`text-secondary text-sm ${className}`} key={url} content={url}/>
	));
};

const formatBlockExplorerUrls = (data: Metadata['explorers'], className:string='') => {
	if (!data) return null;
	return (
		<div>
			{Object.entries(data).map(([key, blockExplorer]) => (
				<div key={key} className={`w-full ${className}`}>
					<Copyable
						className="text-secondary text-sm"
						content={<ExternalLink href={blockExplorer.url} text={blockExplorer.url} />}
						textToCopy={blockExplorer.url}
					/>
				</div>
			))}
		</div>
	);
};

const formatFieldInfo = (field: MetadataKey, contents: Metadata[MetadataKey], className:string='') => {	
	if (field === 'chainId') return <Copyable content={contents?.toString() || ''} />;
	if (field === 'name') return <Copyable content={contents?.toString() || ''} />;
	if (field === 'rpc') return formatRpcUrls(contents as Metadata['rpc'], className);
	if (field === 'shortName') return formatShortName(contents as Metadata['shortName'], className);
	if (field === 'infoURL') return formatInfoURL(contents as Metadata['infoURL'], className);
	if (field === 'nativeCurrency')
		return formatNativeCurrency(contents as Metadata['nativeCurrency']);
	if (field === 'explorers') {
		return formatBlockExplorerUrls(contents as Metadata['explorers'], className);
	}
	return JSON.stringify(contents);
};

export const DiffMetadata = ({ base, target, onlyShowDiff }: Props) => {
	const fields = Object.keys(base) as MetadataKey[];
	const diffContent = (
		<>
			{fields.map((field) => {
				if (hiddenField(field)) return null;
				const isEqual = JSON.stringify(base[field]) === JSON.stringify(target[field]);
				const show = !isEqual || !onlyShowDiff;

				if (!show) return false;
				return (
					<div
						key={field}
						className=" max-sm:text-sm grid max-sm:grid-cols-11 grid-cols-12 border-b border-zinc-500/10 py-2 dark:border-zinc-500/20"
					>
						<div className="max-sm:col-span-3 col-span-2 pr-6 break-words">{formatFieldDisplayName(field)}</div>
						<div className="max-sm:col-span-4 col-span-5 pr-4">{formatFieldInfo(field, base[field], 'pb-2')}</div>
						<div className="max-sm:col-span-4 col-span-5">{formatFieldInfo(field, target[field], 'pb-2')}</div>
					</div>
				);
			})}
		</>
	);

	return <RenderDiff content={diffContent} />;
};
