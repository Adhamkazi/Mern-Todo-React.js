import { Box, Button,  FormControl, FormLabel, Input, Select, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../Redux/action";
import ListTodo from "./ListTodo";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/todo/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, status, description }),
      });

      if (response.ok) {
        const newTodo = await response.json();
        dispatch(addTodo(newTodo));
        alert("please refresh the page")
        setTitle("");
        setStatus("");
        setDescription("");
      } else {
        console.log("Error adding todo");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };


  return (
    <div>
      <Text>Todos</Text>
      <Box as="form" onSubmit={handleSubmit} w={{base:"50%",md:'70%'}} margin={"auto"} mt="50px" boxShadow='xl' p='6' rounded='md' bg='white'>
        <FormControl id="title" isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e)=> 
            
    setTitle(e.target.value)
        
            }

            placeholder="Enter task title"
          />
        </FormControl>

        <FormControl id="description" mt={4} isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e)=> 
                setDescription(e.target.value)}
            placeholder="Enter task description"
          />
        </FormControl>

        <FormControl id="status" mt={4} isRequired>
          <FormLabel>Status</FormLabel>
          <Select value={status} onChange={(e)=> setStatus(e.target.value)}>
            <option value="">Select status</option>
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="Completed">Completed</option>
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="teal" mt={4}>
          Add Task
        </Button>
      </Box>
      <ListTodo/>
    </div>
  );
};

export default AddTodo;
