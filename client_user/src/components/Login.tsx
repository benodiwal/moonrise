import { useWallet } from "@solana/wallet-adapter-react";
import { useAuth } from "../state/auth"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

const Login = () => {

    const auth = useAuth();
    const { publicKey, signMessage } = useWallet();
    const [ loading, setIsLoading ] = useState<boolean>(false);

    const signin = async () => {
        if (!publicKey || !signMessage) return;

        setIsLoading(true);
        try {
            const message = new TextEncoder().encode('Signin to moonrise as user');
            const signature = await signMessage(message);
            await auth.mutateAsync({ publicKey, signature: signature! });
        } catch (error) {
            console.error("Signin failed:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        signin();
    }, [publicKey]);

  return (
    <div>
        <WalletMultiButton disabled={loading}>
            {loading ? "Signing in ..." : "Sign in"}    
        </WalletMultiButton>     
    </div>
  )
}

export default Login
