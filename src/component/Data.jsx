import React, { useState, useEffect } from 'react'
import { useMutation } from "react-query";

const MockingTest = () => {
    const [todos, setTodos] = useState([]);
    const [list, setList] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //들어오자마자 실행되는것
        setLoading(true); //이게 왜 필요해??
        fetch("/page")
            .then((res) => res.json())
            //데이터를 setTodos에 넣는다.
            .then((data) => {
                setTodos(data);
                console.log(data + " 이게나오지");
                setLoading(false); //이게 왜 필요해??
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true); //이게 왜 필요해??
        fetch("/page", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: list
        }).then((res) => {
            fetch("/page")
                .then((res) => res.json())
                .then((data) => {
                    setList("");
                    setTodos(data);
                    setLoading(false);
                }).catch(

                )
        });
    };

    return (
        <div>
            <h2>할일 목록</h2>

            <ul>
                {todos.map((todo, idx) => (
                    <li key={idx}>{todo}</li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="todo"
                    placeholder="새로운 할일"
                    disabled={loading}
                    value={list}
                    onChange={({ target: { value } }) => setList(value)}
                />
                <button disabled={!list}>추가</button>
            </form>
        </div>
    );
}

export default MockingTest;