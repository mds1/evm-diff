import ReactDiffViewer from 'react-diff-viewer-continued';
import { useTheme } from 'next-themes';

type Props = {
	base: string;
	target: string;
	onlyShowDiff: boolean;
};

const styles = {
	variables: {
		light: {
			addedBackground: '#dafbe1ff',
			addedColor: '#24292e',
			addedGutterBackground: '#cdffd8',
			addedGutterColor: '#212529',
			codeFoldBackground: '#e0f2fe',
			codeFoldContentColor: '#0c4a6e',
			codeFoldGutterBackground: '#dbedff',
			diffViewerBackground: '#fff',
			diffViewerColor: '#212529',
			diffViewerTitleBackground: '#fafbfc',
			diffViewerTitleBorderColor: '#eee',
			diffViewerTitleColor: '#212529',
			emptyLineBackground: '#fafbfc',
			gutterBackground: '#f7f7f7',
			gutterBackgroundDark: '#f3f1f1',
			gutterColor: '#212529',
			highlightBackground: '#fffbdd',
			highlightGutterBackground: '#fff5b1',
			removedBackground: '#ffebe9ff',
			removedColor: '#24292e',
			removedGutterBackground: '#ffdce0',
			removedGutterColor: '#212529',
			wordAddedBackground: '#acf2bd77',
			wordRemovedBackground: '#fecaca77',
		},
		dark: {
			addedBackground: '#2ea04326',
			addedColor: 'white',
			addedGutterBackground: '#034148',
			addedGutterColor: '#8c8c8c',
			codeFoldBackground: '#082f49aa',
			codeFoldContentColor: '#7dd3fcaa',
			codeFoldGutterBackground: '#21232b',
			diffViewerBackground: '#2e303c',
			diffViewerColor: '#fff',
			diffViewerTitleBackground: '#2f323e',
			diffViewerTitleBorderColor: '#353846',
			diffViewerTitleColor: '#555a7b',
			emptyLineBackground: '#27272a',
			gutterBackground: '#18181b',
			gutterBackgroundDark: '#18181b',
			gutterColor: '#464c67',
			highlightBackground: '#2a3967',
			highlightGutterBackground: '#2d4077',
			removedBackground: '#f8514926',
			removedColor: 'white',
			removedGutterBackground: '#632b30',
			removedGutterColor: '#8c8c8c',
			wordAddedBackground: '#2ea04333',
			wordRemovedBackground: '#f8514933',
		},
	},
	// codeFoldContent: {},
	// content: {},
	// emptyLine: {},
	// highlightedGutter: {},
	// line: {},
	// lineNumber: {},
	// marker: {},
	splitView: {},
	// titleBlock: {},
	codeFold: { padding: '0px', margin: '0px' },
	codeFoldGutter: { backgroundColor: 'transparent' },
	// contentText: {},
	diffAdded: { paddingTop: '0px', paddingBottom: '0px', marginTop: '0px', marginBottom: '0px' },
	diffContainer: { backgroundColor: 'transparent' },
	diffRemoved: { paddingTop: '0px', paddingBottom: '0px', marginTop: '0px', marginBottom: '0px' },
	emptyGutter: { padding: '0px', margin: '0px' },
	// gutter: {},
	highlightedLine: { padding: '0px', margin: '0px' },
	wordAdded: { padding: '0px', margin: '0px' },
	wordDiff: { padding: '0px', margin: '0px' },
	wordRemoved: { padding: '0px', margin: '0px' },
};

export const DiffJSON = ({ base, target, onlyShowDiff }: Props): JSX.Element => {
	const { resolvedTheme } = useTheme();
	return (
		<>
			<div className="text-sm">
				<div className="text-secondary mb-2">
					Note that not all chains have the same set of raw data. For example, not all L2s will have
					JSON that clearly indicates its an L2.
				</div>
				<div className="border rounded-xl border-zinc-500/10 py-2 dark:border-zinc-500/20">
					<ReactDiffViewer
						oldValue={base}
						newValue={target}
						splitView={true}
						useDarkTheme={resolvedTheme !== 'light'}
						styles={styles}
						showDiffOnly={onlyShowDiff}
					/>
				</div>
			</div>
		</>
	);
};
