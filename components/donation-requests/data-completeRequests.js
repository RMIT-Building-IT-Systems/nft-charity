const complete_columns = [
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

let complete_data = []
while(complete_data.length<8)
  complete_data = [...complete_data,{
    key: complete_data.length+1,
    id: complete_data.length+1,
    description: "A lucky money from lucky cat",
    value: "0.748 ETH",
    recipient: 'Uzumaki Naruto'
  }]


export {complete_columns, complete_data}