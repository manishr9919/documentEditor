import React, { useState } from "react";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    console.log("form submited", formData);
    axios
      .post("http://localhost:3000/signup/registration", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setSuccessMsg(response.data.message);
        alert("Registration successful")
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        const msg =
          error.response?.data?.message || "Something went wrong. Try again.";
        setErrorMsg(msg);
      });
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
          Sign Up
        </Heading>
        {/* ✅ Display Error Message */}
        {errorMsg && (
          <Text color="red.500" mb="4" textAlign="center">
            {errorMsg}
          </Text>
        )}

        {/* ✅ Display Success Message */}
        {successMsg && (
          <Text color="green.500" mb="4" textAlign="center">
            {successMsg}
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
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};
