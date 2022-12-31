import React from "react";
import * as ethers from "ethers";
import { Button, Breadcrumb, Table } from "antd";
import { active_columns } from "./data-activeRequests";
import { complete_columns } from "./data-completeRequests";
import { reject_columns } from "./data-rejectRequests";
import { expire_columns } from "./data-expireRequests";

import useTable from "./useTable";

const columnsTemplate = [
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Value",
        dataIndex: "value",
        key: "value",
        render: (value) => {
            return ethers.utils.formatEther(value);
        },
    },
    {
        title: "Recipient",
        key: "recipient",
        dataIndex: "recipient",
    },
];

export default function TableCustom({ table_type, isAdmin }) {
    let columns = [];
    const activeColumns = [
        {
            title: "Approvals Count",
            key: "approvalsCount",
            dataIndex: "approvalsCount",
            render: (count) => {
                return parseInt(ethers.utils.formatEther(count));
            },
        },
        {
            title: "Time left",
            key: "",
            dataIndex: "",
            render: (_) => null,
        },
        {
            title: "Actions",
            key: "",
            dataIndex: "",
            render: () => {
                return isAdmin ? <Button type="primary">Approve</Button> : null;
            },
        },
    ];
    if (table_type === "Active") {
        columns = [...columnsTemplate, ...activeColumns];
    } else if (table_type === "Expired") {
        columns = [...expire_columns];
    } else if (table_type === "Completed") {
        columns = [...complete_columns];
    } else {
        columns = [...reject_columns];
    }

    const {
        activeRequests,
        expiredRequests,
        completedRequests,
        rejectedRequests,
        isLoadingActiveTable,
        isLoadingExpiredTable,
        isLoadingCompletedTable,
        isLoadingRejectedTable,
    } = useTable();

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>{table_type.toUpperCase()}</Breadcrumb.Item>
            </Breadcrumb>
            <Table columns={columns} dataSource={activeRequests} loading={isLoadingActiveTable} />
        </>
    );
}
