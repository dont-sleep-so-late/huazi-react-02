import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuConfig from "../../../config/index";
import * as Icon from "@ant-design/icons";
const { Header } = Layout;
import { Button, Layout, Avatar, Dropdown, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import "./index.css";
import { useDispatch } from "react-redux";
import { changeCollapse } from "../../../store/reducers/tab";
import screenfull from "screenfull";
//动态获取icon
const getIcon = (name) => React.createElement(Icon[name]);

//处理菜单数据
const menuList = MenuConfig.map((icon) => {
  //没有子菜单
  const child = {
    key: icon.path,
    icon: getIcon(icon.icon),
    label: icon.label,
  };
  //有子菜单
  if (icon.children) {
    child.children = icon.children.map((item) => {
      return {
        key: item.path,
        label: item.label,
      };
    });
  }
  return child;
});
const Nav = ({ collapsed }) => {
  const navigate = useNavigate();
  const [fullScreen, setFullScreen] = useState(false);

  const handleFullscreen = () => {
    // 切换全屏
    if (!screenfull.isEnabled) {
      message.error("you browser can not work");
      return false;
    }
    setFullScreen(!fullScreen);
    screenfull.toggle();
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            navigate("/userSettings");
          }}
        >
          个人中心
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          退出登录
        </a>
      ),
    },
  ];

  const dispatch = useDispatch();
  const changeCollapsed = () => {
    dispatch(changeCollapse());
  };
  //点击菜单
  const selectMenu = (e) => {
    navigate(e.key);
  };
  return (
    <Header className="header">
      <div className="logo">
        <img
          style={{ marginLeft: "20px" }}
          src={require("../../../assets/images/Sinobest-logo.png")}
        />
      </div>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={menuList}
        onClick={selectMenu}
        style={{
          width: "calc(100% - 64px)",
          display: "flex",
          justifyContent: "flex-end",
        }}
      />
      <div className="right-menu">
        <Button
          type="text"
          onClick={() => {
            handleFullscreen();
          }}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            borderRadius: "10px",
          }}
        >
          {fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </Button>
        <Dropdown menu={{ items }}>
          <Avatar
            className="logo"
            size={48}
            src={<img src={require("../../../assets/images/47170023.png")} />}
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default Nav;
