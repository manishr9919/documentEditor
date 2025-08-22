import { Box, Heading, VStack, Text, Button, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const DocumemetList = () => {
  const token = sessionStorage.getItem("user");
  const parseToken = JSON.parse(token);

  const [document, setDocument] = useState([]);
  const fetchData = async () => {
    try {
      let response = await axios.get(
        "https://documenteditor-wgrt.onrender.com/documents/get",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parseToken}`,
          },
        }
      );
      console.log(response.data);
      setDocument(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchData(); // ✅ Correct place to call it
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:3000/documents/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${parseToken}`,
        },
      });

      // Remove deleted document from UI
      setDocument((prevDocs) => prevDocs.filter((doc) => doc._id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
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
              Title :{doc.title}
            </Heading>
            {doc.visibility === "private" ? (
              <Text color="red.500" fontWeight="bold">
                {doc.visibility}
              </Text>
            ) : (
              <Text color="green.500" fontWeight="bold">
                {doc.visibility}
              </Text>
            )}
            {doc.visibility === "private" ? (
              <Text color="red.500" fontWeight="bold">
                Updated_time :-{doc.updatedAt}
              </Text>
            ) : (
              <Text color="green.500" fontWeight="bold">
                {doc.updatedAt}
              </Text>
            )}

            <Box
              dangerouslySetInnerHTML={{ __html: doc.content }}
              p={2}
              border="1px solid #eee"
              borderRadius="md"
              bg="gray.50"
            />
            <HStack gap={{ base: "30px", md: "30px" }}>
              <Button
                bg="teal.200"
                w={{ base: "100px", md: "150px", lg: "150px" }}
                color="teal.950"
                fontSize="2xl"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(doc._id)}
                bg="teal.200"
                w={{ base: "100px", md: "150px", lg: "150px" }}
                color="teal.950"
                fontSize="2xl"
              >
                Delete
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
