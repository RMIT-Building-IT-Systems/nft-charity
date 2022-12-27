import React from "react";
import { Card, Button } from "antd";

const { Meta } = Card;

export default function CampaignCard({ title, cover, duration, price }) {
    return (
        <Card
            // style={{ width: "20%" }}
            cover={<img alt="example" src={cover} />}
            hoverable
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
            {/* <br /> */}
            {/* <div className="addButton">
                <Button style={{height: "40px"}} type="primary" block>
                    Purchase
                </Button>
            </div> */}
        </Card>
    );
}
