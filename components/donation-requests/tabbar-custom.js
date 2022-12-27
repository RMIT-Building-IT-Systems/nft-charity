import { Sticky, StickyContainer } from 'react-sticky';
import TableCustom from "./table-custom";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    SyncOutlined,
    WarningOutlined 
} from '@ant-design/icons';
import { Tabs, Button } from 'antd';

export default function TabbarCustom({ isAdmin }) {
    const tab_arra_title = ["Active", "Expired", "Completed", "Rejected"]
    const items = tab_arra_title.map((title, id) => {
        const color = title === "Active" ? "blue" : title ==="Expired" ? "black" : title === "Completed" ? "green" : "red"
        const icon = title === "Active" ? <SyncOutlined spin /> : title ==="Expired" ? <WarningOutlined /> : title === "Complete" ? <CheckCircleOutlined /> : <CloseCircleOutlined />
        return {
            label: <Button style={{fontSize: '1.1em', color:`${color}`}} icon={icon} type="text">
                {title}
            </Button>,
            key: id,
            children: <TableCustom table_type={title} isAdmin={isAdmin} />,
        };
    });
    return (
        <StickyContainer>
            <Tabs tabPosition= 'top' defaultActiveKey="1" items={items} size='large' style={{
          marginLeft: 50,
        }}/>
        </StickyContainer>
    )
}