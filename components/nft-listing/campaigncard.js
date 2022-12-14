import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Statistic, Button } from 'antd';

const { Meta } = Card;

export default function Compaigncard({title, cover, duration, price }){
    return(
        <Card
            style={{ width: 300 }}
            cover={
                <img
                alt="example"
                src={cover}
        />
        }
        // actions={[
        //     <SettingOutlined key="setting" />,
        //     <EditOutlined key="edit" />,
        //     <EllipsisOutlined key="ellipsis" />,
        // ]}
        >
        <Meta
            // avatar={<Avatar src={avatar} />}
            title={title}
            description={price}
        />
        <br />
        <div className='countdown'><Statistic.Countdown title={"Ends in second"} value={Date.now() + 1000 * 60 * 60 * 24 * duration}/></div> 
        <div className='addButton'><Button type="primary" block>Add to cart</Button></div>
        </Card>
    )

}