import { SearchIcon } from "@heroicons/react/outline";
import { Input, Space } from "antd";
import { pickBy } from 'lodash';
import { useRouter } from "next/router";
import React, { Fragment, ReactElement, useEffect, useState } from "react";
import Layout from "../../../components/layout";
import NestedLayout from "../../../components/nested-layout";
import Table from "../../../components/table";
import { useApi } from "../../../contexts/api";
import CreateIsland from "./create";

export default function AddressList() {
  const { api } = useApi();
  const [loading, setLoading] = useState(true);
  const [persons, setPersons] = useState();
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { page = 1, search } = router.query

  const columns = [
    {
      title: "Address",
      width: '40%',
      render: (_, value) => (
        <p>
          {value.address}
        </p>
      ),
    },
    {
      title: "Street Address",
      dataIndex: 'streetAddress',
    },
    {
      title: "Island",
      render: (value) => (
        <p>
          {value.island?.atoll}. {value.island?.name}
        </p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
        </Space>
      ),
    },
  ];

  const handleSearch = e => {
    router.push({
      pathname: '/admin/address',
      query: { search: e.target.value },
    });
  };

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(pickBy(router.query));
    api.get(`/address?page=${page}&${params}`).then((resp: any) => {
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
                onChange={e => !e.target.value && router.push('/admin/address')}
              />
            </div>
              <button
                onClick={() => setOpen(true)}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create
              </button>
          </div>
        </div>
      </div>

      <Table columns={columns} loading={loading} records={persons} />
      <CreateIsland open={open} setOpen={setOpen}/>
    </Fragment>
  );
}

AddressList.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};
