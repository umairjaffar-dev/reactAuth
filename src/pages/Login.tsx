import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../api/useLogin";
import { useUser } from "../store/useUser";
import { browserStorageKeys } from "../utils/constants";
// import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [persistLogin, setPersistLogin] = useState<boolean>(false);
  const { mutate: loginUser } = useLogin();

  const handleSubmitLogin = () => {
    const data = {
      email,
      password,
      persistLogin,
      portal: "user",
    };
    loginUser(data, {
      onSuccess: (data) => {
        if (persistLogin) {
          localStorage.setItem(browserStorageKeys.refreshToken, data.refreshToken);
        }
        setUser(data);
        navigate("/");
      },
      // onError: (error: unknown) => {
      //   toast.error("Internal Server Error");
      // },
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleSubmitLogin();
        }}
        className="w-[400px] h-[300px] border bg-gray-100 border-gray-300 rounded-md p-2"
      >
        <div className="w-full flex justify-center items-start mb-4">
          <p className="text-gray-900 text-2xl font-semibold">Sign In</p>
        </div>
        <div className="mt-3">
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder="User Email"
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-3">
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="User Password"
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-3 ps-1 flex justify-start items-center gap-2">
          <input
            type="checkbox"
            name="persistLogin"
            checked={persistLogin}
            onChange={(e) => {
              setPersistLogin(e.target.checked);
            }}
          />
          <span>Remember me</span>
        </div>
        <div className="w-full flex justify-center items-start mt-4">
          <button
            type="submit"
            className="bg-gray-900 text-white px-5 py-1 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
