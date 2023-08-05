import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

type UseAxiosResult<T> = {
    data: T | null;
    loading: boolean;
    error: AxiosError | null;
    refreshing: boolean
    // setData: Dispatch<SetStateAction<T | null>>
    onRefresh: () => Promise<void>
};

const useAxios = <T extends unknown>(
    axiosPromise: Promise<T>
): UseAxiosResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | null>(null);
    const [refreshing, setRefreshing] = useState(false);
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

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await fetchData()
        setRefreshing(false)
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, refreshing, onRefresh };
};

export default useAxios;
