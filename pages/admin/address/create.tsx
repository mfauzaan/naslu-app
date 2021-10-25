import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Button, Form, Select } from "antd";
import React, { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { useApi } from "../../../contexts/api";

export default function CreateAddress({ open = true, setOpen, record, setRecord }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, record: any, setRecord: Dispatch<SetStateAction<any>> }) {
  const [form] = Form.useForm();
  const cancelButtonRef = useRef(null);
  const [islands, setIslands] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { api } = useApi();

  useEffect(() => {
    if (record) {
      form.resetFields();
      form.setFieldsValue({
        ...record,
        island: record.island._id
      })
    } else {
      form.resetFields();
    }

    api.get(`/islands`).then((resp: any) => {
      setIslands(resp.data.data);

      if (record) {
        setIslands([
          ...resp.data.data,
          record.island
        ]);
      }
    });
  }, [open]);

  const okHandler = async () => {
    setLoading(true);
    const values = await form.validateFields();

    try {
      if (record){ 
        await api.patch(`/address/${record._id}`, values);
      } else {
        await api.post("/address", values);
      }

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSearch = async (value) => {
    if (value) {
      api.get(`/islands?search=${value}`).then((resp: any) => {
        setIslands(resp.data.data);
      });
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
        static={true}
      >
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
                        <Dialog.Title className="text-lg font-medium text-white">
                          {record ? 'Update' : 'New'} Address
                        </Dialog.Title>
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
                          <Form.Item
                            name="address"
                            label="Address"
                            rules={[
                              {
                                required: true,
                                message: "Please enter a name",
                              },
                            ]}
                          >
                            <input
                              ref={cancelButtonRef}
                              placeholder="Address"
                              type="text"
                              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            />
                          </Form.Item>

                          <Form.Item
                            name="streetAddress"
                            label="Street Address"
                          >
                            <input
                              placeholder="Street Address"
                              type="text"
                              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            />
                          </Form.Item>

                          <Form.Item
                            name="island"
                            label="Island"
                            rules={[
                              {
                                required: true,
                                message: "Please select an island",
                              },
                            ]}
                          >
                            <Select
                              getPopupContainer={(trigger) =>
                                trigger.parentElement
                              }
                              placeholder="Select a option"
                              allowClear
                              showSearch
                              onSearch={debounce(handleSearch, 200)}
                              filterOption={false}
                              options={islands.map((island) => ({
                                label: `${island.atoll}. ${island.name}`,
                                value: island._id,
                              }))}
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
                    <Button
                      loading={loading}
                      onClick={() => okHandler()}
                      className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </Button>
                  </div>
                </Form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
