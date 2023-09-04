import { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';

type UseAxiosResult<T> = {
    data: T | null;
    loading: boolean;
    error: AxiosError | null;
    refreshing: boolean
    // setData: Dispatch<SetStateAction<T | null>>
    fetchData: () => Promise<void>
    onRefresh: () => Promise<void>
    paginate: () => Promise<void>
};

const useAxios = <T,>(
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

    const paginate = async () => {
        console.log(data)
    }

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, refreshing, onRefresh, fetchData, paginate };
};

export default useAxios;
