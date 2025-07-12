import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const DocumemetList = () => {
  const token = sessionStorage.getItem("user");
  const parseToken = JSON.parse(token);

  const [document, setDocument] = useState([]);
  const fetchData = async () => {
    try {
      let response = await axios.get("http://localhost:3000/documents/get", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parseToken}`,
        },
      });
      console.log(response.data);
      setDocument(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchData(); // ✅ Correct place to call it
  }, []);

  return (
    <Box p={6}>
      <Heading mb={4}>Document List</Heading>

      <VStack align="stretch" spacing={6}>
        {document.map((doc) => (
          <Box
            key={doc._id}
            p={4}
            border="1px solid #ccc"
            borderRadius="md"
            bg="white"
            boxShadow="sm"
          >
            <Heading size="md" mb={2}>
              {doc.title}
            </Heading>

            <Text fontSize="sm" color="gray.600" mb={2}>
              Visibility: {doc.visibility}
            </Text>

            <Box
              dangerouslySetInnerHTML={{ __html: doc.content }}
              p={2}
              border="1px solid #eee"
              borderRadius="md"
              bg="gray.50"
            />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
