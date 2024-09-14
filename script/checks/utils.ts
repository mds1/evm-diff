import { sleep } from 'bun';
import type { PublicClient } from 'viem';

async function retryOnRateLimit<T>(
	fn: () => Promise<T>,
	maxRetries = 5,
	initialDelay = 1000,
): Promise<T> {
	let retries = 0;
	while (retries < maxRetries) {
		try {
			return await fn();
		} catch (error) {
			if (error instanceof Error && error.message.includes('429') && retries < maxRetries) {
				const delay = initialDelay * 2 ** retries;
				await sleep(delay);
				retries++;
			} else {
				throw error;
			}
		}
	}
	throw new Error('Max retries reached');
}

export function createRetryClient(client: PublicClient): PublicClient {
	return new Proxy(client, {
		get(target, prop, receiver) {
			const originalMethod = Reflect.get(target, prop, receiver);
			if (typeof originalMethod === 'function') {
				return (...args: unknown[]) => retryOnRateLimit(() => originalMethod.apply(target, args));
			}
			return originalMethod;
		},
	});
}
