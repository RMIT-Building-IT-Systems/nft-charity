const reject_columns = [
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

let reject_data = []
while(reject_data.length<5)
reject_data = [...reject_data,{
    key: reject_data.length+1,
    id: reject_data.length+1,
    description: "A lucky money from lucky cat",
    value: "0.748 ETH",
    recipient: 'Uzumaki Naruto'
  }]


export {reject_columns, reject_data}