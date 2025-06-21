import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        const result = await res.json();
        alert(result.message);
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-[#dfe6e4]"
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              placeholder="Name"
              className="w-full px-4 py-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button className="bg-blue-600 w-full text-white py-2 rounded">
            Register
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Register;
