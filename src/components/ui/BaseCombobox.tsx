import { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '@/lib/utils';

type Option = {
  name: string;
  isHeader?: boolean;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const BaseCombobox = ({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: Option[];
  value: Option;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (opt: any) => void;
  className?: string;
}) => {
  const [query, setQuery] = useState('');
  const [option, setOption] = useState(value);

  useEffect(() => {
    setOption(value);
  }, [value]);

  const filteredOpts =
    query === ''
      ? options
      : options.filter((opt) => {
          return (
            opt.name.toLowerCase().includes(query.toLowerCase()) ||
            (opt.kind && String(opt.kind).toLowerCase().includes(query.toLowerCase()))
          );
        });

  return (
    <Combobox
      as='div'
      className={className}
      value={option}
      onChange={(val) => {
        setOption(val);
        onChange(val);
      }}
    >
      <Combobox.Label className='text-primary block text-sm font-medium leading-6'>
        {label}
      </Combobox.Label>
      <div className='relative mt-2'>
        <Combobox.Input
          className='text-primary bg-primary w-full rounded-md border-0 py-1.5 pl-3 pr-12 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6'
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(opt: Option) => opt.name}
        />

        <Combobox.Button className='absolute right-0 top-2 flex items-center rounded-r-md px-2 focus:outline-none'>
          <ChevronUpDownIcon className='h-5 w-5 text-zinc-400' aria-hidden='true' />
        </Combobox.Button>

        {filteredOpts.length > 0 && (
          <Combobox.Options className='bg-primary z-10 mt-1 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-zinc-1000 ring-opacity-5 focus:outline-none sm:text-sm'>
            {filteredOpts.map((opt, index) => (
              <Combobox.Option
                key={index}
                value={opt}
                disabled={opt.isHeader}
                className={({ active }) =>
                  classNames(
                    'relative cursor-pointer select-none py-2 pl-3 pr-9',
                    active ? 'text-primary bg-green-600/10 dark:bg-green-500/10' : 'text-primary'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className='flex items-center'>
                      <span
                        className={classNames(
                          'ml-3 truncate',
                          selected && 'font-semibold',
                          opt.isHeader ? 'text-secondary ml-0' : ''
                        )}
                      >
                        {opt.name}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-primary' : 'text-green-600'
                        )}
                      >
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};
