import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ExternalLink } from '@/components/layout/ExternalLink';

export const ParseMarkdown: React.FC<{ content: string; codeSize?: string }> = ({
  content,
  codeSize,
}) => {
  // --- Transform Content ---
  const transformURLs = (content: string) => {
    // Define regex patterns for the different types of URLs we want to convert to named links.
    const eipURLPattern = /(https:\/\/eips\.ethereum\.org\/EIPS\/eip-(\d+))/g;
    const evmCodesURLPattern = /(https:\/\/www\.evm\.codes\/#([0-9a-fA-F]{2}))/g;
    const githubIssueURLPattern = /(https:\/\/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+))/g;
    const githubURLPattern =
      /(https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/([^#]+)(?:#([^ ]+))?)/g;

    // Do the conversions.
    return content
      .replace(eipURLPattern, (_match, fullUrl, number) => `[EIP-${number}](${fullUrl})`)
      .replace(evmCodesURLPattern, (_match, fullUrl, opcode) => {
        return `[evm.codes, opcode \`0x${opcode}\`](${fullUrl})`;
      })
      .replace(githubIssueURLPattern, (_match, fullUrl, user, repo, issueNumber) => {
        return `[${user}/${repo}, Issue #${issueNumber}](${fullUrl})`;
      })
      .replace(githubURLPattern, (_match, fullUrl, user, repo, commit, path, _line) => {
        return `[${user}/${repo}, \`${path}@${commit.substring(0, 7)}\`](${fullUrl})`;
      });
  };

  const transformedContent = transformURLs(content);

  // --- Render ---
  return (
    <ReactMarkdown
      components={{
        // Make sure all links have the `hyperlink` class, and external links open in a new tab.
        a: ({ href, children }) => {
          if (!href) return <></>;
          const isExternal = href.startsWith('http://') || href.startsWith('https://');
          if (isExternal) return <ExternalLink href={href}>{children}</ExternalLink>;
          return (
            <a className='hyperlink' href={href}>
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
