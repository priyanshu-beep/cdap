/*
 * Copyright © 2016 Cask Data, Inc.
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
package co.cask.cdap.proto.codec;

import co.cask.cdap.proto.DefaultThrowable;
import com.google.gson.JsonArray;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.JsonSerializationContext;

import java.lang.reflect.Constructor;
import java.lang.reflect.Type;
import java.util.Iterator;

/**
 * Codec for {@link DefaultThrowable}.
 */
public final class DefaultThrowableCodec extends AbstractSpecificationCodec<DefaultThrowable> {

  @Override
  public JsonElement serialize(DefaultThrowable src, Type typeOfSrc, JsonSerializationContext context) {
    JsonObject json = new JsonObject();
    json.addProperty("className", src.getClassName());
    json.addProperty("message", src.getMessage());
    json.add("stackTraces", context.serialize(src.getStackTraces(), StackTraceElement[].class));
    json.add("cause", context.serialize(src.getCause(), DefaultThrowable.class));
    return json;
  }

  @Override
  public DefaultThrowable deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
    throws JsonParseException {
    JsonObject jsonObj = json.getAsJsonObject();
    String className = jsonObj.get("className").getAsString();
    String message = jsonObj.get("message").getAsString();
    JsonArray stackTraces = jsonObj.get("stackTraces").getAsJsonArray();
    StackTraceElement[] stackTraceElements = context.deserialize(stackTraces, StackTraceElement[].class);
    final JsonElement cause = jsonObj.get("cause");
    if (cause == null) {
      return new DefaultThrowable(className, message, stackTraceElements, null);
    }
    DefaultThrowable dfc = context.deserialize(cause, DefaultThrowable.class);
    return new DefaultThrowable(className, message, stackTraceElements, dfc);
  }
}
