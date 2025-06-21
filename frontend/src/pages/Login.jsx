import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        localStorage.setItem("authToken", result.token);
        alert("Login successful!");
        navigate("/");
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert("Login failed.");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-[#dfe6e4]"
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button className="bg-blue-600 w-full text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Login;
