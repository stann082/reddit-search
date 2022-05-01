import React, { useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { FormGroup, Media } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import Input from "./Input";

const QUERY = "Query";
const SUBREDDIT = "Subreddit";
const USERNAME = "Username";

function Reddit() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [subreddit, setSubreddit] = useState("");
    const [username, setUsername] = useState("");

    const buildApi = () => {
        var api = "https://api.pushshift.io/reddit/search/";
        api += `comment`;
        api += `?q=${searchTerm}`;
        api += `&author=${username}`;
        api += `&subreddit=${subreddit}`;
        api += `&size=10`;
        return api;
    }

    const getData = async () => {
        var api = buildApi();
        await axios
            .get(api).then((res) => {
                setData(res.data.data);
                setIsLoading(false);
            });
    };

    const handleChange = (event) => {
        switch (event.target.id) {
            case QUERY:
                setSearchTerm(event.target.value);
                break;
            case SUBREDDIT:
                setSubreddit(event.target.value);
                break;
            case USERNAME:
                setUsername(event.target.value);
                break;
            default:
                setSearchTerm(event.target.value);
                break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setData([]);
        setIsLoading(true);
        getData();
    };

    const getDate = (unixTimestamp) => {
        var t = new Date(unixTimestamp);
        var formatted = t.toISOString()
        return formatted;
    }

    const listUsers = data.map((comment) => (
        <Media key={comment.id}>
            <Media.Body>
                <h5><a href={`https://www.reddit.com/u/${comment.author}`}>{comment.author}</a></h5>
                {comment.body}
                <br />
                {getDate(comment.created_utc)}
                <br />
                <a href={`https://www.reddit.com${comment.permalink}`}>Link</a>
                <p />
            </Media.Body>
        </Media>
    ));

    return (
        <div className="search-container">
            <Form onSubmit={handleSubmit} onChange={handleChange}>
                <Input name={USERNAME} />
                <Input name={SUBREDDIT} />
                <Input name={QUERY} />
                <Button variant="primary" type="submit">Search</Button>
            </Form>
            <br />
            <div>
                {isLoading && <ReactLoading type="spinningBubbles" color="#444" />}
            </div>
            {listUsers}
            {error && <div className="text-red-font-bold">{error.message}</div>}
        </div>
    );
}

export default Reddit;
