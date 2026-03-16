import { useEffect, useState } from "react";

interface FetchState<T> {
    data : T | null;
    error : string | null;
    loading : boolean;
}

const useFetch = <T, >(url: string, options : RequestInit) : FetchState<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async (url : string, option? : RequestInit) =>{
        setLoading(true);
        try{
            var response = await fetch(url, option);
            var value : T = await response.json();
            setData(value);
            setError(null);
        }catch{
            setError('An error has occured');
        } finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        fetchData(url, options);
    }, [url, JSON.stringify(options)])

    return {data, error, loading};
}

export default useFetch;

