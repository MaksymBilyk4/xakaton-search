import React from 'react';
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const Loader = () => {
    return (
        <div style={{display: "flex", marginTop: "30px", justifyContent: "center", alignItems: "center"}}>
            <Spin indicator={<LoadingOutlined style={{fontSize: 50,}} spin/>}/>
        </div>
    );
};

export default Loader;