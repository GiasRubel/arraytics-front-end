import { useEffect, useState } from "react";

const useFetch = (url, dependencies = []) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchData = () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        const abortCont = new AbortController();
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
            signal: abortCont.signal
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error("Could not fetch the data for that resource");
                }
                return res.json();
            })
            .then((data) => {
                const dataWithSequentialIds = data.map((item, index) => ({
                    ...item,
                    serialId: index + 1,
                }));

                setData(dataWithSequentialIds);
                setLoading(false);
                setError(null);
            })
            .catch((err) => {
                if (err.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
                    setLoading(false);
                    setError(err.message);
                }
            });
    };

    useEffect(() => {
        fetchData();
    }, dependencies);

    const refetch = () => {
        fetchData();
    };

    return { loading, error, data, refetch };
};

export default useFetch;
