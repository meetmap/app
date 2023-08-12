import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { IPaginateRespose } from '../types/response';

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

const useAxiosPaginated = <T extends unknown>(
    axiosPromise: (page?: number) => Promise<IPaginateRespose<T>>
): UseAxiosResult<IPaginateRespose<T>> => {
    const [data, setData] = useState<IPaginateRespose<T> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axiosPromise();
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
        if (data?.nextPage) {
            try {
                const response = await axiosPromise(data.nextPage);
                setData(
                    {
                        ...response,
                        paginatedResults: [...data.paginatedResults, ...response.paginatedResults]
                    }
                );
            } catch (error) {
                setData(null);
                setError(error as AxiosError);
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, refreshing, onRefresh, fetchData, paginate };
};

export default useAxiosPaginated;
