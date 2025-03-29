import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  Button,
  LinearProgress,
  Modal,
  Box,
} from "@mui/material";
import { Visibility, Edit } from "@mui/icons-material";
import { getPoll } from "../../Features/api/pollApi";

import { EditPollForm } from "./editPollForm";

export default function AdminPollList({ type }) {
  const [polls, setPolls] = useState([]);
  const [NewPoll, setNewPoll] = useState(false);
  const [editingPoll, setEditingPoll] = useState(null);

  const handleEdit = (edit) => {
    console.log(polls);
    setEditingPoll(edit);
  };

  useEffect(() => {
    async function fetchPolls() {
      const fetchedPolls = await getPoll();
      const filteredPolls = filterPollsByType(fetchedPolls, type);
      setPolls(filteredPolls);
    }
    fetchPolls();
  }, []);

  if (polls.length === 0) {
    return <Typography align="center">No polls found.</Typography>;
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
    >
      {polls.map((poll) => {
        return (
          <Card key={poll._id} style={{ padding: "16px" }}>
            <CardHeader
              title={poll.title}
              subheader={`Total Votes: ${poll.totalVotes}`}
            />
            <CardContent>
              <Typography variant="body2" gutterBottom>
                {poll.description}
              </Typography>

              {poll.options.map((option) => {
                const votePercentage = poll.totalVotes
                  ? (option.votes / poll.totalVotes) * 100
                  : 0;

                return (
                  <div key={option.text} style={{ marginBottom: "12px" }}>
                    <Typography variant="body2">
                      {option.text} ({option.votes} votes)
                    </Typography>

                    {votePercentage > 0 && (
                      <LinearProgress
                        variant="determinate"
                        value={votePercentage}
                        sx={{
                          height: "10px",
                          borderRadius: "5px",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor:
                              votePercentage >= 75
                                ? "green"
                                : votePercentage >= 50
                                ? "blue"
                                : votePercentage >= 25
                                ? "orange"
                                : "red",
                          },
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </CardContent>

            <CardActions>
              <Button
                size="small"
                startIcon={<Edit />}
                onClick={() => handleEdit(poll)}
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        );
      })}
      <Modal open={!!editingPoll} onClose={() => setEditingPoll(null)}>
        <Box className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full mx-auto mt-24">
          {editingPoll && (
            <EditPollForm
              poll={editingPoll}
              setEditingPoll={setEditingPoll}
              setPolls={setPolls}
              type={type}
            />
          )}

          <Button
            variant="contained"
            color="secondary"
            onClick={() => setEditingPoll(null)}
            className="mt-4"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

function filterPollsByType(polls, type) {
  switch (type) {
    case "active":
      return polls.filter((p) => p.isActive);
    case "expired":
      return polls.filter((p) => !p.isActive);
    default:
      return polls;
  }
}
