import * as _ from "lodash";
import Link from "next/link";

import { useRouter } from "next/router";
import { Button, DatePicker, Form, Select } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import Layout from "../../../components/layout";
import NestedLayout from "../../../components/nested-layout";
import { useApi } from "../../../contexts/api";
import { debounce } from "lodash";

const people = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Floyd Miles",
    handle: "floydmiles",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Emily Selman",
    handle: "emilyselman",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Kristin Watson",
    handle: "kristinwatson",
    imageUrl:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function CreatePerson({ record }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { api } = useApi();
  const [address, setAddress] = useState<any>([]);

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

    api.get(`/address`).then((resp: any) => {
      setAddress(resp.data.data);

      if (record) {
        setAddress([...resp.data.data]);
      }
    });
  }, []);

  const okHandler = async () => {
    setLoading(true);
    const values = await form.validateFields()
      .catch(() => setLoading(false));

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
    router.push('/admin/persons')
  };

  const handleSearch = async (value) => {
    if (value) {
      api.get(`/address?search=${value}`).then((resp: any) => {
        setAddress(resp.data.data);
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
              <div className="sm:col-span-1">
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
                  <div className="mt-1 flex rounded-md shadow-sm">
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
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
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
                Family
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Pick up the existing family members
              </p>
            </div>
            <div className="mt-6 w-1/2">
              <div className="flow-root mt-6">
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                  {people.map((person) => (
                    <li key={person.handle} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={person.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {person.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {"@" + person.handle}
                          </p>
                        </div>
                        <div>
                          <a
                            href="#"
                            className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Select
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Link href="/admin/persons">
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
