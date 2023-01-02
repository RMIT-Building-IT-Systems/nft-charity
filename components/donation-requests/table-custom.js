import React from "react";
import * as ethers from "ethers";
import { Button, Breadcrumb, Table } from "antd";
import { complete_columns } from "./data-completeRequests";
import { reject_columns } from "./data-rejectRequests";
import { expire_columns } from "./data-expireRequests";

import useTable from "./useTable";

const columnsTemplate = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        render: (id) => {
            return ethers.utils.formatEther(id) * 10 ** 18;
        },
    },
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
        getIsApproveRequest,
        notificationContextHolder,
    } = useTable();

    // console.log(activeRequests);

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
            key: "timeLeft",
            dataIndex: "dayLast",
            render: (dayLast, record) => {
                // console.log("record :", record.timeCreated);
                // console.log("dayLast: ", dayLast);
                return null;
            },
        },
        {
            title: "",
            key: "",
            dataIndex: "id",
            render: (id) => {
                return !isAdmin ? (
                    <Button disabled={getIsApproveRequest(id)} type="primary">
                        Approve
                    </Button>
                ) : null;
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
        data = table_type === "Completed" ? completedRequests : rejectedRequests;
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
