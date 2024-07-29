import { useWallet } from "@solana/wallet-adapter-react";
import { useAuth } from "../state/auth"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";

const Login = () => {

    const auth = useAuth();
    const { publicKey, signMessage } = useWallet();

    const signin = async () => {
        if (!publicKey) return;
        const message = new TextEncoder().encode('Signin to moonrise as user');
        const signature = await signMessage?.(message);
        await auth.mutateAsync({ publicKey, signature: signature! });
    }

    useEffect(() => {
        signin();
    }, [publicKey]);

  return (
    <div>
        <WalletMultiButton />     
    </div>
  )
}

export default Login
