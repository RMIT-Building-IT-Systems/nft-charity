const expire_columns = [
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
    }
  ];

let expire_data = []
while(expire_data.length<5)
expire_data = [...expire_data,{
    key: expire_data.length+1,
    id: expire_data.length+1,
    description: "A lucky money from lucky cat",
    value: "0.748 ETH",
    recipient: 'Uzumaki Naruto'
  }]


export {expire_columns, expire_data}