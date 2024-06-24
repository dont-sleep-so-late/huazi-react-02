import React, { useState } from "react";
import { message } from "antd";

const [messageApi] = message.useMessage();

const MSG = (type, message) => {
  messageApi.open({
    type: type,
    content: message,
  });
};

export default MSG;
