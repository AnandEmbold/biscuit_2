/**
 * Licensed to Ravel, Inc. under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  Ravel, Inc. licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */
package org.goldenorb.types.message;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.net.InetSocketAddress;

import org.goldenorb.types.message.IntMessage;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.ipc.RPC;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class SampleIntMessageTest {
  public final static int MESSAGE_VALUE = 3;
  public final static String DESTINATION_VALUE = "Destination!";
  public final static int SERVER_PORT = 13000;
  
  private RPCProtocol<IntMessage,IntWritable> client;
  private RPCServer<IntMessage,IntWritable> server;
  
  private IntMessage im0 = new IntMessage();
  
/**
 * Constructor
 *
 */
  public SampleIntMessageTest() {
    im0.setMessageValue(new IntWritable(MESSAGE_VALUE));
    im0.setDestinationVertex(DESTINATION_VALUE);
  }
  
/**
 * 
 */
  @SuppressWarnings("unchecked")
  @Before
  public void startServer() throws IOException {
    server = new RPCServer<IntMessage,IntWritable>(SERVER_PORT);
    server.start();
    Configuration conf = new Configuration();
    InetSocketAddress addr = new InetSocketAddress("localhost", SERVER_PORT);
    if (client == null) client = (RPCProtocol<IntMessage,IntWritable>) RPC.waitForProxy(
      RPCProtocol.class, RPCProtocol.versionID, addr, conf);
  }
  
  @Test
  public void testRPC() {
    IntMessage im1 = client.sendAndReceiveMessage(im0, DESTINATION_VALUE, new IntWritable(
        MESSAGE_VALUE));
    assertTrue(im0.get() == client.getMessage().get());
    assertEquals(im0.getDestinationVertex(), client.getMessage().getDestinationVertex());
    assertEquals(im1.getDestinationVertex(), DESTINATION_VALUE);
    assertTrue(((IntWritable) im1.getMessageValue()).get() == MESSAGE_VALUE);
  }
  
/**
 * 
 */
  @After
  public void stopServer() {
    server.stop();
  }
}
