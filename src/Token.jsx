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

import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Header, Icon,} from 'semantic-ui-react';

const Messages = () => {
  const { authState } = useOktaAuth();
  const [token, setToken] = useState(null);

  // fetch messages
  useEffect(() => {
    if (authState.isAuthenticated) {
      const { accessToken } = authState;
      console.log(accessToken);
      setToken(accessToken);
    }
  }, [authState]);

  return (
    <div>
      <Header as="h1">
        <Icon name="user secret"/>
        Access Token
      </Header>
      <div style={{'wordBreak': 'break-all'}}>
        <strong>
        {token}
        </strong>
      </div>    
    </div>
  );
};

export default Messages;
