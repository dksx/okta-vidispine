/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from './config';
import Home from './Home';
import CustomLoginComponent from './Login';
import Token from './Token';
import VS from './VS';
import Navbar from './Navbar';
import Profile from './Profile';


const HasAccessToRouter = () => {
  const history = useHistory(); // example from react-router

  const customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    history.push('/okta-vidispine/login');
  };

  return (
    <Security
      {...config.oidc}
      onAuthRequired={customAuthHandler}
    >
      <Navbar />
      <Container text style={{ marginTop: '7em', width: '100%', height: '100%' }}>
        <Route path="/okta-vidispine/" exact component={Home} />
        <Route path="/okta-vidispine/implicit/callback" component={LoginCallback} />
        <Route path="/okta-vidispine/login" component={CustomLoginComponent} />
        <SecureRoute path="/okta-vidispine/token" component={Token} />
        <SecureRoute path="/okta-vidispine/profile" component={Profile} />
        <SecureRoute path="/okta-vidispine/test" component={VS} />
      </Container>
    </Security>
  );
};

const App = () => (
  <div>
    <Router>
      <HasAccessToRouter />
    </Router>
  </div>
);

export default App;
