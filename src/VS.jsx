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

import axios from 'axios';
import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Button, Input, Header, Icon, } from 'semantic-ui-react';

const VS = () => {
  const { authState } = useOktaAuth();
  const [token, setToken] = useState(null);
  const [vaas, setVaas] = useState('');
  const [version, setVersion] = useState(null);

  // fetch messages
  useEffect(() => {
    if (authState.isAuthenticated) {
      const { accessToken } = authState;
      setToken(accessToken);
    }
  }, [authState]);

  const getVersion = async () => {

    const options = {
      headers: { "Authorization": `Bearer ${token}`, 'Accept': 'text/plain' },
    };

    try {
      const upload = await axios.get(`https://${vaas}/API/version`, options);
      setVersion(upload.data);
    } catch (error) {
      setVersion(String(error));
    }
  };

  return (
    <div>
      <Header as="h1">
        <Icon name="user secret" />
        Vidispine test call
      </Header>
      <Input style={{ width: '100%', marginTop: '1rem' }} onChange={e => setVaas(e.target.value)} label='https://' placeholder='xxx.myvidispine.com' />
      <Button onClick={(getVersion)} style={{ marginTop: '1rem' }} color='teal'>Get Version</Button>
      <div style={{ whiteSpace: 'pre-line', marginTop: '1rem' }}>{version}</div>
    </div>
  );
};

export default VS;
