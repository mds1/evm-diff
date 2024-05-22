import type { Chain } from '@/../script/index';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
import { ExternalLink } from '@/components/layout/ExternalLink';

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

const FormattedShortName = ({ shortName }: { shortName: string }) => {
	return <Copyable content={shortName.replace(/^['"]|['"]$/g, '')} />; // Remove leading and trailing quotes.
};

const FormattedInfoURL = ({ infoURL }: { infoURL: string }) => {
	return <ExternalLink href={infoURL} text={infoURL} />;
};

const FormattedNativeCurrency = ({
	nativeCurrency,
}: { nativeCurrency: Metadata['nativeCurrency'] }) => {
	return (
		<>
			<div>
				{nativeCurrency.name} ({nativeCurrency.symbol})
			</div>
			<div className="text-secondary text-sm">{nativeCurrency.decimals} decimals</div>
		</>
	);
};

const FormattedRpcUrls = ({ rpcUrls }: { rpcUrls: Metadata['rpc'] }) => {
	return (
		<>
			{rpcUrls.map((url) => (
				<Copyable className="text-secondary text-sm" key={url} content={url} />
			))}
		</>
	);
};

const FormattedBlockExplorerUrls = ({ data }: { data: Metadata['explorers'] }) => {
	if (!data) return null;
	return (
		<div>
			{Object.entries(data).map(([key, blockExplorer]) => (
				<div key={key}>
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

const FormattedFieldInfo = ({
	field,
	contents,
}: { field: MetadataKey; contents: Metadata[MetadataKey] }) => {
	if (field === 'chainId') return <Copyable content={contents?.toString() || ''} />;
	if (field === 'name') return <Copyable content={contents?.toString() || ''} />;
	if (field === 'rpc') return <FormattedRpcUrls rpcUrls={contents as Metadata['rpc']} />;
	if (field === 'shortName')
		return <FormattedShortName shortName={contents as Metadata['shortName']} />;
	if (field === 'infoURL') return <FormattedInfoURL infoURL={contents as Metadata['infoURL']} />;
	if (field === 'nativeCurrency')
		return <FormattedNativeCurrency nativeCurrency={contents as Metadata['nativeCurrency']} />;
	if (field === 'explorers') {
		return <FormattedBlockExplorerUrls data={contents as Metadata['explorers']} />;
	}
	return <>JSON.stringify(contents)</>;
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
						className="grid grid-cols-12 border-b border-zinc-500/10 py-2 dark:border-zinc-500/20"
					>
						<div className="col-span-2">{formatFieldDisplayName(field)}</div>
						<div className="col-span-5 pr-4">
							<FormattedFieldInfo field={field} contents={base[field]} />
						</div>
						<div className="col-span-5">
							<FormattedFieldInfo field={field} contents={target[field]} />
						</div>
					</div>
				);
			})}
		</>
	);

	return <RenderDiff content={diffContent} />;
};
