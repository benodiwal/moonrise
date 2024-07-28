import { useQuery } from "react-query"
import AxiosClient from "./http";

export const useGetUser = () => {
    const query = useQuery({
        queryKey: ["user"],
        queryFn: () => AxiosClient.get("/user/me").then(data => data.data.result),
        retry: 1,
    });

    return query;
}
