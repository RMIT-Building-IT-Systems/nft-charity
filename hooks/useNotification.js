import { notification } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export default () => {
    const [api, contextHolder] = notification.useNotification();
    const raiseSuccess = (description) => {
        api.open({
            message: "Success!",
            description: description,
            icon: <CheckCircleOutlined />,
        });
    };
    const raiseFailure = (description) => {
        api.open({
            message: "Error!",
            description: description,
            icon: <CloseCircleOutlined />,
        });
    };
    return { raiseSuccess, raiseFailure, notificationContextHolder: contextHolder };
}