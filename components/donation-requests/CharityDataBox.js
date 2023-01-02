import { Card, Statistic, Spin } from "antd";

const CharityDataBox = ({ title, loading, prefix, suffix, value }) => {
    return (
        <Card style={{ flex: 1 }}>
            {loading || isNaN(value) ? (
                <Spin />
            ) : (
                <Statistic title={title} value={value} prefix={prefix} suffix={suffix} />
            )}
        </Card>
    );
};

export default CharityDataBox;
