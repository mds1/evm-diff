import type { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';
import { getAddress } from 'viem';
import { getChainById } from '@/chains';
import { SITE_DESCRIPTION } from '@/lib/constants';
import type { Chain, Opcode, Precompile, Predeploy, SignatureType } from '@/types';

export const config = {
	runtime: 'edge',
};

type Comparator<T> = (a: T, b: T) => boolean;
type ObjectKeyExtractor<T> = (item: T) => string | number;

function countDifferences<T>(
	base: T[],
	target: T[],
	getKey: ObjectKeyExtractor<T>,
	isEqual: Comparator<T>,
): number {
	const sortedKeys = [...base.map(getKey), ...target.map(getKey)].sort((a, b) => {
		if (typeof a === 'string' && typeof b === 'string') {
			return a.localeCompare(b);
		}
		if (typeof a === 'number' && typeof b === 'number') {
			return a - b;
		}
		throw new Error('Invalid key types for sorting.');
	});
	const keys = [...new Set(sortedKeys)];

	return keys.reduce((acc: number, key: string | number) => {
		let count = acc;
		const baseItem = base.find((item) => getKey(item) === key);
		const targetItem = target.find((item) => getKey(item) === key);
		if (!baseItem || !targetItem) {
			count++;
			return count;
		}

		if (!isEqual(baseItem, targetItem)) {
			count++;
		}
		return count;
	}, 0);
}

const countPrecompilesDiff = (base: Precompile[], target: Precompile[]): number => {
	const getKey = (p: Precompile) => getAddress(p.address);
	const isEqual = (a: Precompile, b: Precompile) => JSON.stringify(a) === JSON.stringify(b);
	return countDifferences(base, target, getKey, isEqual);
};

const countPredeployDiffs = (base: Predeploy[], target: Predeploy[]): number => {
	const getKey = (p: Predeploy) => getAddress(p.address);
	const isEqual = (a: Predeploy, b: Predeploy) => JSON.stringify(a) === JSON.stringify(b);
	return countDifferences(base, target, getKey, isEqual);
};

const countOpcodeDiffs = (base: Opcode[], target: Opcode[]): number => {
	const getKey = (o: Opcode) => o.number;
	const isEqual = (a: Opcode, b: Opcode) => JSON.stringify(a) === JSON.stringify(b);
	return countDifferences(base, target, getKey, isEqual);
};

const countSignatureTypeDiffs = (base: SignatureType[], target: SignatureType[]): number => {
	const getKey = (s: SignatureType) => s.prefixByte;
	const isEqual = (a: SignatureType, b: SignatureType) => JSON.stringify(a) === JSON.stringify(b);
	return countDifferences(base, target, getKey, isEqual);
};

export default async function handler(request: NextRequest) {
	const getLogoImageData = async () => {
		return await fetch(new URL('public/logo-dark-tight.png', import.meta.url)).then((res) =>
			res.arrayBuffer(),
		);
	};
	const generateDefaultImage = async () => {
		const imageData = await getLogoImageData();
		return new ImageResponse(
			<div
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#f4f4f5',
				}}
			>
				<h2
					style={{
						fontSize: 100,
					}}
				>
					{/*
               Temporarily disable eslint: warnings around using `img` over the NextImage, and TS
               errors with `Type 'ArrayBuffer' is not assignable to type 'string'`, but this does
               works and is recommended in the NextJS docs: https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation/og-image-examples#using-a-local-image
             */}
					{/* eslint-disable */}
					{/* @ts-ignore */}
					<img width="400" src={imageData} />
					{/* eslint-enable */}
				</h2>
				<p
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: 34,
					}}
				>
					<p>{SITE_DESCRIPTION}</p>
				</p>
			</div>,
			{
				width: 1200,
				height: 630,
			},
		);
	};

	const generateDiffImage = async (baseChain: Chain, targetChain: Chain) => {
		const imageData = await getLogoImageData();

		const precompileDiffs = countPrecompilesDiff(baseChain.precompiles, targetChain.precompiles);
		const predeployDiffs = countPredeployDiffs(baseChain.predeploys, targetChain.predeploys);
		const opcodeDiffs = countOpcodeDiffs(
			baseChain.opcodes as Opcode[],
			targetChain.opcodes as Opcode[],
		);
		const signatureTypeDiffs = countSignatureTypeDiffs(
			baseChain.signatureTypes,
			targetChain.signatureTypes,
		);
		const totalDiffs = precompileDiffs + predeployDiffs + opcodeDiffs + signatureTypeDiffs;

		return new ImageResponse(
			<div
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#f4f4f5',
					paddingTop: '50px',
				}}
			>
				{/*
            Temporarily disable eslint: warnings around using `img` over the NextImage, and TS
            errors with `Type 'ArrayBuffer' is not assignable to type 'string'`, but this does
            works and is recommended in the NextJS docs: https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation/og-image-examples#using-a-local-image
          */}
				{/* eslint-disable */}
				{/* @ts-ignore */}
				<img width="400" src={imageData} />
				{/* eslint-enable */}
				<p style={{ fontSize: 34, paddingTop: '40px' }}>
					{`${totalDiffs} difference${totalDiffs !== 1 ? 's' : ''} between ${
						baseChain.metadata.name
					} and ${targetChain.metadata.name}`}
				</p>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						fontSize: 24,
						lineHeight: 1.5,
					}}
				>
					<ul
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<li>{`Precompiles: ${precompileDiffs} differences`}</li>
						<li>{`Predeploys: ${predeployDiffs} differences`}</li>
						<li>{`Opcodes: ${opcodeDiffs} differences`}</li>
						<li>{`SignatureTypes: ${signatureTypeDiffs} differences`}</li>
					</ul>
				</div>
			</div>,
			{
				width: 1200,
				height: 630,
			},
		);
	};

	try {
		const { searchParams } = request.nextUrl;
		const base = searchParams.get('base'); // ?base=<base>
		const target = searchParams.get('target')?.slice(0, 100); // ?target=<target>
		if (!base || !target) return generateDefaultImage();

		const baseChain = getChainById(base as string);
		if (baseChain === undefined) return generateDefaultImage();

		const targetChain = getChainById(target as string);
		if (targetChain === undefined) return generateDefaultImage();

		return await generateDiffImage(baseChain, targetChain);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		console.log(`OG image generation failed with error: ${e.message}`);
		return generateDefaultImage();
	}
}
