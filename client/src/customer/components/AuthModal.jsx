import { Modal, Button, TextInput, PasswordInput, Stack, Group, Divider, Text, } from "@mantine/core";
import { useState } from "react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { login, signUp } from "../api/user";
import { notifications } from '@mantine/notifications';

export default function AuthModal({ opened, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  // validation
  const validateForm = () => {
    const validationErrors = {};

    if (!form.email) {
      validationErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!form.password) {
      validationErrors.password = "Password is required";
    } else if (form.password.length < 4) {
      validationErrors.password = "Password must be at least 4 characters";
    }
    if (!isLogin && !form.name) {
      validationErrors.name = "Name is required for sign-up";
    }
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };




  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;
      if (isLogin) {
        const res = await login(form);
        console.log("Login success:", res);
        notifications.show({
          title: "Login Successful",
          message: `Welcome back, ${res.user.name}`,
          color: "green",
        });

        // context
        onLoginSuccess(res.user, res.token);
        onClose();
      } else {
        const res = await signUp(form);
        console.log("Registered:", res);
        notifications.show({
          title: "Registration Successful",
          message: "Welcome! Your account has been created",
          color: "green",
        });
        onClose();
      }
    } catch (err) {
      console.error("Auth error:", err.response?.data + " , msg : " + err.message);
      notifications.show({
        title: "Registration Failed",
        message: `${err.response?.data?.message || "Something went wrong"}`,
        color: "red",
      });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title={isLogin ? "Sign In" : "Sign Up"} centered>
      <Stack spacing="md">
        {/* sign up */}
        {!isLogin && (
          <TextInput
            label="Name"
            error={errors.name}
            placeholder="name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        )}
        <TextInput
          label="Email"
          error={errors.email}
          placeholder="email address"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
        <PasswordInput
          error={errors.password}
          label="Password"
          placeholder="password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
        />

        <Button onClick={handleSubmit}>
          {isLogin ? "Login" : "Create Account"}
        </Button>

        <Divider label="Or continue with" labelPosition="center" />

        <Button leftIcon={<IconBrandGoogle size={20} />} onClick={() => {
          window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
        }}
          variant="outline" color="blue">
          Continue with Google
        </Button>

        <Group justify="center">
          <Text size="sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Text
              span
              color="blue"
              style={{ cursor: "pointer" }}
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin ? " Sign Up" : " Login"}
            </Text>
          </Text>
        </Group>
      </Stack>
    </Modal>
  );
}
