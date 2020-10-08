import React, {useState, useEffect, Fragment} from 'react';
import './../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, InputGroup, FormControl, CardDeck, Card, Image, ListGroup} from 'react-bootstrap';

//font awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch, faEnvelope, faMobileAlt, faClock, faCalendarAlt, faUserFriends, faShareSquare, faComment, faRetweet, faHeart} from '@fortawesome/free-solid-svg-icons';

//file icons 
import 'file-icon-vectors/dist/file-icon-classic.css';

//avatar
import img from './../resources/avatars/avatar.svg';


//empty msg
export const ShowEmptyComponent = (props) => {
  return(
       <div className="emptctr">
         <Row xs={12} lg={12} md={12} sm={12}>
          <span className="emptmsgdis">{props.message}</span>
         </Row> 
       </div> 

  )
}



//tweet item
export const TweetItemComponent = (props) => { 
  return(
    <ListGroup.Item>
    <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
      <Col xs={12} sm={12} lg={4} md={4}>
              <Image src={img} roundedCircle />
      </Col> 
      <Col xs={12} sm={12} lg={8} md={8}>
        <span data-testid="" className="ctname atur gpullr">{props.Account}</span> <span className="tsmpt">{props.User}</span> . <span className="tsmpt">{props.Time}</span>       
      </Col>  
    </Row>
    <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
      <Col>
        <span>{props.Message}</span>
      </Col>
    </Row>
    <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
      <Col>
        <FontAwesomeIcon icon={faComment} /> <span className="twteles">{props.Comments}</span>
      </Col>
      <Col>
        <FontAwesomeIcon icon={faRetweet} /> <span className="twteles">{props.Retweets}</span>
      </Col>
      <Col>
        <FontAwesomeIcon icon={faHeart} /> <span className="twteles">{props.Likes}</span>
      </Col>
    </Row>
  </ListGroup.Item>
  )
}



//tweet card
export const TweetCardComponent =(props) => {
  const [filter, setFilter] = useState({});
  const [res, setRes] = useState([]);
  const [body, setBody] = useState(null);

  useEffect(()=>{
    if (typeof props.filter !== 'undefined')
    {
      setFilter(props.filter);
    }
  },[props])

  useEffect(()=>{
    fetch('/data-sources/tweet.json').then(response => response.json()).then(tweetData => {
      if(tweetData !== ''){
        let filtered_res = tweetData.tweet.filter(entry => entry.matching_terms.some(term => term === filter.qval));
        setRes(filtered_res);
      }
    });  
  },[filter])


  useEffect(()=>{
    let body_dat = res.map(ele =>   
    <TweetItemComponent
    key={ele.id}
    Id={ele.id?ele.id:""}
    User={ele.user?ele.user:""}
    Date={ele.date?new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(new Date(ele.date)):""} 
    Message={ele.message?ele.message:""}
    Time={ele.time?ele.time:""}
    Account = {ele.account?ele.account:""}
    Likes = {ele.likes?ele.likes:""}
    Retweets = {ele.retweets?ele.retweets:""}
    Comments={ele.comments?ele.comments:""}
    />       
  ) 
    setBody(body_dat);    
  },[res])

  return(
    <Card style={{height: "400px"}}>
      <Card.Header>Tweets</Card.Header>
      <Card.Body style={{padding : "0px", overflowY: "scroll"}}>
       {body === null || body.length === 0 ? <ShowEmptyComponent message={'No Tweets to display!'}/> : <ListGroup>{body}</ListGroup>}  
      </Card.Body>
    </Card>
  )
}


//slack Item
export const SlackItemComponent = (props) => {
return(  
  <ListGroup.Item>
  <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
    <Col xs={12} sm={12} lg={4} md={4}>
            <Image src={img} roundedCircle />
    </Col> 
    <Col xs={12} sm={12} lg={8} md={8}>
      <span className="ctname atur">{props.Author}</span> <span className="tsmpt">{props.Time}</span> <br />       
    </Col>  
  </Row>
  <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
    <Col>
      <span>{props.Message}</span>
    </Col>
  </Row>
</ListGroup.Item>
)

}




//slack card
export const SlackCardComponent =(props) => {
  const [filter, setFilter] = useState({});
  const [res, setRes] = useState([]);
  const [body, setBody] = useState(null);

  useEffect(()=>{
    if (typeof props.filter !== 'undefined')
    {
      setFilter(props.filter);
    }
  },[props])

  useEffect(()=>{
    fetch('/data-sources/slack.json').then(response => response.json()).then(slackData => {
      if(slackData !== ''){
        let filtered_res = slackData.slack.filter(entry => entry.matching_terms.some(term => term === filter.qval));
        setRes(filtered_res);
      }
    });
  },[filter])

  useEffect(()=>{
    let body_dat = res.map(ele =>   
    <SlackItemComponent
    key={ele.id}
    Id={ele.id?ele.id:""}
    Channel={ele.channel?ele.channel:""}
    Author={ele.author?ele.author:""}
    Date={ele.date?new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(new Date(ele.date)):""} 
    Time={ele.time?ele.time:""}
    Message={ele.message?ele.message:""}
    />       
  ) 
    setBody(body_dat);    
  },[res])


  return(
    <Card style={{height: "400px"}}>
      <Card.Header>Slack</Card.Header>
      <Card.Body style={{padding : "0px", overflowY: "scroll"}}>
        {body === null || body.length === 0 ? <ShowEmptyComponent message={'No Messages to display!'}/> : <ListGroup>{body}</ListGroup>}  
      </Card.Body>
    </Card>
  )
}


//dropbox item
export const DropboxItemComponent = (props) => {
  return(
    <ListGroup.Item>
        <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
          <Col>
            <span className={`fiv-cla fiv-icon-${props.Type} icstyle`}></span>
          </Col>
        </Row>
        <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
          <Col>
            <span className="cltitle">{props.Title}</span>
          </Col>
        </Row>
        <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
          <Col xs={2} sm={2} lg={2} md={2}>
            <span><FontAwesomeIcon icon={faCalendarAlt} /></span>
          </Col>
          <Col xs={10} sm={10} lg={10} md={10}>
            <span className="ctlstcnt">{props.Created}</span>    
          </Col>
        </Row>
        <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
          <Col xs={2} sm={2} lg={2} md={2}>
            <span><FontAwesomeIcon icon={faShareSquare} /></span>
          </Col>
          <Col xs={10} sm={10} lg={10} md={10}>
            <span className="ctlstcnt">{props.Shared.join("\n")}</span>    
          </Col>  
        </Row>
    </ListGroup.Item>
  )
}



//dropbox card
export const DropboxCardComponent =(props) => {
  const [filter, setFilter] = useState({});
  const [res, setRes] = useState([]);
  const [body, setBody] = useState(null);

  useEffect(()=>{
    if (typeof props.filter !== 'undefined')
    {
      setFilter(props.filter);
    }    
  },[props])

  useEffect(()=>{
    fetch('/data-sources/dropbox.json').then(response => response.json()).then(dropboxData => {
      if(dropboxData !== ''){
        let filtered_res = dropboxData.dropbox.filter(ele => ele.matching_terms.some(term => term === filter.qval)); 
        setRes(filtered_res);
      }
    });  
  },[filter])

  useEffect(()=>{
    let body_dat = res.map(ele =>   
    <DropboxItemComponent
    key={ele.id}
    Id={ele.id?ele.id:""}
    Title={ele.title?ele.title:""}
    Path={ele.path?ele.path:""}
    Created={ele.created?new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(new Date(ele.created)):""} 
    Shared={ele.shared_with?ele.shared_with:["n/a"]}
    Type={ele.type?ele.type:""}
    />       
  ) 
    setBody(body_dat);    
  },[res])

  return(
    <Card style={{height: "400px"}}>
      <Card.Header>Dropbox</Card.Header>
      <Card.Body style={{padding : "0px", overflowY: "scroll"}}>
        {body === null || body.length === 0 ? <ShowEmptyComponent message={'No Files to display!'}/> : <ListGroup>{body}</ListGroup>}  
      </Card.Body>
    </Card>
  )
}


//calendar Item
export const CalendarItemComponent = (props) => {
  return(
    <ListGroup.Item>
        <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
          <Col>
            <span className="cltitle">{props.Title}</span>
          </Col>
        </Row>
        <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
          <Col xs={2} sm={2} lg={2} md={2}>
            <span><FontAwesomeIcon icon={faCalendarAlt} /></span>
          </Col>
          <Col xs={10} sm={10} lg={10} md={10}>
            <span className="ctlstcnt">{props.Date}</span>
          </Col>
        </Row>
        <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
          <Col xs={2} sm={2} lg={2} md={2}>
            <span><FontAwesomeIcon icon={faClock} /></span>
          </Col>
          <Col xs={10} sm={10} lg={10} md={10}>
            <span className="ctlstcnt">{`${props.Start} to  ${props.End}`} </span>
          </Col>
        </Row>
        <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
          <Col xs={2} sm={2} lg={2} md={2}>
            <span><FontAwesomeIcon icon={faUserFriends} /></span>
          </Col>
          <Col xs={10} sm={10} lg={10} md={10}>
            <span className="ctlstcnt"> {props.Invitees} </span>
          </Col>
        </Row>
    </ListGroup.Item>
  )
}




//calendar card
export const CalendarCardComponent =(props) => {
  const [filter, setFilter] = useState({});
  const [res, setRes] = useState([]);
  const [body, setBody] = useState(null);

  useEffect(()=>{
    if (typeof props.filter !== 'undefined')
    {
      setFilter(props.filter);
    }
  },[props])

  useEffect(()=>{
    fetch('/data-sources/calendar.json').then(response => response.json()).then(calendarData => {
      if(calendarData !== ''){
        let filtered_res = calendarData.calendar.filter(entry => entry.matching_terms.some(term => term === filter.qval));
        setRes(filtered_res);
      }
    });    
  },[filter])

  useEffect(()=>{
    let body_dat = res.map(ele =>   
    <CalendarItemComponent
    key={ele.id}
    Id={ele.id?ele.id:""}
    Title={ele.title?ele.title:""}
    Invitees={ele.invitees?ele.invitees:""}
    Date={ele.date?new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(new Date(ele.date)):""} 
    Start={ele.start?ele.start:""}
    End={ele.end?ele.end:""}  
    />       
  ) 
    setBody(body_dat);    
  },[res])

  return(
    <Card style={{height: "400px"}}>
      <Card.Header>Calendar</Card.Header>
      <Card.Body style={{padding : "0px", overflowY: "scroll"}}>
        {body === null || body.length === 0 ? <ShowEmptyComponent message={'No Events to display!'}/> : <ListGroup>{body}</ListGroup>}
      </Card.Body>
    </Card>
  )
}




//contact item
export const ContactItemComponent = (props) => {
  return(
    <ListGroup.Item>
        <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
          <Col xs={12} sm={12} lg={4} md={4}>
            <Image src={img} roundedCircle />
          </Col>
          <Col xs={12} sm={12} lg={8} md={8}>
            <span data-testid="id-ctName" className="ctname">{props.Name}</span><br />
            <span data-testid="id-cpName">{props.Company}</span>
          </Col>
        </Row>
        <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
          <Col xs={2} sm={2} lg={2} md={2}>
            <span>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </Col>
          <Col xs={10} sm={10} lg={10} md={10}>
            <span data-testid="id-ctEmails" className="ctlstcnt">{props.Emails.join(",")}</span>
          </Col>
        </Row>
        <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
          <Col xs={2} sm={2} lg={2} md={2}>
            <span>
              <FontAwesomeIcon icon={faMobileAlt} />
            </span>
          </Col>
          <Col xs={10} sm={10} lg={10} md={10}>
            <span data-testid="id-ctPhone" className="ctlstcnt">{props.Phones.join(",")}</span>
          </Col>
        </Row>
        <Row xs={12} sm={12} lg={12} md={12} className="lstpadder">
          <Col xs={2} sm={2} lg={2} md={2}>
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
          </Col>
          <Col xs={10} sm={10} lg={10} md={10}>
            <span data-testid="id-ctLstct" className="ctlstcnt">{props.LastContact}</span>
          </Col>
          <Col></Col>
        </Row>
    </ListGroup.Item>
  )
}




//contact card
export const ContactCardComponent = (props) => {
  const [filter, setFilter] = useState({});
  const [res, setRes] = useState([]);
  const [body, setBody] = useState(null);

  useEffect(()=>{
    if (typeof props.filter !== 'undefined')
    {
      setFilter(props.filter);
    }    
  },[props])

  useEffect(()=>{
    fetch('/data-sources/contacts.json').then(response => response.json()).then(contactsData => {
      if(contactsData !== ''){
        let filtered_res = contactsData.contacts.filter(contact => contact.matching_terms.some(term => term === filter.qval)); 
        setRes(filtered_res);
      }
    });  
  },[filter])

  useEffect(()=>{
    let body_dat = res.map(ele =>   
    <ContactItemComponent
    key={ele.id}
    Id={ele.id?ele.id:""} 
    Name= {ele.name?ele.name:""}
    Company ={ele.company?ele.company:""}
    Emails = {ele.emails?ele.emails:""}
    Phones = {ele.phones?ele.phones:""}
    LastContact = {ele.last_contact? new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(new Date(ele.last_contact)):""}  
    />       
  )   
  setBody(body_dat);
  },[res])

  return(
    <Card style={{height: "400px"}}>
      <Card.Header>Contacts</Card.Header>
      <Card.Body style={{padding : "0px", overflowY: "scroll"}}>
        {body === null || body.length === 0 ? <ShowEmptyComponent message={"No Contacts to display!"}/> : <ListGroup>{body}</ListGroup>}
      </Card.Body>
    </Card>
  )
}

export const SearchComponent = (props) => {
  const [query, setQuery] = useState('');

  const handleEnter = (e) => {
    if(e.key === "Enter"){
      props.queryHandler(query)
    }
  }
  
  const handleSumbit = (e) => {
    props.queryHandler(query)
  }

  const styles= {
    outline: "none",
  boxShadow:"none",
  border:"1px solid #ccc"
  }

  return(
    <Fragment>
      <InputGroup className="mb-3">
      <FormControl style={styles}
        placeholder="Search something!"
        aria-label="search"
        aria-describedby="basic-addon1"
        onChange={(e)=>{setQuery(e.target.value)}}
        onKeyDown = {(e) => handleEnter(e)}
      />
      <InputGroup.Append>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faSearch} onClick={(e) => handleSumbit(e)}/>
        </InputGroup.Text>        
      </InputGroup.Append>
    </InputGroup>    
  </Fragment>
  )
}

export const HeaderComponent = (props) => {
  return(
    <h1>Welcome to Acme Search</h1>
  )
}

function App() {
  const [query, setQuery] = useState({});

  const handleQueryChange = (q) => {
    //create query obj
    let qobj = {
      qval: q,
      tspt: Date.now()
    }

    setQuery(qobj);
  } 

  return (
    <div className="App">
      <Container fluid>
        <Row style={{marginTop: "50px"}}>
          <Col xs={12} sm={12} lg={12} md={12}>
            <HeaderComponent />
          </Col>
        </Row>
        <Row style={{marginTop: "25px"}}>
          <Col xs={12} sm={12} lg={{span : 4, offset: 4}} md={{span : 4, offset: 4}}>
              <SearchComponent  queryHandler={handleQueryChange}/>
          </Col>           
        </Row>

        <Row style={{marginTop: "50px"}}>
          <Col xs={12} sm={12} lg={12} md={12}>
            <CardDeck>
              <ContactCardComponent filter={query}/>
              <CalendarCardComponent filter={query}/>
              <DropboxCardComponent filter={query}/>
              <SlackCardComponent filter={query}/>
              <TweetCardComponent filter={query}/>
            </CardDeck>
          </Col>
        </Row>
      </Container>   
    </div>
  );
}

export default App;
