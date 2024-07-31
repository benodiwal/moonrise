import { useQuery } from "react-query"
import AxiosClient from "./http";

export const useGetThumbnails = () => {
    const query = useQuery({
        queryKey: ["thumbnail"],
        queryFn: () => AxiosClient.get("/user/thumbnails").then((data) => data.data.result),
        retry: 1,
    });

    return query;
};
