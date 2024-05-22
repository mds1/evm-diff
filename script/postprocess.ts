import { readdir, unlink } from 'node:fs/promises';
import { join } from 'node:path';

const DATA_PATH = join(import.meta.dir, 'data', 'chain');
const FEATURE_PATH = join(import.meta.dir, 'data', 'feature');

async function main() {
	// Delete all feature/*.json files
	const featureFiles = await readdir(FEATURE_PATH);
	const featureJsonFiles = featureFiles.filter((file) => file.endsWith('.json'));
	for (const file of featureJsonFiles) {
		await unlink(join(FEATURE_PATH, file));
	}

	const eth = await Bun.file(join(DATA_PATH, '1.json')).json(); // Source of truth for available keys.
	const keys = Object.keys(eth);

	const allFiles = await readdir(DATA_PATH);
	const jsonFiles = allFiles.filter((file) => file.endsWith('.json'));

	for (const key of keys) {
		const dataOut: Record<number, object> = {};

		for (const file of jsonFiles) {
			const dataIn = await Bun.file(join(DATA_PATH, file)).json();
			const chainId = dataIn.metadata.chainId;
			dataOut[chainId] = dataIn[key];
		}

		const outfile = join(FEATURE_PATH, `${key}.json`);
		await Bun.write(outfile, JSON.stringify(dataOut));
	}
}

main().catch((error) => {
	console.error('An error occurred:', error);
	process.exit(1);
});
