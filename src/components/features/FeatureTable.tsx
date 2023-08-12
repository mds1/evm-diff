import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { chains } from '@/chains';

export const FeatureTable = ({
  kind,
  name,
  className,
}: {
  kind: string;
  name: string;
  className?: string;
}) => {
  const chainsArray = Object.values(chains);
  const supportData = chainsArray.map((chain) => {
    if (kind === 'opcode') {
      const opcode = chain.opcodes.find((op) => op.name?.toLowerCase() === name.toLowerCase());
      if (!opcode) return undefined;
      return opcode.description?.includes('not supported') ? 'False' : 'True';
    }
  });
  const adjustedChains = chainsArray.map((chain, i) => {
    return { ...chain, supported: supportData[i] };
  });

  // --- Sorting and filtering ---
  const [sortField, setSortField] = useState(null as 'name' | 'col1' | null);
  const [sortDirection, setSortDirection] = useState('ascending');

  const onHeaderClick = (field: 'name' | 'col1') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSortField(field);
      setSortDirection('ascending');
    }
  };

  const sortedChains = adjustedChains.sort((a, b) => {
    // Don't change default sort order if sort field is null.
    if (sortField === null) return 0;
    let aValue: string | number = 0;
    let bValue: string | number = 0;

    if (sortField === 'name') {
      aValue = a.metadata.name.toLowerCase();
      bValue = b.metadata.name.toLowerCase();
    } else if (sortField === 'col1') {
      aValue = a.supported?.toLowerCase() === 'true' ? 0 : 1;
      bValue = b.supported?.toLowerCase() === 'true' ? 0 : 1;
    }

    if (sortDirection === 'ascending') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  return (
    <div className={className}>
      <table className='inline-block overflow-hidden rounded-md border border-zinc-200 shadow-sm dark:border-zinc-600 dark:shadow-md'>
        <thead className='bg-primary'>
          <tr>
            <th
              scope='col'
              className='text-primary py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6'
            >
              <div
                className='group inline-flex cursor-pointer rounded-md p-1 hover:bg-zinc-200 hover:dark:bg-zinc-700'
                onClick={() => onHeaderClick('name')}
              >
                Name
                <span className='text-primary ml-2 flex-none rounded'>
                  <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
                </span>
              </div>
            </th>
            <th scope='col' className='text-primary px-3 py-3.5 text-left text-sm font-semibold'>
              <div
                className='group inline-flex cursor-pointer rounded-md p-1 hover:bg-zinc-200 hover:dark:bg-zinc-700'
                onClick={() => onHeaderClick('col1')}
              >
                Is {name} supported?
                <span className='text-primary ml-2 flex-none rounded'>
                  <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className='cursor-pointer divide-y-0 divide-zinc-200'>
          {sortedChains.map((chain) => (
            <tr key={chain.metadata.id} className='bg-secondary group'>
              <td className='text-primary flex flex-col whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6'>
                {chain.metadata.name}
              </td>
              <td className='text-primary whitespace-nowrap px-3 py-4 text-center text-sm'>
                {chain.supported}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
