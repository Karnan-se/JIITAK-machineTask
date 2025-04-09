
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Container, Box, Tab, Tabs, Typography, CircularProgress, Alert } from "@mui/material"
import Header from "./header"
import PollList from "./pollList"
import { getPoll } from "../../Features/api/pollApi"
import { fetchVote } from "../../Features/api/pollApi"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`poll-tabpanel-${index}`}
      aria-labelledby={`poll-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function PollDashboard() {
  const [tabValue, setTabValue] = useState(1)
  const [polls, setPolls] = useState([])
  const [votedPolls , setVotedPolls] = useState([])
  

  const user = useSelector((state) => state.user.userInfo)
  if(!user){
    return null
  }
  
  useEffect(()=>{
    try {
      const fetchVoteCall = async(userId)=>{
        const votedpolls = await fetchVote(userId)
        console.log(votedpolls , "voted Polls")
        setVotedPolls(votedpolls)

      }
      fetchVoteCall(user._id)
      
    } catch (error) {
      console.log(error)
      
    }
  },[])



  useEffect(() => {
    const fetchPolls = async () => {
      try {
    
        const response = await getPoll()
        console.log(response,  "response in getPoll")
     
        setPolls(response)
    
      } catch (err) {
        console.error("Error fetching polls:", err)
    
      } 
    }

    fetchPolls()
  }, [])

  useEffect(()=>{
    console.log(user , "user")

  },[user])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }
 

  const activePolls = polls.filter((poll) => {
    
    return poll.isActive === true && !votedPolls.some((voted)=> voted.pollId == poll.id);
  }).reverse()
  console.log(activePolls ,votedPolls , "vottedPolls djjdj")


  const participatedPolls = polls.filter((polls)=> votedPolls.some((voted)=> voted.pollId == polls.id)).reverse()
  
  const expiredPolls = polls.filter((poll) => {
    
    return poll.isActive === false;
  }).reverse()

  console.log(participatedPolls , "participatedPolls")



  return (
    <>
    
        <> 
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="poll tabs" centered>
              <Tab label={`Active Polls (${activePolls.length})`} />
              <Tab label={`Expired Polls (${expiredPolls.length})`} />
              <Tab label={`particpated polls (${participatedPolls.length})`} />
            </Tabs>
          </Box>
            <>
              <TabPanel value={tabValue} index={0}>
                {activePolls.length > 0 ? (
                  <PollList polls={activePolls} user={user} isActive={true} />
                ) : (
                  <Typography variant="body1" sx={{ textAlign: "center", p: 4 }}>
                    No active polls available.
                  </Typography>
                )}
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                {participatedPolls.length > 0 ? (
                  <PollList polls={expiredPolls} user={user} isActive={false} />
                ) : (
                  <Typography variant="body1" sx={{ textAlign: "center", p: 4 }}>
                    No expired polls available.
                  </Typography>
                )}
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                {expiredPolls.length > 0 ? (
                  <PollList polls={participatedPolls} user={user} isActive={false} />
                ) : (
                  <Typography variant="body1" sx={{ textAlign: "center", p: 4 }}>
                    No expired polls available.
                  </Typography>
                )}
              </TabPanel>
            </>
        
        </Box>
      </Container>
      </>
    
    </>
  )
}

