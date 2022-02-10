import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Segment, Grid, Header, Image, ButtonGroup } from "semantic-ui-react";
import './homepage.css';
import Sky from './Sky.png';
import Field from './Field.png';
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";


export default observer (function HomePage() {
    const {userStore, modalStore} = useStore();

    
    return (

        <>
        <Segment textAlign='center' vertical className='masthead'>
            <Container text>
                <Header inverted as='h1' >
                    <Image width='150' height='150' src="/assets/logo.png" alt='logo' style={{ marginBottom: 12 }}/>
                    Pet Resq
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content="Welcome"/>
                        <Button className="ui button" as={Link} to='/posts' size="huge"inverted>Go to posts</Button>
                    </>
                ) : (
                    <Grid>
                        <Grid.Column textAlign="center">
                            <ButtonGroup widths='7' className="ui horizontal buttons" >
                                <Button className="ui button" onClick={() => modalStore.openModal(<LoginForm/>)} size="huge" inverted>Login</Button>
                                <Button className="ui button" onClick={() => modalStore.openModal(<RegisterForm/>)} size="huge" inverted>Register</Button>
                                <Button className="ui button" as={Link} to='/posts' size="huge" inverted>Anonymous</Button>
                            </ButtonGroup>
                        </Grid.Column>
                    </Grid>
                )}
            </Container>
        </Segment>
        
        
            {/* <div className="wrapper">
                <header> */}

              
                

                
                    
                    {/* <Segment>
                        <Button.Group widths='7'>
                            <Button as={Link} to='/login' size="huge" color='blue' inverted>
                                Login!
                            </Button>
                            <Button as={Link} to='/register' size="huge" color='blue' inverted>
                                Register!
                            </Button>
                            <Button as={Link} to='/posts' size="huge" color='blue' inverted>
                                Anonymous
                            </Button>
                        </Button.Group>
                    </Segment> */}
                    {/* <img src={Sky} className="background" />
                    <h1 className="title">Welcome</h1>
                </header> */}
                
                
                {/* <div className="option1">
                    Are you here to adopt a pet?
                    <Link to='/posts' > Adopt</Link>
                </div>
                <div className="option2">
                    Did you furry firend got lost?
                    <Link to='/posts' > Search</Link>
                </div>
                <div className="option3">
                    Did you find a lost pet?
                    <Link to='/posts' > Adopt</Link>
                </div> */}
            {/* </div> */}
            
        </> 

            
    )
})


