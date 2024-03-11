import React from 'react';
import {
  Button,
  PopoverTrigger,
  Popover,
  PopoverContent,
  Input,
  Kbd,
} from '@nextui-org/react';

interface SaveQueryPopoverProps {
  showPopover: boolean;
  trigger: React.ReactNode;
  saveQueryInputRef: React.RefObject<HTMLInputElement>;
  queryName: string;
  setQueryName: (name: string) => void;
  handleInputKeyDown: (e: React.KeyboardEvent) => void;
}

const SaveQueryPopover: React.FC<SaveQueryPopoverProps> = ({
  showPopover,
  trigger,
  saveQueryInputRef,
  queryName,
  setQueryName,
  handleInputKeyDown,
}) => {
  return (
    <Popover color="default" placement="top" isOpen={showPopover}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>
        <div className="px-2 py-2 w-96 flex flex-col gap-2">
          <div className="flex flex-row gap-1 items-center">
            <span className="text-small font-semibold">Save query as</span>
            <span className="text-neutral-400 text-xs">
              (Press <Kbd keys={['enter']} className="py-0 px-2"></Kbd> to save)
            </span>
          </div>
          <Input
            aria-label="Query name input"
            size="sm"
            label="Name"
            ref={saveQueryInputRef}
            value={queryName}
            onChange={e => setQueryName(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SaveQueryPopover;
