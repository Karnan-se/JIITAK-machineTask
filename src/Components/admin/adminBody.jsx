import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import AdminPollList from "./adminPollList";
import { CreatePollButton } from "./createPollButton";
import { Modal, Button } from "@mui/material";
import { CreatePollForm } from "./createPollForm";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("active");
  const [NewPoll, setNewPoll] = useState(false);

  return (
    <>
      <Box sx={{ maxWidth: 800, mx: "auto", py: 4 }}>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(event, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ minHeight: 40 }}
          >
            <Tab label="Active Polls" value="active" />
            
            <Tab label="Expired" value="expired" />
           
          </Tabs>

          <CreatePollButton setNewPoll={setNewPoll} />
        </Box>

        <Box sx={{ mt: 4 }}>
          {activeTab === "active" && <AdminPollList type="active" />}
          {/* {activeTab === "participated" && <AdminPollList type="participated" />} */}
          {activeTab === "expired" && <AdminPollList type="expired" />}
          {/* {activeTab === "created" && <AdminPollList type="created" />} */}
        </Box>
      </Box>


      

      <Modal open={NewPoll} onClose={() => setNewPoll(false)}>
        <Box className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full mx-auto mt-24">
        <CreatePollForm setNewPoll={setNewPoll}/>
        

          <Button
            variant="contained"
            color="secondary"
            onClick={() => setNewPoll(false)}
            className="mt-4"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
