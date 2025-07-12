import axios from "axios";
import React, { useState } from "react";
import { Box, Button, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const DocumentForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("private"); // default
  const token = sessionStorage.getItem("user");
  const parseToken = JSON.parse(token);
  console.log(parseToken);

  console.log(token);
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded payload:", payload);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Title and Content are required.");
      return;
    }

    const documentData = { title, content, visibility };

    try {
      await axios.post("http://localhost:3000/documents/create", documentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parseToken}`,
        },
      });

      console.log(documentData);

      alert("✅ Document Saved Successfully!");
      setTitle("");
      setContent("");
      setVisibility("private");
    } catch (error) {
      console.error("Error saving document:", error);
      alert("❌ Failed to save document.");
    }
  };

  return (
    <Box
      minH="100vh"
      px={{ base: "20px", sm: "40px", md: "60px" }}
      py="40px"
      bg="gray.50"
    >
      <Box
        bg="white"
        p="30px"
        borderRadius="md"
        boxShadow="md"
        maxW="800px"
        mx="auto"
      >
        <Heading mb="6" textAlign="center">
          Create Document
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <Box>
              <Text mb="1">Title</Text>
              <Input
                placeholder="Enter document title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Box>

            <Box>
              <Text mb="2">Content</Text>
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                }}
              />
            </Box>

            <Box>
              <Text mb="2">Visibility</Text>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </Box>

            <Button colorScheme="teal" type="submit">
              Save Document
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};
