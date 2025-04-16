import { Modal, Button, TextInput, PasswordInput, Stack, Group, Divider, Text, } from "@mantine/core";
import { useState } from "react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { login, signUp } from "../api/user";
import { notifications } from '@mantine/notifications';

export default function AuthModal({ opened, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });




  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
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
            placeholder="name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        )}
        <TextInput
          label="Email"
          placeholder="email address"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
        <PasswordInput
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
