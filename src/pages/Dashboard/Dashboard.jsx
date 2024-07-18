import "animate.css";
import useAuth from "../../hooks/useAuth";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import AgentDashboard from "../AgentDashboard";
const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="lg:w-2/3 mx-auto bg-gray-800 shadow-2xl h-screen lg:rounded-lg">
      <div className="animate__animated animate__fadeInDown p-4 leading-loose">
        <h1 className="text-2xl md:text-4xl font-bold text-white ">
          Welcome, {user.name}
        </h1>
        <p className="text-white">Phone Number : {user.phone}</p>
      </div>
      {user.role === "user" && <UserDashboard />}
      {user.role === "agent" && <AgentDashboard />}
      {user.role === "admin" && <AdminDashboard />}
    </div>
  );
};

export default Dashboard;
