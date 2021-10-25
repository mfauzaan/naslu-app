import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid'
import { Form, Input, Select } from 'antd'
import { useApi } from "../../../contexts/api";
const { Option } = Select;

export default function CreateAddress({ open, setOpen }) {
  const [form] = Form.useForm();
  const cancelButtonRef = useRef(null)
  const [islands, setIslands] = useState({});
  const { api } = useApi();

  useEffect(() => {
    form.resetFields()
    api.get(`/islands`).then((resp: any) => {
      setIslands(resp.data);
    });
  }, [open]);
  
  const okHandler = async (id?) => {
    const values = await form.validateFields()
    console.log(values);
  };

  const handleSearch = async (value) => {
    if (value) {
      api.get(`/islands?search=${value}`).then((resp: any) => {
        setIslands(resp.data);
      });
    } else {
      setIslands({});
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" initialFocus={cancelButtonRef} onClose={setOpen} static={true}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 pl-16 max-w-full right-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <Form 
                  className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl" 
                  layout="vertical" 
                  requiredMark={false}
                  form={form}
                  >
                  <div className="flex-1 h-0 overflow-y-auto">
                    <div className="py-6 px-4 bg-indigo-700 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-white">New Address</Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-indigo-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-indigo-300">
                          Get started by filling in the information below
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="px-4 divide-y divide-gray-200 sm:px-6">
                        <div className="space-y-6 pt-6 pb-5">
                          <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                            <input
                              ref={cancelButtonRef}
                              placeholder="Address"
                              autoFocus
                              type="text"
                              name="project-name"
                              id="project-name"
                              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            />
                          </Form.Item>

                          <Form.Item name="atoll" label="Atoll" rules={[{ required: true }]}>
                            <Select
                              getPopupContainer={trigger => trigger.parentElement}
                              placeholder="Select a option"
                              allowClear
                              showSearch
                              onSearch={handleSearch}
                              filterOption={false}
                              options={
                                islands?.data?.map((island) => {
                                    return { value: island.id, label: `${island.atoll}. ${island.name}` }
                                  })
                                }
                            />
                          </Form.Item>

                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="flex-shrink-0 px-4 py-4 flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => okHandler()}
                      type="submit"
                      className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
