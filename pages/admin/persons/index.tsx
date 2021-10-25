import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { Space, Spin } from "antd";
import { capitalize } from "lodash";
import moment from "moment";
import Link from "next/link";
import Layout from "../../../components/layout";
import NestedLayout from "../../../components/nested-layout";
import Spinner from "../../../components/spinner";
import Table from "../../../components/table";
import { useApi } from "../../../contexts/api";

export default function PersonList() {
  const { api } = useApi();
  const [loading, setLoading] = useState(true);
  const [persons, setPersons] = useState();

  const columns = [
    {
      title: "Name",
      render: (_, value) => (
        <p>
          {value.firstName} {value.lastName}
        </p>
      ),
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      render: (dob) => <p>{moment(dob).format("DD-MMM-YYYY")}</p>,
    },
    {
      title: "Id Card Number",
      key: "idCardNumber",
      dataIndex: "idCardNumber",
    },
    {
      title: "gender",
      key: "gender",
      dataIndex: "gender",
      render: (gender) => <p>{capitalize(gender)}</p>,
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Edit {record.name}</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    api.get(`/persons`).then((resp: any) => {
      setLoading(false);
      setPersons(resp.data);
    });
  }, []);

  return (
    <Fragment>
      <div className="pb-3 sm:flex sm:items-center sm:justify-end">
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <label htmlFor="mobile-search-candidate" className="sr-only">
            Search
          </label>
          <label htmlFor="desktop-search-candidate" className="sr-only">
            Search
          </label>
          <div className="flex rounded-md shadow-sm space-x-2">
            <div className="relative flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="mobile-search-candidate"
                id="mobile-search-candidate"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-10 sm:hidden border-gray-300"
                placeholder="Search"
              />
              <input
                type="text"
                name="desktop-search-candidate"
                id="desktop-search-candidate"
                className="hidden focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-md pl-10 sm:block sm:text-sm border-gray-300"
                placeholder="Search"
              />
            </div>
            <Link href="/admin/persons/create">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Table columns={columns} loading={loading} records={persons} />
    </Fragment>
  );
}

PersonList.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};
