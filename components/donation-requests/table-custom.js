import React from "react";
import * as ethers from "ethers";
import { Button, Breadcrumb, Table } from "antd";
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

export default function TableCustom({ table_type, isAdmin, donatorsCount }) {
    const {
        activeRequests,
        expiredRequests,
        completedRequests,
        rejectedRequests,
        isLoadingActiveTable,
        isLoadingExpiredTable,
        isLoadingCompletedTable,
        isLoadingRejectedTable,
        approveRequest,
        rejectRequest,
        completeRequest,
        notificationContextHolder,
    } = useTable();

    let columns = [];
    let data = [];
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
            title: "",
            key: "",
            dataIndex: "",
            render: () => {
                return !isAdmin ? <Button type="primary">Approve</Button> : null;
            },
        },
    ];

    const expiredColumns = [
        {
            title: "Approvals Count",
            key: "approvalsCount",
            dataIndex: "approvalsCount",
            render: (count) => {
                return parseInt(ethers.utils.formatEther(count));
            },
        },
        {
            title: "",
            key: "",
            dataIndex: "approvalsCount",
            render: (count, record) => {
                const id = parseInt(ethers.utils.formatEther(record.id));
                return isAdmin && donatorsCount ? (
                    count >= donatorsCount / 2 ? (
                        <Button type="primary">Complete</Button>
                    ) : (
                        <Button type="primary" danger>
                            Reject
                        </Button>
                    )
                ) : null;
            },
        },
    ];

    if (table_type === "Active") {
        columns = [...columnsTemplate, ...activeColumns];
        data = activeRequests;
    } else if (table_type === "Expired") {
        columns = [...columnsTemplate, ...expiredColumns];
        data = expiredRequests;
    } else {
        columns = [...columnsTemplate];
        if (table_type === "Completed") {
            data = completedRequests;
        } else {
            data = rejectedRequests;
        }
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>{table_type.toUpperCase()}</Breadcrumb.Item>
            </Breadcrumb>
            <Table columns={columns} dataSource={data} loading={isLoadingActiveTable} />
        </>
    );
}
