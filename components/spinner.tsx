import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd"; // loading components from code split

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={`${className} flex`}>
      <div className="m-auto">
        <Spin indicator={antIcon} size="large" />
      </div>
    </div>
  );
}
