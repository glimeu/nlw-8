import { Popover } from '@headlessui/react';
import { ChatTeardropDots } from 'phosphor-react';

export const Widget = () => {
  return (
    <Popover className="absolute bottom-5 right-5">
      <Popover.Panel>Hello World</Popover.Panel>

      <Popover.Button className="flex items-center h-12 px-3 text-white rounded-full bg-brand-500 group">
        <ChatTeardropDots className="w-6 h-6" />

        <span className="overflow-hidden transition-all duration-500 ease-linear max-w-0 group-hover:max-w-xs">
          <span className="pl-2" />
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  );
};
