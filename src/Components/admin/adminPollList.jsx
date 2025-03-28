import { useState, useEffect } from "react";
import { Card, CardContent, CardActions, CardHeader, Typography, Button } from "@mui/material";
import { Visibility, Edit } from "@mui/icons-material";

export default function AdminPollList({ type }) {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    
    setTimeout(() => {
      const fetchedPolls = getMockPolls();
      const filteredPolls = filterPollsByType(fetchedPolls, type);
      setPolls(filteredPolls);
    }, 500);
  }, [type]);

  if (polls.length === 0) {
    return <Typography align="center">No polls found.</Typography>;
  }

  return (
    <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
      {polls.map((poll) => (
        <Card key={poll.id}>
          <CardHeader title={poll.title} subheader={`Votes: ${poll.totalVotes}`} />
          <CardContent>
            <Typography variant="body2">{poll.description}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" startIcon={<Visibility />} href={`/polls/${poll.id}`}>View</Button>
            <Button size="small" startIcon={<Edit />} href={`/admin/edit-poll/${poll.id}`}>Edit</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

function getMockPolls() {
  return [
    { id: "1", title: "New Features?", description: "Vote for the next feature.", totalVotes: 30, isActive: true },
    { id: "2", title: "Lunch Poll", description: "Choose the lunch menu.", totalVotes: 50, isActive: false },
  ];
}

function filterPollsByType(polls, type) {
  switch (type) {
    case "active": return polls.filter(p => p.isActive);
    case "expired": return polls.filter(p => !p.isActive);
    default: return polls;
  }
}
