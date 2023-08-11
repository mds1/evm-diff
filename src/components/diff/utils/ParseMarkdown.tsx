import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ExternalLink } from '@/components/layout/ExternalLink';

export const ParseMarkdown: React.FC<{ content: string }> = ({ content }) => {
  // First we look for any raw GitHub URLs and convert them to named links. For example, given:
  //   https://github.com/OffchainLabs/go-ethereum/blob/dcd0ff9ad8b4c84a9456c6b37f9047233adf7181/core/types/transaction.go#L48
  // It replaces it with:
  //   [OffchainLabs/go-ethereum, `core/types/transaction.go#L48@dcd0ff9`](https://github.com/OffchainLabs/go-ethereum/blob/dcd0ff9ad8b4c84a9456c6b37f9047233adf7181/core/types/transaction.go#L48)
  const transformGitHubURLs = (markdown: string) => {
    const githubURLPattern =
      /(https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/([^#]+)#([^ ]+))/g;
    return markdown.replace(
      githubURLPattern,
      (_match, fullUrl, user, repo, commit, path, _line) => {
        return `[${user}/${repo}, \`${path}@${commit.substring(0, 7)}\`](${fullUrl})`;
      }
    );
  };

  const transformedContent = transformGitHubURLs(content);

  // Now we render the markdown.
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
        code: ({ node: _node, ...props }) => <code {...props} style={{ fontSize: '0.8rem' }} />,
      }}
    >
      {transformedContent}
    </ReactMarkdown>
  );
};
