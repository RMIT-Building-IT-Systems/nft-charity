import React from "react";
import * as ethers from "ethers";
import { Button, Breadcrumb, Table } from "antd";

import useTable from "./useTable";
import getTimeLeft from "../../utils/frontend/getTimeLeft";

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
        notificationContextHolder,
    } = useTable();

    let columns = [];
    let data = [];
    let loading = false;
    const activeColumns = [
        {
            title: "Approvals Count",
            key: "approvalsCount",
            dataIndex: "approvalsCount",
            render: (count) => {
                return parseInt(ethers.utils.formatEther(count) * 10 ** 18);
            },
        },
        {
            title: "Time left",
            key: "timeLeft",
            dataIndex: "dayLast",
            render: (dayLast, record) => {
                const timeCreated = record.timeCreated;
                const hoursLeft = getTimeLeft(timeCreated, dayLast);
                return <p>{hoursLeft} hrs</p>;
            },
        },
        {
            title: "",
            key: "",
            dataIndex: "id",
            render: (id) => {
                return !isAdmin ? (
                    <Button
                        onClick={() => {
                            approveRequest(id);
                        }}
                        type="primary"
                    >
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
                return parseInt(ethers.utils.formatEther(count) * 10 ** 18);
            },
        },
        {
            title: "",
            key: "",
            dataIndex: "approvalsCount",
            render: (count, record) => {
                const id = record.id;
                return isAdmin && donatorsCount ? (
                    count >= donatorsCount / 2 ? (
                        <Button
                            onClick={() => {
                                completeRequest(id);
                            }}
                            type="primary"
                        >
                            Complete
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                rejectRequest(id);
                            }}
                            type="primary"
                            danger
                        >
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
        loading = isLoadingActiveTable;
    } else if (table_type === "Expired") {
        columns = [...columnsTemplate, ...expiredColumns];
        data = expiredRequests;
        loading = isLoadingExpiredTable;
    } else {
        columns = [...columnsTemplate];
        data = table_type === "Completed" ? completedRequests : rejectedRequests;
        loading = table_type === "Completed" ? isLoadingCompletedTable : isLoadingRejectedTable;
    }

    return (
        <>
            {notificationContextHolder}
            <Breadcrumb>
                <Breadcrumb.Item>{table_type.toUpperCase()}</Breadcrumb.Item>
            </Breadcrumb>
            <Table columns={columns} dataSource={data} loading={loading} />
        </>
    );
}
