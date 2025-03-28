"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";

export function CreatePollForm() {
  // const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [options, setOptions] = useState([
    { id: "1", text: "" },
    { id: "2", text: "" },
  ]);
  const [pollTitle, setPollTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("60");
  const [users, setUsers] = useState("");
  const [usersList, setUsersList] = useState([]);

  const addOption = () => {
    if (options.length >= 10) return;
    setOptions([...options, { id: `${options.length + 1}`, text: "" }]);
  };

  const removeOption = (id) => {
    if (options.length <= 2) return;
    setOptions(options.filter((option) => option.id !== id));
  };

  const updateOption = (id, text) => {
    setOptions(
      options.map((option) => (option.id === id ? { ...option, text } : option))
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const pollData = {
      title: pollTitle,
      description,
      duration,
      isPrivate,
      options: options.map((opt) => opt.text),
      allowedUsers: isPrivate ? usersList : [],
    };

    console.log("Poll Data:", pollData);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && users.trim() !== "") {
      e.preventDefault();
      setUsersList((prevList) => [...prevList, users.trim()]);
      setUsers(""); 
    }
  };

  const removeUser = (user)=>{
    setUsersList(usersList.filter((users)=> users != user))
    
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div className="flex justify-evenly">
        <div className="flex flex-col gap-12">
          <TextField
            label="Poll Title"
            variant="outlined"
            fullWidth
            required
            value={pollTitle}
            onChange={(e) => setPollTitle(e.target.value)}
          />

          <TextField
            label="Description (Optional)"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel>Poll Duration</InputLabel>
            <Select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <MenuItem value="15">15 minutes</MenuItem>
              <MenuItem value="30">30 minutes</MenuItem>
              <MenuItem value="60">1 hour</MenuItem>
              <MenuItem value="120">2 hours (maximum)</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={isPrivate}
                onChange={() => setIsPrivate(!isPrivate)}
              />
            }
            label="Make this poll private"
          />
        </div>

        {isPrivate && (
          <Card>
            <CardContent>
              <TextField
                label="Add Users (by email)"
                placeholder="Enter email addresses "
                fullWidth
                value={users}
                onKeyDown={handleKeyDown}
                onChange={(e) => setUsers(e.target.value)}
              />
              <div className="flex-col gap-6 h-full ">
                {usersList.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 p-2 rounded-lg shadow-md justify-items-end  w-full"
                  >
                    <p className="text-lg text-black font-sans">{user}</p>
                    <IconButton
                      size="small"
                      onClick={() => removeUser(user)}
                      className="ml-2"
                    >
                      <X className="h-4 w-full text-red-500   " />
                    </IconButton>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div>
          <h3>Poll Options</h3>
          {options.map((option, index) => (
            <div
              key={option.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <TextField
                fullWidth
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) => updateOption(option.id, e.target.value)}
                required
              />
              <IconButton
                onClick={() => removeOption(option.id)}
                disabled={options.length <= 2}
              >
                <Delete />
              </IconButton>
            </div>
          ))}
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={addOption}
            disabled={options.length >= 10}
          >
            Add Option
          </Button>
        </div>
      </div>

      <div  className="flex justify-end  gap-2">
        <Button variant="contained" type="submit" >
          {isSubmitting ? "Creating Poll..." : "Create Poll"}
        </Button>
      </div>
    </form>
  );
}
