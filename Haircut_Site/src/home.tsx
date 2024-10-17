import { useNavigate } from "react-router-dom";
import "./home.css";
// Main Home component
const Home = () => {
  // useNavigate hook inside the component
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="text-4xl font-bold mb-4">Welcome to SalonSense</h1>
      <h2 className="text-xl font-semibold mb-6">Your personalized salon service guide. Discover the best services curated just for you.</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/services")}
      >
        Explore Services
      </button>
    </div>
  );
};

export default Home;
