import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { classNames, copyToClipboard } from '@/lib/utils';
import { Tooltip } from './Tooltip';

// When content is a string, `textToCopy` is optional.
interface ContentStringProps {
  content: string;
  textToCopy?: string;
  Icon?: typeof ClipboardDocumentIcon;
  className?: string;
}

// When text is a JSX element, `textToCopy` is required.
interface ContentElementProps {
  content: JSX.Element;
  textToCopy: string;
  Icon?: typeof ClipboardDocumentIcon;
  className?: string;
}

export const Copyable = ({
  content,
  textToCopy,
  Icon = ClipboardDocumentIcon,
  className = '',
}: ContentStringProps | ContentElementProps) => {
  const [isShowing, setIsShowing] = useState(false);

  const onCopy = (text: string) => {
    setIsShowing(true);
    copyToClipboard(text);
    setTimeout(() => setIsShowing(false), 1000);
  };

  return (
    <div className={classNames('group group relative flex w-max items-center', className)}>
      <div className='relative flex w-full items-center'>
        {content}
        <Icon
          onClick={() => onCopy(String(textToCopy || content))}
          className='ml-2 h-4 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100'
        />
      </div>
      <Transition
        show={isShowing}
        enter='transition-opacity duration-75'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Tooltip text='Copied!' showIcon={false} />
      </Transition>
    </div>
  );
};
