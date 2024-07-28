import { useAuth } from "../state/auth"

const Login = () => {

    const auth = useAuth();
    const signin = async () => {
        await auth.mutateAsync({ publicKey: "publicKey", signature: "signature" });
    }

  return (
    <div onClick={() => signin()}>
        Login     
    </div>
  )
}

export default Login
