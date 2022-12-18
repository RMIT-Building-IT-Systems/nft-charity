const active_columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Recipient',
      key: 'recipient',
      dataIndex: 'recipient',
    },
    {
      title: 'Approvals Count',
      key: 'approvalsCount',
      dataIndex: 'approvalsCount',
    },
    {
      title: 'Declines Count',
      key: 'declinesCount',
      dataIndex: 'declinesCount',
    }
  ];

let active_data = []
while(active_data.length<20)
  active_data = [...active_data,{
    key: active_data.length+1,
    id: active_data.length+1,
    description: "A lucky money from lucky cat",
    value: "0.748 ETH",
    recipient: 'Uzumaki Naruto',
    approvalsCount: 0,
    declinesCount: 0,
  }]


export {active_columns, active_data}