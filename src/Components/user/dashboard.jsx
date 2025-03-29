
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Container, Box, Tab, Tabs, Typography, CircularProgress, Alert } from "@mui/material"
import Header from "./header"
import PollList from "./pollList"
import { getPoll } from "../../Features/api/pollApi"

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
  

  const user = useSelector((state) => state.user.userInfo)
  console.log(user , "user")

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
    console.log(poll ,"poll.isActive in active filter");
    return poll.isActive === true;
  });
  
  const expiredPolls = polls.filter((poll) => {
    console.log(poll.isActive, "poll.isActive in expired filter");
    return poll.isActive === false;
  });

  console.log(activePolls , expiredPolls ,  "active and expired")

  return (
    <>
    {polls && activePolls && expiredPolls &&  (  
        <> 
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="poll tabs" centered>
              <Tab label={`Active Polls (${activePolls.length})`} />
              <Tab label={`Expired Polls (${expiredPolls.length})`} />
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
                {expiredPolls.length > 0 ? (
                  <PollList polls={expiredPolls} user={user} isActive={false} />
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
      )}
    </>
  )
}

