import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
const Register = () => {
  const navigate = useNavigate();
  const [showPin, setShowPin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const user = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      pin: data.pin,
      role: "user",
      status: "pending",
      balance: 40,
    };
    const res = await axiosPublic.post("/users", user);
    // console.log(res.data);
    if (res.data.insertedId) {
      Swal.fire({
        title: "Successfully created account",
        text: "Please wait for a while for approval",
        icon: "success",
      });
      reset();
      navigate("/");
    }
    if (res.data.status === "duplicate id") {
      Swal.fire("there is already account with this email or phone number");
    }
  };

  const handlePinState = () => {
    setShowPin(!showPin);
  };
  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden md:rounded-lg shadow-md bg-gray-800 md:mt-12 max-sm:h-screen">
      <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-40" src={logo} alt="" />
        </div>

        <h3 className="text-xl font-medium text-center text-gray-200">
          Welcome Back
        </h3>

        <p className="mt-1 text-center text-gray-400">Create account</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mt-4">
            <input
              {...register("name", { required: "true" })}
              className="block w-full px-4 py-2 mt-2 text-gray-300 border rounded-lg bg-gray-800 border-gray-600 placeholder-gray-400 focus:border-blue-300  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              placeholder="Name"
              aria-label="name"
            />
          </div>
          <div className="w-full mt-4">
            <input
              {...register("email", { required: "true" })}
              className="block w-full px-4 py-2 mt-2 text-gray-300 border rounded-lg bg-gray-800 border-gray-600 placeholder-gray-400 focus:border-blue-300  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              placeholder="Email Address"
              aria-label="Email Address"
            />
            {errors.email && (
              <p className="text-red-500">Enter a valid email</p>
            )}
          </div>
          <div className="w-full mt-4">
            <input
              {...register("phone", {
                required: "true",
                pattern: /^\d+$/,
              })}
              className="block w-full px-4 py-2 mt-2 text-gray-300 border rounded-lg bg-gray-800 border-gray-600 placeholder-gray-400 focus:border-blue-300  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              placeholder="Phone"
              aria-label="Phone"
            />
            {errors.phone && <p className="text-red-500">invalid number</p>}
          </div>

          <div className="w-full mt-4 flex relative">
            <input
              {...register("pin", {
                required: true,
                pattern: /^\d+$/,
                minLength: 5,
              })}
              className="block w-full px-4 py-2 mt-2 text-gray-300 border rounded-lg bg-gray-800 border-gray-600 placeholder-gray-400 focus:border-blue-300  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
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
            {errors.pin && (
              <p className="text-red-500 block">
                pin should be number and minimum 5 characters long
              </p>
            )}
          </div>

          <div className="flex items-center justify-center mt-6">
            <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Register
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-700">
        <span className="text-sm text-gray-200">Already have an account? </span>

        <Link
          to={"/"}
          className="mx-2 text-sm font-bold text-blue-400 hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
