import React from "react";
import {Button, Space, Typography, Breadcrumb, Table} from 'antd';
import {active_columns, active_data} from "./data-activeRequests";
import {complete_columns, complete_data} from "./data-completeRequests";
import {reject_columns, reject_data} from "./data-rejectRequests";
import {expire_columns, expire_data} from "./data-expireRequests";

export default function TableCustom({table_type, isAdmin}){
    let columns = [], data = []
    if(table_type==='Active'){
        columns = [...active_columns,
            {
            title: 'Action',
            key: 'action',
            render: () => (
                !isAdmin && (
                <Space size="middle">
                <Button type="primary" danger>Approve</Button>
                <Button type="primary">Decline</Button>
                </Space>)
                || (
                    <Space size="middle">
                    <Button type="primary">Complete</Button>
                    <Button type="primary" danger>Reject</Button>
                    </Space>)
            ),
            },
        ];
        data = active_data;
    }
    else if(table_type==='Expired'){
        columns = [...expire_columns];
        data = [...expire_data];
    }
    else if(table_type==='Completed'){
        columns = [...complete_columns];
        data = [...complete_data];
    }
    else{
        columns = [...reject_columns];
        data = [...reject_data];
    }

    return(
        <>
            <Breadcrumb>
    <Breadcrumb.Item>{table_type.toUpperCase()}</Breadcrumb.Item>
  </Breadcrumb>
            <Table columns={columns} dataSource={data} />
        </>
    )
}