import React, {useState} from 'react';
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {PATH} from "../../utils/constants";
import {GithubOutlined, LinkedinOutlined} from "@ant-design/icons"
import "./header.css";

const items = [
    {
        label: (<Link to={PATH.GITHUB}>Git Hub</Link>),
        key: "git_hub",
        icon: <GithubOutlined/>
    },
    // {
    //     label: (<Link to={PATH.LINKEDIN}>Linked In</Link>),
    //     key: "linked_in",
    //     icon: <LinkedinOutlined/>
    // }
]

const Header = () => {
    const [current, setCurrent] = useState("git_hub");
    const onCurrentClickChange = (e) => {
        setCurrent(e.key);
    }

    return <Menu
        className={"header-navbar"}
        onClick={onCurrentClickChange}
        selectedKeys={[current]}
        mode="horizontal"
    >
        {items.map(item =>
            <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
            </Menu.Item>
        )}
    </Menu>;
};

export default Header;