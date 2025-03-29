

import { useEffect, useState } from "react"
import { updatevote } from "../../Features/api/pollApi"
import { toast } from "sonner"

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Box,
  Chip,
  Divider,
} from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import HowToVoteIcon from "@mui/icons-material/HowToVote"

export default function PollItem({ poll, user, isActive }) {
  const [selectedOption, setSelectedOption] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [voted, setVoted] = useState(false)


  
  const isAllowedToVote =
    !poll?.isPrivate || (poll.allowedUsers && poll.allowedUsers.includes(user?.email?.toLowerCase()))

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const handleVote = async () => {
    if (!selectedOption) return

    try {
      setSubmitting(true)
      setError(null)
      

      const updatedPoll = { ...poll, options: poll.options.map(option => 
        option.text === selectedOption ? { ...option, votes: option.votes + 1 } : option
      )};

      console.log(updatedPoll , poll.id , "updatedPoll")
      const updatePoll = await updatevote(poll.id ,selectedOption)
      console.log(updatePoll ,  "updateedPoll")
      toast.success("vote saved Successfully")
      

      setVoted(true)
      
    } catch (err) {
      console.error("Error submitting vote:", err)
      setError("Failed to submit your vote. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const totalVotes = poll?.totalVotes || 0

  return (
    <>  
    {poll &&  (  
      <> 
    
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="h6" component="div" gutterBottom noWrap>
            {poll.title}
          </Typography>
          <Chip
            size="small"
            color={isActive ? "success" : "error"}
            label={isActive ? "Active" : "Expired"}
            icon={<AccessTimeIcon fontSize="small" />}
          />
        </Box>

        {poll.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {poll.description}
          </Typography>
        )}

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, display: "flex", alignItems: "center" }}>
            <HowToVoteIcon fontSize="small" sx={{ mr: 0.5 }} />
            Total votes: {totalVotes}
          </Typography>

          {isActive && isAllowedToVote && !voted ? (
            <FormControl component="fieldset" fullWidth>
              <RadioGroup name={`poll-options-${poll.id}`} value={selectedOption} onChange={handleOptionChange}>
                {poll.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option.text}
                    control={<Radio />}
                    label={option.text}
                    disabled={submitting}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ) : (
            <Box sx={{ width: "100%" }}>
              {poll.options.map((option, index) => {
                const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0

                return (
                  <Box key={index} sx={{ mb: 1.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2">{option.text}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {option.votes} votes ({percentage}%)
                      </Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={percentage} sx={{ height: 8, borderRadius: 1 }} />
                  </Box>
                )
              })}
            </Box>
          )}
        </Box>
      </CardContent>

      {isActive && isAllowedToVote && !voted && (
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={!selectedOption || submitting}
            onClick={handleVote}
          >
            {submitting ? "Submitting..." : "Vote"}
          </Button>
        </CardActions>
      )}

      {isActive && !isAllowedToVote && (
        <CardActions>
          <Typography variant="body2" color="error" sx={{ width: "100%", textAlign: "center" }}>
            You are not allowed to vote on this poll
          </Typography>
        </CardActions>
      )}

      {error && (
        <CardActions>
          <Typography variant="body2" color="error" sx={{ width: "100%", textAlign: "center" }}>
            {error}
          </Typography>
        </CardActions>
      )}
    </Card>
    </>
    )}

    </>
  )
}

