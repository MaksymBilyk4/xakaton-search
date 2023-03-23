import React, {useEffect, useState} from 'react';
import "../../index.css";
import {Button, Input} from "antd";
import {useDebounce} from "../../hooks/useDebounce";
import {getHubUsers} from "../../services/gitHubApi";
import GitHubUserPreview from "../../components/GitHubUser/GitHubUserPreview";
import Loader from "../../components/Loader/Loader";

const GitHub = () => {
    const [value, setValue] = useState("");
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [loading, setLoading] = useState(false);
    const [foundUsersCounter, setUsersCounter] = useState(0);

    const debounced = useDebounce(value, 500);
    const onInputChange = (e) => setValue(e.target.value);

    const onButtonClick = () => {
        setPage(page + 1);
        setLoading(true)
        getHubUsers(debounced, page + 1, pageSize)
            .then(res => {
                setData(prevState => [...prevState, ...res.data.items]);
                setLoading(false);
            });
    }

    useEffect(() => {
        if (value.length === 0) {
            setData([]);
            setUsersCounter(0);
        }
        setPage(1);
        if (debounced) {
            setLoading(true)
            getHubUsers(debounced, page, pageSize)
                .then(res => {
                    setData(res.data.items);
                    setUsersCounter(res.data.total_count);
                    setLoading(false)
                });
        }
    }, [debounced]);

    return (
        <div className="container">
            <Input placeholder="Enter user`s git hub name" onChange={onInputChange} value={value}/>
            <p>{value === "" && data.length === 0 ? "" : `Найдено: ${foundUsersCounter} пользователей`}</p>

            <div className={"content"}>
                {data?.map(item =>
                    <GitHubUserPreview key={item.id} login={item.login} image={item.avatar_url}/>
                )}
            </div>

            {loading && <Loader/>}

            <div style={{display: "flex", justifyContent: "center", margin: "20px 0"}}>
                <Button
                    onClick={onButtonClick}
                    style={{width: "50%"}}
                    type="primary"
                    disabled={foundUsersCounter === data.length}
                >
                    Load more
                </Button>
            </div>
        </div>
    );
};

export default GitHub;