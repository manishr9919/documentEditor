import React, { useState } from "react";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://documenteditor-wgrt.onrender.com/signin/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Save user data to sessionStorage
      sessionStorage.setItem("user", JSON.stringify(response.data.token));

      // Show alert
      alert("Login Successful");

      // Redirect to home page
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <Box
      bg="teal.100"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={{ base: "20px", sm: "40px", md: "60px" }}
    >
      <Box
        bg="white"
        p={{ base: "20px", sm: "30px", md: "40px" }}
        borderRadius="md"
        boxShadow="md"
        w={{ base: "100%", sm: "400px", md: "500px" }}
      >
        <Heading mb="6" textAlign="center">
          Login
        </Heading>

        {error && (
          <Text color="red.500" mb="4" textAlign="center">
            {error}
          </Text>
        )}

        <form onSubmit={handleSubmit}>
          <VStack spacing="4">
            <Box width="100%">
              <Text mb="1">Email</Text>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </Box>

            <Box width="100%">
              <Text mb="1">Password</Text>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </Box>

            <Button type="submit" colorScheme="teal" width="100%">
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};
