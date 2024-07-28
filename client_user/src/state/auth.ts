import { useMutation, useQueryClient } from "react-query"
import AxiosClient from "./http";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const queryClient = useQueryClient();

    const mut = useMutation({
        mutationKey: ["auth"],
        mutationFn: ({ publicKey, signature }: { publicKey: string, signature: any }) => AxiosClient.post("/user/signin", {
            publicKey,
            signature
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
        }
    });

    return mut;
}

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const mut = useMutation({
        mutationKey: ["user"],
        mutationFn: () => AxiosClient.get("/user/logout"),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ["user"] });
            navigate("/");
        }
    });

    return mut;
}
