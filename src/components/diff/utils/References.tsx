// This component is used to display the references for a section in a diff
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { ParseMarkdown } from '@/components/diff/utils/ParseMarkdown';
import { classNames } from '@/lib/utils';

export const References = ({ references }: { references: string[] | string }) => {
  const refs = Array.isArray(references) ? references : [references];

  return (
    <div className='mt-4'>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={classNames(
                'flex items-center text-sm',
                open ? 'text-secondary' : 'text-zinc-300 dark:text-zinc-600'
              )}
            >
              References
              <ChevronRightIcon
                className={classNames('h-5 w-5', open ? 'rotate-90 transform' : '')}
              />
            </Disclosure.Button>
            <Disclosure.Panel>
              <ol className='text-ellipses list-decimal pl-4 text-sm'>
                {refs.map((reference) => {
                  return (
                    <li key={JSON.stringify(reference)} className='list-item'>
                      <ParseMarkdown content={reference} />
                    </li>
                  );
                })}
              </ol>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
