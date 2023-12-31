import {
    useCallback,
    useEffect,
    useState,
} from 'react';
import { AxiosError } from 'axios';
import { IPaginateRespose } from '../types/response';

type UseAxiosResult<T> = {
    data: T | null;
    loading: boolean;
    error: AxiosError | null;
    refreshing: boolean;
    // setData: Dispatch<SetStateAction<T | null>>
    fetchData: () => Promise<void>;
    onRefresh: () => Promise<void>;
    paginate: () => Promise<void>;
};

const useAxiosPaginated = <T,>(
    axiosPromise: (_page?: number) => Promise<IPaginateRespose<T>>
): UseAxiosResult<IPaginateRespose<T>> => {
    const [data, setData] = useState<IPaginateRespose<T> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [paginateLoading, setPaginateLoading] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axiosPromise();
            setData(response);
            setLoading(false);
        } catch (error) {
            setData(null);
            if (error instanceof AxiosError) {
                setError(error as AxiosError);
            }
            setLoading(false);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }, []);

    const paginate = async () => {
        if (loading || paginateLoading || !data?.nextPage) {
            return;
        }
        try {
            setPaginateLoading(true)
            const response = await axiosPromise(data.nextPage);
            setData(state => ({
                ...response,
                paginatedResults: (state ? [...state.paginatedResults] : []).concat(
                    ...response.paginatedResults,
                ),
            }));
        } catch (error) {
            setData(null);
            if (error instanceof AxiosError) {
                setError(error);
            }
        }
        setPaginateLoading(false)
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, refreshing, onRefresh, fetchData, paginate };
};

export default useAxiosPaginated;
