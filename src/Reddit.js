import React, { useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import Card from "react-bootstrap/Card";
import { Button, Form } from "react-bootstrap";
import Input from "./Input";

const QUERY = "Query";
const SUBREDDIT = "Subreddit";
const TOTAL_RESULTS = "Total results";
const USERNAME = "Username";

function Reddit() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [subreddit, setSubreddit] = useState("");
    const [totalResults, setTotalResults] = useState(100);
    const [username, setUsername] = useState("");

    const buildApi = () => {
        var api = "https://api.pushshift.io/reddit/search/";
        api += `comment`;
        api += `?q=${searchTerm}`;
        api += `&author=${username}`;
        api += `&subreddit=${subreddit}`;
        api += `&size=${totalResults}`;
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

    const transformData = async () => {
        var comments = data;
    };

    const handleChange = (event) => {
        switch (event.target.id) {
            case QUERY:
                setSearchTerm(event.target.value);
                break;
            case SUBREDDIT:
                setSubreddit(event.target.value);
                break;
            case TOTAL_RESULTS:
                setTotalResults(event.target.value);
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
        transformData();
    };

    const getDate = (unixTimestamp) => {
        var t = new Date(unixTimestamp);
        var formatted = t.format("mm/mm/yyyy hh:MM:ss");
        return formatted;
    }

    const listComments = data.map((comment) => (
        <Card key={comment.id}>
            <Card.Body>
                <Card.Title><a href={`https://www.reddit.com/u/${comment.author}`}>{comment.author}</a></Card.Title>
                <Card.Text>
                {comment.body}
                </Card.Text>
                <Card.Link href={`https://www.reddit.com${comment.permalink}`}>Comment</Card.Link>
                <Card.Link href={`https://www.reddit.com/r/${comment.subreddit}`}>r/{comment.subreddit}</Card.Link>
            </Card.Body>
        </Card>
    ));

    return (
        <div className="search-container">
            <Form onSubmit={handleSubmit} onChange={handleChange}>
                <Input name={USERNAME} />
                <Input name={SUBREDDIT} />
                <Input name={QUERY} />
                <Input name={TOTAL_RESULTS} />
                <Button variant="primary" type="submit">Search</Button>
            </Form>
            <br />
            <div>
                {isLoading && <ReactLoading type="spinningBubbles" color="#444" />}
            </div>
            {listComments}
            {error && <div className="text-red-font-bold">{error.message}</div>}
        </div>
    );
}

export default Reddit;
