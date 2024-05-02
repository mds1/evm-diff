import type React from 'react';
import ReactMarkdown from 'react-markdown';
import { ExternalLink } from '@/components/layout/ExternalLink';

export const Markdown: React.FC<{ content: string; codeSize?: string; className?: string }> = ({
	content,
	codeSize,
	className,
}) => {
	// --- Transform Content ---
	const transformURLs = (content: string): string => {
		// Define regex patterns for the different types of URLs we want to convert to named links.
		const eipURLPattern = /(https:\/\/eips\.ethereum\.org\/EIPS\/eip-(\d+))/g;
		const evmCodesURLPattern = /(https:\/\/www\.evm\.codes\/#([0-9a-fA-F]{2}))/g;
		const githubIssueURLPattern = /(https:\/\/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+))/g;
		const githubURLPattern =
			/(https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/([^#]+)(?:#([^ ]+))?)/g;

		// Do the conversions.
		let matched = false;
		const transformedContent: string = content
			.replace(eipURLPattern, (_match, fullUrl, number) => {
				matched = true;
				return `[EIP-${number}](${fullUrl})`;
			})
			.replace(evmCodesURLPattern, (_match, fullUrl, opcode) => {
				matched = true;
				return `[evm.codes, opcode \`0x${opcode}\`](${fullUrl})`;
			})
			.replace(githubIssueURLPattern, (_match, fullUrl, user, repo, issueNumber) => {
				matched = true;
				return `[${user}/${repo}, Issue #${issueNumber}](${fullUrl})`;
			})
			.replace(githubURLPattern, (_match, fullUrl, user, repo, commit, path, _line) => {
				matched = true;
				return `[${user}/${repo}, \`${path}@${commit.substring(0, 7)}\`](${fullUrl})`;
			});

		if (matched) {
			return transformedContent;
		}

		// Add a fallback for any URLs that don't match the predefined patterns.
		// We take care to avoid matching URLs that are already included in markdown style.
		const fallbackPattern = /(?<!\]\()https?:\/\/[^\s]+/g;
		return transformedContent.replace(
			fallbackPattern,
			(_match, fullUrl) => `[${fullUrl}](${fullUrl})`,
		);
	};

	const transformedContent = transformURLs(content);

	// --- Render ---
	return (
		<ReactMarkdown
			className={className}
			components={{
				// Make sure all links have the `hyperlink` class, and external links open in a new tab.
				a: ({ href, children }) => {
					if (!href) return <></>;
					const isExternal = href.startsWith('http://') || href.startsWith('https://');
					if (isExternal) return <ExternalLink href={href}>{children}</ExternalLink>;
					return (
						<a className="hyperlink" href={href}>
							{children}
						</a>
					);
				},
				// Make sure all code blocks have a smaller font size because otherwise they look big
				// relative to the text.
				code: ({ node: _node, inline: _inline, ...props }) => (
					<code {...props} style={{ fontSize: codeSize || '0.8rem' }} />
				),
			}}
		>
			{transformedContent}
		</ReactMarkdown>
	);
};
