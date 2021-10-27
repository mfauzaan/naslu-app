import * as _ from "lodash";
import Link from "next/link";

import { useRouter } from "next/router";
import { Button, DatePicker, Form, Select } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import Layout from "../../../components/layout";
import NestedLayout from "../../../components/nested-layout";
import { useApi } from "../../../contexts/api";
import { debounce } from "lodash";

export default function CreatePerson({ record }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { api } = useApi();
  const [address, setAddress] = useState<any>([]);
  const [father, setFather] = useState<any>([]);
  const [mother, setMother] = useState<any>([]);
  const { redirectUrl } = router.query

  useEffect(() => {
    if (record) {
      form.resetFields();
      form.setFieldsValue({
        ...record,
        island: record.island._id,
      });
    } else {
      form.resetFields();
    }

    api.get('/address').then((resp: any) => {
      setAddress(resp.data.data);

      if (record) {
        setAddress([...resp.data.data]);
      }
    });

    api.get('/persons?gender=male').then((resp: any) => {
      setFather(resp.data.data);

      if (record) {
        setFather([...resp.data.data]);
      }
    });

    api.get('/persons?gender=female').then((resp: any) => {
      setMother(resp.data.data);

      if (record) {
        setMother([...resp.data.data]);
      }
    });
  }, []);

  const okHandler = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields()

      try {
        if (record) {
          await api.patch(`/persons/${record._id}`, values);
        } else {
          await api.post("/persons", values);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      if (redirectUrl) {
        router.push('/admin/persons')
      } else {
        router.push(redirectUrl as string)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (value) => {
    if (value) {
      api.get(`/address?search=${value}`).then((resp: any) => {
        setAddress(resp.data.data);
      });
    }
  };

  const handleFatherSearch = async (value) => {
    if (value) {
      api.get(`/persons?search=${value}&gender=male`).then((resp: any) => {
        setFather(resp.data.data);
      });
    }
  };

  const handleMotherSearch = async (value) => {
    if (value) {
      api.get(`/persons?search=${value}&gender=female`).then((resp: any) => {
        setMother(resp.data.data);
      });
    }
  };

  return (
    <div className="sm:rounded-lg shadow bg-white px-4 py-5 border-b border-gray-200 sm:px-6 max-w-screen-lg mx-auto">
      <Form
        className="space-y-8 divide-y divide-gray-200"
        layout="vertical"
        requiredMark={false}
        form={form}
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Add New Person
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <div className="w-full md:w-1/4">
                  <Form.Item
                      name="idCardNumber"
                      label="ID Card Number"
                      className="mb-0 pb-0"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a ID card number",
                        },
                      ]}
                    >
                    <div className="flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        A
                      </span>
                      <input
                        placeholder="294400"
                        type="text"
                        className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      />
                    </div>
                  </Form.Item>
                </div>
              </div>
              <div className="sm:col-span-3">
                <Form.Item
                  name="firstName"
                  label="First name"
                  className="mb-0 pb-0"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a last name",
                    },
                  ]}
                >
                  <input
                    type="text"
                    placeholder="First name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </Form.Item>
              </div>

              <div className="sm:col-span-3">
                <Form.Item
                  name="lastName"
                  label="Last name"
                  className="mb-0 pb-0"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a first name",
                    },
                  ]}
                >
                  <input
                    placeholder="Last name"
                    type="text"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </Form.Item>
              </div>

              <div className="sm:col-span-2">
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[
                    {
                      required: true,
                      message: "Please select a gender",
                    },
                  ]}
                >
                  <Select
                    getPopupContainer={(trigger) => trigger.parentElement}
                    placeholder="Select a option"
                    onSearch={debounce(handleSearch, 200)}
                    options={[{
                      value: 'male',
                      label: 'Male'
                    }, {
                      value: 'female',
                      label: 'Female'
                    }]}
                  />
                </Form.Item>
              </div>

              <div className="sm:col-span-2">
                <Form.Item
                  name="dob"
                  label="Birthday"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a birthday",
                    },
                  ]}
                >
                  <DatePicker
                    className="w-full"
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </div>


              <div className="sm:col-span-2">
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: "Please select an Address",
                    },
                  ]}
                >
                  <Select
                    getPopupContainer={(trigger) => trigger.parentElement}
                    placeholder="Select a option"
                    allowClear
                    showSearch
                    onSearch={debounce(handleSearch, 200)}
                    filterOption={false}
                    options={address.map((value) => ({
                      label: `${value.address}`,
                      value: value._id,
                    }))}
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Relatives
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This information is used to map the family tree.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <Form.Item
                  name="father"
                  label="Father"
                >
                  <Select
                    getPopupContainer={(trigger) => trigger.parentElement}
                    placeholder="Select a person"
                    allowClear
                    showSearch
                    onSearch={debounce(handleFatherSearch, 200)}
                    filterOption={false}
                    options={father.map((value) => ({
                      label: `${value.firstName} ${value.lastName}`,
                      value: value._id,
                    }))}
                  />
                </Form.Item>
              </div>
              <div className="sm:col-span-2">
                <Form.Item
                  name="mother"
                  label="Mother"
                >
                  <Select
                    getPopupContainer={(trigger) => trigger.parentElement}
                    placeholder="Select a person"
                    allowClear
                    showSearch
                    onSearch={debounce(handleMotherSearch, 200)}
                    filterOption={false}
                    options={mother.map((value) => ({
                      label: `${value.firstName} ${value.lastName}`,
                      value: value._id,
                    }))}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Link href={redirectUrl as string || '/admin/persons'}>
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </Link>
            <Button
              loading={loading}
              onClick={() => okHandler()}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

CreatePerson.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};
