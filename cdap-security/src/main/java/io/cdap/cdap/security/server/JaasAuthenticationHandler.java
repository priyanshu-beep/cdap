/*
 * Copyright © 2014-2016 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package io.cdap.cdap.security.server;

import org.eclipse.jetty.jaas.JAASLoginService;
import org.eclipse.jetty.security.Authenticator;
import org.eclipse.jetty.security.DefaultIdentityService;
import org.eclipse.jetty.security.IdentityService;
import org.eclipse.jetty.security.LoginService;
import org.eclipse.jetty.security.authentication.BasicAuthenticator;

/**
 * An abstract authentication handler that supports the JAAS interface for external authentication.
 */
public abstract class JaasAuthenticationHandler extends AbstractAuthenticationHandler {

  @Override
  public IdentityService getHandlerIdentityService() {
    return new DefaultIdentityService();
  }

  @Override
  protected Authenticator getHandlerAuthenticator() {
    return new BasicAuthenticator();
  }

  @Override
  protected LoginService getHandlerLoginService() {
    JAASLoginService jaasLoginService = new JAASLoginService();
    jaasLoginService.setLoginModuleName("jaasLoginService");
    jaasLoginService.setConfiguration(getLoginModuleConfiguration());
    return jaasLoginService;
  }
}
