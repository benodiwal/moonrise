import { useQuery, useQueryClient } from "react-query"
import AxiosClient from "./http";
import { Thumbnail, ThumbnailResponse } from "@/types/thumbnail";
import { AxiosError } from "axios";

export const useGetThumbnails = () => {
    const query = useQuery<ThumbnailResponse["result"], AxiosError>({
        queryKey: ["thumbnails"],
        queryFn: () => AxiosClient.get("/user/thumbnails").then((data) => data.data.result),
        retry: 1,
    });

    return query;
};

export const useThumbnail = () => {
    const queryClient = useQueryClient();
    return queryClient.getQueryState<Thumbnail | undefined>(["thumbnails"]);
}
