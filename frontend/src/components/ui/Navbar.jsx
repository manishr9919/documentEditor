import React, { useEffect, useState } from "react";
import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Navbar = () => {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("user");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token", error);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setEmail("");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <HStack
      w="100%"
      h={{ base: "100px", md: "120px" }}
      bg="teal.200"
      justifyContent="space-between"
      px="20px"
    >
      {/* Left Section */}
      <HStack gap="20px">
        <Box display={{ base: "block", md: "none" }}>
          <GiHamburgerMenu size="24px" />
        </Box>
        <Box>
          <Link to="/home">Home</Link>
        </Box>
        {isLoggedIn && <Heading size="md">{email}</Heading>}
      </HStack>

      {/* Right Section */}
      <HStack gap="20px">
        <Box>
          <Link to="/document">Create Document</Link>
        </Box>

        {!isLoggedIn ? (
          <>
            <Box display={{ base: "none", md: "block" }}>
              <Link to="/signup">Sign Up</Link>
            </Box>
            <Box display={{ base: "none", md: "block" }}>
              <Link to="/login">Login</Link>
            </Box>
          </>
        ) : (
          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </HStack>
    </HStack>
  );
};
