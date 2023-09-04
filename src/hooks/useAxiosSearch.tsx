import {
    useCallback,
    useEffect,
    useState,
} from 'react';
import  { AxiosError } from 'axios';
import { IPaginateRespose } from '../types/response';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SearchParams = any


type UseAxiosResult<T> = {
    data: T | null;
    loading: boolean;
    error: AxiosError | null;
    refreshing: boolean;
    // setData: Dispatch<SetStateAction<T | null>>
    fetchData: (_params?: SearchParams) => Promise<void>;
    onRefresh: () => Promise<void>;
    paginate: () => Promise<void>;
};

const useAxiosSearch = <T,>(
    axiosPromise: (_params?: SearchParams) => Promise<IPaginateRespose<T>>
): UseAxiosResult<IPaginateRespose<T>> => {
    const [data, setData] = useState<IPaginateRespose<T> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [paginateLoading, setPaginateLoading] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = useCallback(async (params?: SearchParams) => {
        setLoading(true);
        try {
            const response = await axiosPromise(params);
            setData(response);
            setLoading(false);
        } catch (error) {
            setData(null);
            if (error instanceof AxiosError) {
                setError(error);
            }
            setLoading(false);
        }
    }, [axiosPromise]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }, [fetchData]);

    const paginate = useCallback(async (params?: SearchParams) => {
        if (loading || paginateLoading || !data?.nextPage) {
            return;
        }
        try {
            setPaginateLoading(true);
            const response = await axiosPromise({ page: data.nextPage, q: params?.q });
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
        setPaginateLoading(false);
    }, [loading, paginateLoading, data, axiosPromise]);


    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, refreshing, onRefresh, fetchData, paginate };
};

export default useAxiosSearch;
