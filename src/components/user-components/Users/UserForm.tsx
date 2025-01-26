import { Button } from "@/components/ui/button";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { useData } from "@/components/context/DataProvider";

type UserFormProps = {
  mode: "create" | "update";
  initialData?: {
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
    department?: string;
  };
  onClose: () => void;
};

const UserForm: React.FC<UserFormProps> = ({ mode, initialData, onClose }) => {
  const { departments } = useData();

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    role: initialData?.role || "",
    department: initialData?.department || "",
  });

  useEffect(() => {
    if (mode === "update" && initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        role: initialData.role || "",
        department: initialData.department || "",
      });
    }
  }, [mode, initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        // Create logic here
        console.log("Creating user", formData);
      } else {
        // Update logic here
        console.log("Updating user", formData);
      }
      onClose();
    } catch (error) {
      console.error("Error in form submission", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <h1 className="text-xl font-semibold text-center mb-4">
          {mode === "create" ? "Create User" : "Update User"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="principal">Principal</option>
          </select>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {mode === "create" ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UserForm;