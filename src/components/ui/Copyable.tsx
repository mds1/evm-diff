import { ClipboardDocumentIcon } from '@heroicons/react/20/solid';
import { classNames, copyToClipboard } from '@/lib/utils';

export const Copyable = ({
  text,
  textToCopy,
  Icon = ClipboardDocumentIcon,
  className = '',
}: {
  text: string;
  textToCopy?: string;
  Icon?: typeof ClipboardDocumentIcon;
  className?: string;
}) => {
  const onCopy = (text: string) => {
    copyToClipboard(text);
  };

  return (
    <div className={classNames('group group relative flex w-max items-center', className)}>
      <div className='relative flex w-full items-center'>
        {text}
        <Icon
          onClick={() => onCopy(textToCopy || text)}
          className='ml-2 h-6 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100'
        />
      </div>
    </div>
  );
};
