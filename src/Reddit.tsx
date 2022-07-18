import React, { FormEvent, useState } from "react";
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
            })
            .catch((err: AxiosError) => {
                setError(err.message)
            })
            .then(() => {
                setIsLoading(false);
            });
    };

    const handleChange = (event: FormEvent<HTMLFormElement>) => {
        var eventTarget = (event.target as HTMLInputElement);
        switch (eventTarget.id) {
            case QUERY:
                setSearchTerm(eventTarget.value);
                break;
            case SUBREDDIT:
                setSubreddit(eventTarget.value);
                break;
            case TOTAL_RESULTS:
                setTotalResults(eventTarget.value);
                break;
            case USERNAME:
                setUsername(eventTarget.value);
                break;
            default:
                setSearchTerm(eventTarget.value);
                break;
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setData([]);
        setIsLoading(true);
        getData();
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
            <Form onSubmit={handleSubmit} onChange={handleChange}>
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
