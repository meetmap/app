import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

type UseAxiosResult<T> = {
    data: T | null;
    loading: boolean;
    error: AxiosError | null;
    setData: Dispatch<SetStateAction<T | null>>
};

const useAxios = <T extends unknown>(
    axiosPromise: Promise<T>
): UseAxiosResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | null>(null);
    const fetchData = async () => {
        try {
            const response = await axiosPromise;
            setData(response);
            setLoading(false);
        } catch (error) {
            setData(null);
            setError(error as AxiosError);
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, setData };
};

export default useAxios;
