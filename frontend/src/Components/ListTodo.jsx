import {
    Card,
    CardBody,
    Flex,
    IconButton,
    SimpleGrid,
    Text,
  } from "@chakra-ui/react";
  import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
  import { useDispatch } from "react-redux";
  import { deleteTodo } from "../Redux/action";
  
  const ListTodo = () => {
    const [todos, setTodos] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const displayTodos = async () => {
        try {
          let res = await fetch("https://erin-bison-wrap.cyclic.app/todo");
          let data = await res.json();
          setTodos(data);
        } catch (error) {
          console.log("Error:", error);
        }
      };
    useEffect(() => {  
      displayTodos();
    }, []);
  
    const handleDelete = async (id) => {
      try {
        const response = await fetch(`https://erin-bison-wrap.cyclic.app/todo/delete/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          dispatch(deleteTodo(id));
          displayTodos()
        } else {
          console.log("Error deleting todo");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
  
    const handleEdit = (id, title, description) => {
      setSelectedTodo(id);
      setTitle(title);
      setDescription(description);
      setIsOpen(true);
    };
    const handleSave = async () => {
        try {
          const response = await fetch(`https://erin-bison-wrap.cyclic.app/todo/update/${selectedTodo}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
          });
    
          if (response.ok) {
            console.log("Todo updated successfully");
            displayTodos()
          } else {
            console.log("Error updating todo");
          }
        } catch (error) {
          console.log("Error:", error);
        }
      };
    const handleCloseModal = () => {
      setSelectedTodo(null);
      setTitle("");
      setDescription("");
      setIsOpen(false);
    };
  
    return (
      <div>
        <SimpleGrid columns={{ base: 1, md: 3 }} margin={"auto"} spacing={10} marginTop="40px" w={"90%"}>
          {todos.length > 0 &&
            todos.map((el, i) => {
              return (
                <Card key={el._id} padding={"10px"}>
                  <CardBody>
                    <Text> {el.title}</Text>
                    <Text>{el.description}</Text>
                  </CardBody>
                  <Flex alignItems={"center"} justifyContent={"space-around"}>
                    <Text>{el.status}</Text>
                    <Flex gap="30px">
                      <IconButton
                        bg={"white"}
                        aria-label="Edit Todo"
                        size="md"
                        icon={<EditIcon />}
                        onClick={() => handleEdit(el._id, el.title, el.description)}
                      />
                      <IconButton
                        onClick={() => handleDelete(el._id)}
                        bg={"white"}
                        aria-label="Delete Todo"
                        size="md"
                        icon={<DeleteIcon />}
                      />
                    </Flex>
                  </Flex>
                </Card>
              );
            })}
        </SimpleGrid>
  
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Your Todo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={3}  onClick={handleSave} >
                Save
              </Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  };
  
  export default ListTodo;
  