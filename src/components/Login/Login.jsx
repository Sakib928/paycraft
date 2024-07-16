import logo from "../../assets/images/logo.png";
import { useForm } from "react-hook-form";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden md:rounded-lg shadow-md bg-gray-800 md:mt-20 max-sm:h-screen">
      <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-40" src={logo} alt="" />
        </div>

        <h3 className="mt-3 text-xl font-medium text-center text-gray-200">
          Welcome Back
        </h3>

        <p className="mt-1 text-center text-gray-400">
          Login or create account
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mt-4">
            <input
              {...register("email-or-phone")}
              className="block w-full px-4 py-2 mt-2 text-gray-300 border rounded-lg bg-gray-800 border-gray-600 placeholder-gray-400 focus:border-blue-300  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              placeholder="Email Address or Phone"
              aria-label="Email Address"
            />
          </div>

          <div className="w-full mt-4">
            <input
              {...register("password")}
              className="block w-full px-4 py-2 mt-2 text-gray-300 border rounded-lg bg-gray-800 border-gray-600 placeholder-gray-400 focus:border-blue-300  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              placeholder="Password"
              aria-label="Password"
            />
          </div>

          <div className="flex items-center justify-center mt-4">
            <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Sign In
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-200">
          Don&apos;t have an account?{" "}
        </span>

        <a
          href="#"
          className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
        >
          Register
        </a>
      </div>
    </div>
  );
};

export default Login;
