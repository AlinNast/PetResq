import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import PostDashboard from '../../features/posts/dashboard/PostDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import PostForm from '../../features/posts/form/PostForm';
import PostDetails from '../../features/posts/details/PostDetails';
import Footer from './Footer';
//@ts-ignore
import { Helmet } from "react-helmet";
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';


function App() {

  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    document.title = "PetResQ"
  }, [])

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) 
    return <LoadingComponent />;
  

  

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route 
        path ={'/(.+)'}
        render = {() => (
          <>
            <NavBar />
            <Container style={{marginTop: '10em'}}>
              <Switch>
                <Route exact path='/posts' component={PostDashboard} />
                <Route path='/posts/:id' component={PostDetails} />
                <Route key={location.key} path={['/createPost', '/edit/:id']} component={PostForm} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/login' component={LoginForm} />

                <Route component={NotFound} />
              </Switch>  
            </Container>
            <Footer></Footer>
          </>
        )}
      />
      {/* <Helmet>
            <script>
            {'let rellax = new Rellax(\'.rellax\',{{horizontal: true, vertical: false, speed: 1.5}});'}
            </script>
      </Helmet> */}
    </>
  );
}


export default observer (App);
