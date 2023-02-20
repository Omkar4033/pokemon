import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Bnavbar from "./Bnavbar";
import bm from "./images/bg.png";
import Alert from 'react-bootstrap/Alert';

const App = () => {
  const [poke, setpoke] = useState([]);
  const [name, setname] = useState("");
  const [box, setbox] = useState(false);
  const [details, setdetails] = useState(false);
  const search = async () => {
    let val = String(name);
    if (name === "") {
      alert("Enter the name ");
    } else {
      let str = "https://pokeapi.co/api/v2/pokemon/" + val.toLowerCase();
      const response = await fetch(str);
      setpoke(await response.json());
      setbox(true);
      setname("");
      setdetails(false);
    }
  };
  const setnamedetails = (e) => {
    setname(e.target.value);
  };
  const setd = () => {
    setdetails(true);
  };

    const Errorset=()=>{
      try{
        let str=poke.held_items[0].item.name;
        console.log(str);
        return (
          <Card key="post.id" style={{ width: "90%", height: "80" }}>
                  <Card.Body>
                    <Card.Title>Abilities</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      1.{poke.abilities[0].ability.name}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      2.{poke.abilities[1].ability.name}
                    </Card.Subtitle>
                    <Card.Title>Feature</Card.Title>
                    <Card.Text>The held items are :</Card.Text>
                    <Card.Text>{poke.held_items[0].item.name}</Card.Text>
                    <Card.Text>{poke.held_items[1].item.name}</Card.Text>
                  </Card.Body>
              </Card>
        );
      }
      catch{
          return (
            <>
              {[
                'primary'
              ].map((variant) => (
                <Alert key={variant} variant={variant}>
                  No More Info about Pokemon
                </Alert>
              ))}
            </>
          );
      }
  };
  useEffect(() => {}, []);
  return (
    <div>
      <Bnavbar />
      <Container>
        <Row>
          <Col>
            <InputGroup className="mb-3 p-2">
              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value={name}
                onChange={setnamedetails}
                placeholder="Enter Pokemon name e.g. snorlax,ditto,pikachu"
              />
              <Button
                onClick={search}
                variant="outline-secondary"
                id="button-addon1"
              >
                search
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            {box && (
              <Card key="post.id" style={{ width: "60%", height: "80" }}>
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src={poke.sprites.other.dream_world.front_default}
                  />

                  <Card.Title>{poke.id}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {poke.name}
                  </Card.Subtitle>
                  <Card.Text>
                    Base Experience is {poke.base_experience}
                  </Card.Text>
                  <Card.Link onClick={setd}>Read More</Card.Link>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col md={8} height="auto">
            {details && (
              <Errorset/>
            )}
          </Col>
        </Row>
      </Container>
      <div className="overlay" style={{ backgroundImage: { bm } }} />
     
    </div>
  );
};

export default App;
