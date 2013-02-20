/*
 * Copyright 2012-2013 Continuuity,Inc. All Rights Reserved.
 */

package com.continuuity.api.flow.flowlet;

/**
 * Default implementation of {@link Flowlet} for easy extension.
 * It uses result of {@link #getName()} as the Flowlet name
 * and result of {@link #getDescription()}} as the Flowlet description.
 * <p>
 *   Children classes can overrides the {@link #getName()}} and/or {@link #getDescription()}
 *   methods to have custom namings. Children can also overrides the {@link #configure()} method
 *   to have more controls on customization the {@link FlowletSpecification}.
 * </p>
 */
public abstract class AbstractFlowlet implements Flowlet {

  private FlowletContext flowletContext;

  @Override
  public FlowletSpecification configure() {
    return FlowletSpecification.Builder.with()
      .setName(getName())
      .setDescription(getDescription())
      .build();
  }

  @Override
  public void initialize(FlowletContext context) throws FlowletException {
    this.flowletContext = context;
  }

  @Override
  public void destroy() {
    // Nothing to do.
  }

  /**
   * @return An instance of {@link FlowletContext} when this Flowlet is running. Otherwise return
   *         {@code null} if it is not running or not yet initialized by the runtime environment.
   */
  protected final FlowletContext getContext() {
    return flowletContext;
  }

  /**
   * @return {@link Class#getSimpleName() Simple classname} of this {@link Flowlet}
   */
  protected String getName() {
    return getClass().getSimpleName();
  }

  /**
   * @return A descriptive message about this {@link Flowlet}.
   */
  protected String getDescription() {
    return String.format("Flowlet for doing %s.", getName());
  }
}
