import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
const Login = () => {
  const { setUser } = useAuth();
  const [showPin, setShowPin] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await axiosPublic.post("/login", data);
    if (res.data.status === "success") {
      // console.log(res.data.userData);
      setUser(res.data.userData);
      localStorage.setItem("user", JSON.stringify(res.data.userData));
      localStorage.setItem("token", res.data.token);
      Swal.fire("Successfully logged in");
      navigate("/dashboard");
    } else {
      Swal.fire({
        title: "Invalid credentials",
        text: "There seems to be an error with you account",
        icon: "error",
      });
    }
  };

  const handlePinState = () => {
    setShowPin(!showPin);
  };

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden md:rounded-lg shadow-md bg-gray-800 md:mt-20 max-sm:h-screen">
      <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-40" src={logo} alt="" />
        </div>

        <h3 className="mt-3 text-xl font-medium text-center text-gray-200">
          Welcome Back
        </h3>

        <p className="mt-1 text-center text-gray-400">Please Login</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mt-4">
            <input
              {...register("email_or_phone", { required: "true" })}
              className="block w-full px-4 py-2 mt-2 text-gray-300 border rounded-lg bg-gray-800 border-gray-600 placeholder-gray-400 focus:border-blue-300  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              placeholder="Email Address or Phone"
              aria-label="Email Address"
            />
            {errors.email_or_phone && (
              <p className="text-red-500">Invalid email or phone</p>
            )}
          </div>

          <div className="w-full mt-4 flex relative">
            <input
              {...register("pin", {
                required: true,
                pattern: /^\d+$/,
              })}
              className="block w-full px-4 py-2 mt-2 text-gray-300 border rounded-lg bg-gray-800 border-gray-600 placeholder-gray-400 focus:border-blue-300  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300 "
              type={showPin ? "text" : "password"}
              placeholder="pin"
              aria-label="pin"
            />
            {showPin ? (
              <FaEyeSlash
                onClick={handlePinState}
                className="absolute right-0 mt-4 mr-4 text-xl text-gray-300"
              />
            ) : (
              <FaEye
                onClick={handlePinState}
                className="absolute right-0 mt-4 mr-4 text-xl text-gray-300"
              />
            )}
            {errors.pin && <p className="text-red-500">Invalid pin</p>}
          </div>

          <div className="flex items-center justify-center mt-4">
            <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Sign In
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-200">
          Don&apos;t have an account?{" "}
        </span>

        <Link
          to={"/register"}
          className="mx-2 text-sm font-bold text-blue-400 hover:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
