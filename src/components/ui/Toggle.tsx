import { Switch } from '@headlessui/react';
import { classNames } from '@/lib/utils';

type Props = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  label: string;
};

export const Toggle = ({ enabled, setEnabled, label }: Props) => {
  return (
    <Switch.Group as='div' className='flex items-center'>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? 'bg-green-600' : 'bg-secondary',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out'
        )}
      >
        <span
          aria-hidden='true'
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
      <Switch.Label as='span' className='ml-3 text-sm'>
        <span className='text-gray-500'>{label}</span>
      </Switch.Label>
    </Switch.Group>
  );
};
