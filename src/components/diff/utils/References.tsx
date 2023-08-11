// This component is used to display the references for a section in a diff
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { ParseMarkdown } from '@/components/diff/utils/ParseMarkdown';
import { classNames } from '@/lib/utils';

export const References = ({ references }: { references: string[] }) => {
  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className='flex items-center'>
              References
              <ChevronRightIcon
                className={classNames('h-6 w-6', open ? 'rotate-90 transform' : '')}
              />
            </Disclosure.Button>
            <Disclosure.Panel>
              <ul className='text-ellipses list-disc pl-4 text-sm'>
                {references.map((reference) => {
                  return (
                    <li key={JSON.stringify(reference)} className='list-item'>
                      <ParseMarkdown content={reference} />
                    </li>
                  );
                })}
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};
