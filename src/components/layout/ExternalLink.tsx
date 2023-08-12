type Props = {
  href: string;
  className?: string;
} & (
  | { text: string; children?: never }
  | { text?: never; children: JSX.Element }
  | { text?: never; children: React.ReactNode }
);

export const ExternalLink = ({ href, className, text, children }: Props) => {
  return (
    <a href={href} className={`hyperlink ${className}`} target='_blank' rel='noopener noreferrer'>
      {text || children}
    </a>
  );
};
