/*
 * Copyright © 2016-2023 Cask Data, Inc.
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

package io.cdap.cdap.master.startup;

import com.google.common.annotations.VisibleForTesting;
import com.google.common.base.Splitter;
import com.google.common.base.Strings;
import com.google.common.base.Throwables;
import com.google.inject.Guice;
import com.google.inject.Injector;
import io.cdap.cdap.common.conf.CConfiguration;
import io.cdap.cdap.common.conf.Constants;
import io.cdap.cdap.common.guice.ConfigModule;
import io.cdap.cdap.common.guice.DFSLocationModule;
import io.cdap.cdap.common.guice.IOModule;
import io.cdap.cdap.common.guice.KafkaClientModule;
import io.cdap.cdap.common.guice.RemoteAuthenticatorModules;
import io.cdap.cdap.common.guice.ZkClientModule;
import io.cdap.cdap.common.guice.ZkDiscoveryModule;
import io.cdap.cdap.common.startup.CheckRunner;
import io.cdap.cdap.common.startup.ConfigurationLogger;
import io.cdap.cdap.data.runtime.main.ClientVersions;
import io.cdap.cdap.internal.app.spark.SparkCompatReader;
import io.cdap.cdap.security.impersonation.SecurityUtil;
import java.io.IOException;
import java.util.List;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.hadoop.conf.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Runs some sanity checks that indicate whether the CDAP master will be able to start right away.
 */
public class MasterStartupTool {

  private static final Logger LOG = LoggerFactory.getLogger(MasterStartupTool.class);
  private final CheckRunner checkRunner;

  /**
   * Entry point for the master startup tool.
   *
   * @param args Arguments for the tool.
   */
  public static void main(String[] args) {

    CConfiguration cConf = CConfiguration.create();

    ConfigurationLogger.logImportantConfig(cConf);
    LOG.info("Hadoop subsystem versions:");
    LOG.info("  Hadoop version: {}", ClientVersions.getHadoopVersion());
    LOG.info("  ZooKeeper version: {}", ClientVersions.getZooKeeperVersion());
    LOG.info("  Kafka version: {}", ClientVersions.getKafkaVersion());
    LOG.info("CDAP version: {}", ClientVersions.getCdapVersion());
    LOG.info("CDAP Spark compat version: {}", SparkCompatReader.get(cConf));
    LOG.info("Tephra HBase compat version: {}", ClientVersions.getTephraHBaseCompatVersion());

    if (!cConf.getBoolean(Constants.Startup.CHECKS_ENABLED)) {
      return;
    }

    try {
      SecurityUtil.loginForMasterService(cConf);
    } catch (Exception e) {
      LOG.error("Failed to login as CDAP user", e);
      throw Throwables.propagate(e);
    }

    Configuration hConf = new Configuration();

    MasterStartupTool masterStartupTool = new MasterStartupTool(createInjector(cConf, hConf));
    if (!masterStartupTool.canStartMaster()) {
      System.exit(1);
    }
  }

  /**
   * Constructs an instance of a {@link MasterStartupTool}.
   *
   * @param injector The injector to use.
   */
  public MasterStartupTool(Injector injector) {
    this.checkRunner = createCheckRunner(injector);
  }

  /**
   * Returns whether the master will startup successfully.
   *
   * @return Whether the master will startup successfully.
   */
  public boolean canStartMaster() {
    List<CheckRunner.Failure> failures = checkRunner.runChecks();
    if (!failures.isEmpty()) {
      for (CheckRunner.Failure failure : failures) {
        LOG.error("{} failed with {}: {}", failure.getName(),
            failure.getException().getClass().getSimpleName(),
            failure.getException().getMessage(), failure.getException());
        if (failure.getException().getCause() != null) {
          LOG.error("  Root cause: {}",
              ExceptionUtils.getRootCauseMessage(failure.getException().getCause()));
        }
      }
      LOG.error("Errors detected while starting up master. "
          + "Please check the logs, address all errors, then try again.");
      return false;
    }
    return true;
  }

  private CheckRunner createCheckRunner(Injector injector) {
    CheckRunner.Builder checkRunnerBuilder = CheckRunner.builder(injector);
    CConfiguration cConf = injector.getInstance(CConfiguration.class);

    // add all checks in the configured packages
    String startupCheckPackages = cConf.get(Constants.Startup.CHECK_PACKAGES);
    if (!Strings.isNullOrEmpty(startupCheckPackages)) {
      for (String checkPackage : Splitter.on(',').trimResults().split(startupCheckPackages)) {
        LOG.debug("Adding startup checks from package {}", checkPackage);
        try {
          checkRunnerBuilder.addChecksInPackage(checkPackage);
        } catch (IOException e) {
          // not expected unless something is weird with the local filesystem
          LOG.error("Unable to examine classpath to look for startup checks in package {}.",
              checkPackage, e);
          throw new RuntimeException(e);
        }
      }
    }

    // add all checks specified directly by name
    String startupCheckClassnames = cConf.get(Constants.Startup.CHECK_CLASSES);
    if (!Strings.isNullOrEmpty(startupCheckClassnames)) {
      for (String className : Splitter.on(',').trimResults().split(startupCheckClassnames)) {
        LOG.debug("Adding startup check {}.", className);
        try {
          checkRunnerBuilder.addClass(className);
        } catch (ClassNotFoundException e) {
          LOG.error("Startup check {} not found. "
                  + "Please check for typos and ensure the class is available on the classpath.",
              className);
          throw new RuntimeException(e);
        }
      }
    }

    return checkRunnerBuilder.build();
  }

  @VisibleForTesting
  static Injector createInjector(CConfiguration cConf, Configuration hConf) {
    return Guice.createInjector(
        new ConfigModule(cConf, hConf),
        RemoteAuthenticatorModules.getDefaultModule(),
        new ZkClientModule(),
        new ZkDiscoveryModule(),
        new IOModule(),
        new KafkaClientModule(),
        new DFSLocationModule()
    );
  }
}
