import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { Input, Space } from "antd";
import { capitalize } from "lodash";
import moment from "moment";
import Link from "next/link";
import Layout from "../../../components/layout";
import NestedLayout from "../../../components/nested-layout";
import Table from "../../../components/table";
import { useApi } from "../../../contexts/api";
import router from "next/router";
import { omit } from 'lodash';

export default function PersonList() {
  const { api } = useApi();
  const [loading, setLoading] = useState(true);
  const [persons, setPersons] = useState();
  const { page = 1, search } = router.query

  const handleSearch = e => {
    router.push({
      pathname: '/admin/persons',
      query: { search: e.target.value },
    });
  };

  const columns = [
    {
      title: "Name",
      render: (_, person) => (
        <Link href={`/admin/persons/${person._id}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
                <span className="font-medium leading-none text-white">{person.firstName[0]}{person.lastName[0]}</span>
              </span>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{person.firstName} {person.lastName}</div>
              <div className="text-sm text-gray-500">{person.idCardNumber}</div>
            </div>
          </div>
        </Link>
      ),
    },
    {
      title: "gender",
      key: "gender",
      dataIndex: "gender",
      render: (gender) => <p className="whitespace-nowrap text-sm text-gray-500">{capitalize(gender)}</p>,
    },
    {
      title: "Birthday",
      dataIndex: "dob",
      render: (dob) => <p>{moment(dob).format("DD-MMM-YYYY")}</p>,
    },
    {
      title: "Address",
      key: "address",
      dataIndex: ['address'],
      render: (address) => (
        <td className="whitespace-nowrap">
          <div className="text-sm text-gray-900">{address.address}</div>
          <div className="text-sm text-gray-500">{address.island}</div>
        </td>
      )
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
    const params = new URLSearchParams(omit(router.query, ['page']));
    api.get(`/persons?page=${page}&${params}`).then((resp: any) => {
      setLoading(false);
      setPersons(resp.data);
    });
  }, [page, search]);

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
              <Input
                className="focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-md  sm:text-sm border-gray-300"
                type="text"
                allowClear
                placeholder="Search"
                defaultValue={search}
                onPressEnter={handleSearch}
                onChange={e => !e.target.value && router.push('/admin/persons')}
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
