import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Media } from "react-bootstrap";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

function Reddit() {

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios
            .get(`https://api.pushshift.io/reddit/search/comment?q=${searchTerm}&subreddit=AskReddit&size=10`)
            .then((res) => {
                setData(res.data.data);
                setIsLoading(false);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setData([]);
        setIsLoading(true);
        getData();
    };

    const getDate = (unixTimestamp) => {
        var t = new Date(unixTimestamp);
        var formatted = t.format("mm/mm/yyyy hh:MM:ss");
        return formatted;
    }

    const listUsers = data.map((comment) => (
        <Media key={comment.id}>
            {/* <a href={comment.permalink}>
          <img
            width={64}
            height={64}
            className="mr-3"
            src={comment.avatar_url}
            alt="Generic placeholder"
          />
        </a> */}
            <Media.Body>
                <h5><a href={`https://www.reddit.com/u/${comment.author}`}>{comment.author}</a></h5>
                {comment.body}
                <br />
                <a href={`https://www.reddit.com${comment.permalink}`}>Link</a>
                <p />
            </Media.Body>
        </Media>
    ));

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default">Query</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        aria-label="Query"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </InputGroup>
                <Button variant="primary">Search</Button>
            </Form>
            <br />
            {isLoading && <ReactLoading type="spinningBubbles" color="#444" />}
            {listUsers}
            {error && <div className="text-red-font-bold">{error.message}</div>}
        </div>
    );
}

export default Reddit;
