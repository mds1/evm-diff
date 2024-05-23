import type { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';
import { SITE_DESCRIPTION } from '@/lib/constants';

export const config = {
	runtime: 'edge',
};

export default async function handler(_request: NextRequest) {
	const getLogoImageData = async () => {
		return await fetch(new URL('public/logo-dark-tight.png', new URL(import.meta.url))).then(
			(res) => res.arrayBuffer(),
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

	return generateDefaultImage();
}
