import React, {useState} from 'react';
import "../../index.css";
import {Input} from "antd";

const GitHub = () => {
    const [value, setValue] = useState("");
    const onInputChange = (e) => setValue(e.target.value);

    return (
        <div className="container">
            <Input placeholder="Enter user`s git hub name" onChange={onInputChange} value={value}/>

            <div>

            </div>
        </div>
    );
};

export default GitHub;