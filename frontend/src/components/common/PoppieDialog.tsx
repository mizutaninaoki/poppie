import { FC, ReactNode, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export type PoppieDialogData = {
  open: boolean;
  onClose: () => void;
  text: {
    title: string;
    content: string | ReactNode;
  };
  leftButton: {
    label: string;
    onClick: () => void;
  };
  rightButton: {
    label: string;
    onClick: () => void;
  };
};

export const PoppieDialog: FC<PoppieDialogData> = ({
  open,
  onClose,
  text,
  leftButton,
  rightButton,
}) => {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-6 px-10 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-bold leading-6 mb-4">
                    {text.title}
                  </Dialog.Title>
                  <div className="mt-2 mb-8">
                    <p className="text-sm text-gray-500 whitespace-pre-wrap break-all">
                      {text.content}
                    </p>
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      className="mr-2 inline-flex justify-center rounded-lg border border-transparent bg-gray-300 px-4 py-2 text-sm font-bold hover:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={leftButton.onClick}
                    >
                      {leftButton.label}
                    </button>
                    <button
                      type="button"
                      className="ml-2 inline-flex justify-center rounded-lg border border-transparent bg-green-600 px-4 py-2 text-sm font-bold text-white hover:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={rightButton.onClick}
                    >
                      {rightButton.label}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
