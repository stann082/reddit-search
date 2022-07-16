import React, { ChangeEvent, FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { Comment } from './comment'
import ReactLoading from "react-loading";
import Card from "react-bootstrap/Card";
import { Button, Form } from "react-bootstrap";
import Input from "./Input";

const BASE_URL = "https://www.reddit.com"
const QUERY = "Query";
const SUBREDDIT = "Subreddit";
const TOTAL_RESULTS = "Total results";
const USERNAME = "Username";

const Reddit: React.FC = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [subreddit, setSubreddit] = useState("");
    const [totalResults, setTotalResults] = useState('100');
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
            .get(api)
            .then((res) => {
                setData(res.data.data);
                setIsLoading(false);
            })
            .catch((err: AxiosError) => {
                setError(err.message)
                setIsLoading(false);
            });
    };

    const transformData = async () => {
        var comments = data;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setData([]);
        setIsLoading(true);
        getData();
        transformData();
    };

    const listComments = data.map((comment: Comment) => (
        <Card key={comment.id}>
            <Card.Body>
                <Card.Title><a href={`${BASE_URL}/u/${comment.author}`}>{comment.author}</a></Card.Title>
                <Card.Text>
                {comment.body}
                </Card.Text>
                <Card.Link href={`${BASE_URL}${comment.permalink}`}>Comment</Card.Link>
                <Card.Link href={`${BASE_URL}/r/${comment.subreddit}`}>r/{comment.subreddit}</Card.Link>
            </Card.Body>
        </Card>
    ));

    return (
        <div className="search-container">
            <Form onSubmit={handleSubmit} onChange={() => handleChange}>
                <Input title={USERNAME} />
                <Input title={SUBREDDIT} />
                <Input title={QUERY} />
                <Input title={TOTAL_RESULTS} />
                <Button variant="primary" type="submit">Search</Button>
            </Form>
            <br />
            <div>
                {isLoading && <ReactLoading type="spinningBubbles" color="#444" />}
            </div>
            {listComments}
            {error && <div className="text-red-font-bold">{error}</div>}
        </div>
    );
};

export default Reddit;
