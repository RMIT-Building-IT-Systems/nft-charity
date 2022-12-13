import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

export default function Compaigncard({title, cover, description, avatar}){
    return(
        <Card
            style={{ width: 300 }}
            cover={
                <img
                alt="example"
                src={cover}
        />
        }
        actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
        ]}
        >
        <Meta
            avatar={<Avatar src={avatar} />}
            title={title}
            description={description}
        />
        </Card>
    )

}