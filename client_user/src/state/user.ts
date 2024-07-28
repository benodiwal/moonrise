import { useQuery } from "react-query"
import AxiosClient from "./http";
import { AxiosError } from "axios";
import { User } from "../types/user";

export const useGetUser = () => {
    const query = useQuery<User, AxiosError>({
        queryKey: ["user"],
        queryFn: () => AxiosClient.get("/user").then(data => data.data.result),
        retry: 1,
    });

    return query;
}
