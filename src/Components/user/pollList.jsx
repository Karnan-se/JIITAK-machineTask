import { Grid } from "@mui/material"
import PollItem from "./pollItem"

export default function PollList({ polls, user, isActive }) {
  return (
    <Grid container spacing={3}>
      {polls.map((poll) => (
        <Grid item xs={12} sm={6} md={4} key={poll.id}>
          <PollItem poll={poll} user={user} isActive={isActive} />
        </Grid>
      ))}
    </Grid>
  )
}

