
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";
import { createPoll } from "../../Features/api/pollApi";
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
import { Delete, Add, Poll } from "@mui/icons-material";

export function CreatePollForm() {
  const formik = useFormik({
    initialValues: {
      pollTitle: "",
      description: "",
      duration: "60",
      isPrivate: false,
      options: ["", ""],
      users: "",
      usersList: [],
    },
    validationSchema: Yup.object({
      pollTitle: Yup.string().trim().required("Poll title is required"),
      description: Yup.string().trim(),
      duration: Yup.string().required("Duration is required"),
      options: Yup.array()
        .of(Yup.string().trim().required("Option cannot be empty"))
        .min(2, "At least two options are required")
        .max(10, "A maximum of 10 options are allowed"),
      usersList: Yup.array().of(Yup.string().email("Invalid email format")),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const pollData = {
        title: values.pollTitle,
        description: values.description,
        duration: values.duration,
        isPrivate: values.isPrivate,
        options: values.options.map((opt) => opt.trim()),
        allowedUsers: values.isPrivate ? values.usersList : [],
      };
      console.log("Poll Data:", pollData);

      try {
        const poll = await createPoll(pollData)
        console.log(poll ,  "polling")
        
        
      } catch (error) {
        
      }

      setSubmitting(false);

    },
  });

  const addOption = () => {
    if (formik.values.options.length >= 10) return;
    formik.setFieldValue("options", [...formik.values.options, ""]);
  };

  const removeOption = (index) => {
    if (formik.values.options.length <= 2) return;
    formik.setFieldValue(
      "options",
      formik.values.options.filter((_, i) => i !== index)
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && formik.values.users.trim() !== "") {
      e.preventDefault();
      formik.setFieldValue("usersList", [
        ...formik.values.usersList,
        formik.values.users.trim(),
      ]);
      formik.setFieldValue("users", "");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div className="flex justify-evenly">
        <div className="flex flex-col gap-12">
          <TextField
            label="Poll Title"
            variant="outlined"
            fullWidth
            required
            {...formik.getFieldProps("pollTitle")}
            error={formik.touched.pollTitle && Boolean(formik.errors.pollTitle)}
            helperText={formik.touched.pollTitle && formik.errors.pollTitle}
          />

          <TextField
            label="Description (Optional)"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            {...formik.getFieldProps("description")}
          />

          <FormControl fullWidth>
            <InputLabel>Poll Duration</InputLabel>
            <Select {...formik.getFieldProps("duration")}>
              <MenuItem value="15">15 minutes</MenuItem>
              <MenuItem value="30">30 minutes</MenuItem>
              <MenuItem value="60">1 hour</MenuItem>
              <MenuItem value="120">2 hours (maximum)</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.isPrivate}
                onChange={() => formik.setFieldValue("isPrivate", !formik.values.isPrivate)}
              />
            }
            label="Make this poll private"
          />
        </div>

        {formik.values.isPrivate && (
          <Card>
            <CardContent>
              <TextField
                label="Add Users (by email)"
                placeholder="Enter email addresses"
                fullWidth
                {...formik.getFieldProps("users")}
                onKeyDown={handleKeyDown}
              />
              <div className="flex-col gap-6 h-full">
                {formik.values.usersList.map((user, index) => (
                  <div key={index} className="flex items-center bg-gray-100 p-2 rounded-lg shadow-md w-full">
                    <p className="text-lg text-black font-sans">{user}</p>
                    <IconButton
                      size="small"
                      onClick={() =>
                        formik.setFieldValue(
                          "usersList",
                          formik.values.usersList.filter((_, i) => i !== index)
                        )
                      }
                      className="ml-2"
                    >
                      <X className="h-4 w-full text-red-500" />
                    </IconButton>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div>
          <h3>Poll Options</h3>
          {formik.values.options.map((option, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <TextField
                fullWidth
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...formik.values.options];
                  newOptions[index] = e.target.value;
                  formik.setFieldValue("options", newOptions);
                }}
                required
              />
              <IconButton onClick={() => removeOption(index)} disabled={formik.values.options.length <= 2}>
                <Delete />
              </IconButton>
            </div>
          ))}
          <Button variant="outlined" startIcon={<Add />} onClick={addOption} disabled={formik.values.options.length >= 10}>
            Add Option
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="contained" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Creating Poll..." : "Create Poll"}
        </Button>
      </div>
    </form>
  );
}
