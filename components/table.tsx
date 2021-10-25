import React, { useRef } from "react";
import { Table as TableAntd } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router'
import Router from 'next/router'

function Table(props: any) {
  const {
    loading,
    columns,
    pathname,
    records,
    isShow = true,
    ...restOptions
  } = props;
  const router = useRouter()
  const { page } = router.query

  const pageChangeHandler = (pagination: any) => {
    Router.push({
      pathname: pathname,
      query: { page: pagination },
    })

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const Row = ({ index, moveRow, className, style, ...restProps }) => {
    const ref = useRef();

    return (
      <tr
        ref={ref}
        className={`${className} cursor-pointer`}
        style={{ ...style }}
        {...restProps}
      />
    );
  };

  const components = {
    body: {
      row: Row,
    },
  };

  return (
    <>
      <div className="flex flex-col bg-white shadow sm:rounded-lg">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200">
              <TableAntd
                {...restOptions}
                loading={{
                  // delay: 500,
                  spinning: loading,
                  indicator: <LoadingOutlined />,
                }}
                onRow={(record) => {
                  return {
                    onClick: (event) => {
                      // const child = event.target;
                      // const parent = child.parentNode;
                      // const isRow = parent.tagName.match(/tr/i);
                      // if (isShow && (isRow || child.tagName === 'P')) {
                      //   history.push({
                      //     pathname: `${pathname}/${record.id}`,
                      //   });
                      // }
                    }, // click row
                  };
                }}
                components={components}
                columns={columns}
                dataSource={records?.data || records}
                rowKey={(record) => record.id}
                pagination={
                  records?.data
                    ? {
                        showSizeChanger: false,
                        total: records.total,
                        current: Number(page) || 1,
                        pageSize: 30,
                        onChange: pageChangeHandler,
                      }
                    : false
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
