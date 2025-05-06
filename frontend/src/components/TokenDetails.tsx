import React from "react";
import { Card, Descriptions, Tag, Typography } from "antd";
import {
  KeyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

interface TokenDetailsProps {
  token: string;
  expiryDate: string;
  expiryTime: string;
  status: "active" | "expired";
}

const TokenDetails: React.FC<TokenDetailsProps> = ({
  token,
  expiryDate,
  expiryTime,
  status,
}) => {
  return (
    <Card style={{ maxWidth: 600, margin: "20px auto" }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        Token Information
      </Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item
          label={
            <>
              <KeyOutlined /> Token
            </>
          }
        >
          <Tag color="blue">{token}</Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <ClockCircleOutlined /> Expiry Date & Time
            </>
          }
        >
          {expiryDate} at {expiryTime}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <CheckCircleOutlined /> Status
            </>
          }
        >
          <Tag color={status === "active" ? "success" : "error"}>
            {status.toUpperCase()}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default TokenDetails;
