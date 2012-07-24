//
// Autogenerated by Thrift Compiler (0.8.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;

var ttypes = require('./flowmonitor_types');
//HELPER FUNCTIONS AND STRUCTURES

var FlowMonitor_add_args = function(args) {
  this.metric = null;
  if (args) {
    if (args.metric !== undefined) {
      this.metric = args.metric;
    }
  }
};
FlowMonitor_add_args.prototype = {};
FlowMonitor_add_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.metric = new ttypes.FlowMetric();
        this.metric.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FlowMonitor_add_args.prototype.write = function(output) {
  output.writeStructBegin('FlowMonitor_add_args');
  if (this.metric) {
    output.writeFieldBegin('metric', Thrift.Type.STRUCT, 1);
    this.metric.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FlowMonitor_add_result = function(args) {
};
FlowMonitor_add_result.prototype = {};
FlowMonitor_add_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FlowMonitor_add_result.prototype.write = function(output) {
  output.writeStructBegin('FlowMonitor_add_result');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FlowMonitor_getFlows_args = function(args) {
  this.accountId = null;
  if (args) {
    if (args.accountId !== undefined) {
      this.accountId = args.accountId;
    }
  }
};
FlowMonitor_getFlows_args.prototype = {};
FlowMonitor_getFlows_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.accountId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FlowMonitor_getFlows_args.prototype.write = function(output) {
  output.writeStructBegin('FlowMonitor_getFlows_args');
  if (this.accountId) {
    output.writeFieldBegin('accountId', Thrift.Type.STRING, 1);
    output.writeString(this.accountId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FlowMonitor_getFlows_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
FlowMonitor_getFlows_result.prototype = {};
FlowMonitor_getFlows_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.LIST) {
        var _size0 = 0;
        var _rtmp34;
        this.success = [];
        var _etype3 = 0;
        _rtmp34 = input.readListBegin();
        _etype3 = _rtmp34.etype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var elem6 = null;
          elem6 = new ttypes.FlowState();
          elem6.read(input);
          this.success.push(elem6);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FlowMonitor_getFlows_result.prototype.write = function(output) {
  output.writeStructBegin('FlowMonitor_getFlows_result');
  if (this.success) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
    for (var iter7 in this.success)
    {
      if (this.success.hasOwnProperty(iter7))
      {
        iter7 = this.success[iter7];
        iter7.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FlowMonitor_getFlowHistory_args = function(args) {
  this.accountId = null;
  this.appId = null;
  this.flowId = null;
  if (args) {
    if (args.accountId !== undefined) {
      this.accountId = args.accountId;
    }
    if (args.appId !== undefined) {
      this.appId = args.appId;
    }
    if (args.flowId !== undefined) {
      this.flowId = args.flowId;
    }
  }
};
FlowMonitor_getFlowHistory_args.prototype = {};
FlowMonitor_getFlowHistory_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.accountId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.appId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.flowId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FlowMonitor_getFlowHistory_args.prototype.write = function(output) {
  output.writeStructBegin('FlowMonitor_getFlowHistory_args');
  if (this.accountId) {
    output.writeFieldBegin('accountId', Thrift.Type.STRING, 1);
    output.writeString(this.accountId);
    output.writeFieldEnd();
  }
  if (this.appId) {
    output.writeFieldBegin('appId', Thrift.Type.STRING, 2);
    output.writeString(this.appId);
    output.writeFieldEnd();
  }
  if (this.flowId) {
    output.writeFieldBegin('flowId', Thrift.Type.STRING, 3);
    output.writeString(this.flowId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FlowMonitor_getFlowHistory_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
FlowMonitor_getFlowHistory_result.prototype = {};
FlowMonitor_getFlowHistory_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.LIST) {
        var _size8 = 0;
        var _rtmp312;
        this.success = [];
        var _etype11 = 0;
        _rtmp312 = input.readListBegin();
        _etype11 = _rtmp312.etype;
        _size8 = _rtmp312.size;
        for (var _i13 = 0; _i13 < _size8; ++_i13)
        {
          var elem14 = null;
          elem14 = new ttypes.FlowRun();
          elem14.read(input);
          this.success.push(elem14);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FlowMonitor_getFlowHistory_result.prototype.write = function(output) {
  output.writeStructBegin('FlowMonitor_getFlowHistory_result');
  if (this.success) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
    for (var iter15 in this.success)
    {
      if (this.success.hasOwnProperty(iter15))
      {
        iter15 = this.success[iter15];
        iter15.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FlowMonitor_getFlowDefinition_args = function(args) {
  this.accountId = null;
  this.appId = null;
  this.flowId = null;
  this.versionId = null;
  if (args) {
    if (args.accountId !== undefined) {
      this.accountId = args.accountId;
    }
    if (args.appId !== undefined) {
      this.appId = args.appId;
    }
    if (args.flowId !== undefined) {
      this.flowId = args.flowId;
    }
    if (args.versionId !== undefined) {
      this.versionId = args.versionId;
    }
  }
};
FlowMonitor_getFlowDefinition_args.prototype = {};
FlowMonitor_getFlowDefinition_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.accountId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.appId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.flowId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.versionId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FlowMonitor_getFlowDefinition_args.prototype.write = function(output) {
  output.writeStructBegin('FlowMonitor_getFlowDefinition_args');
  if (this.accountId) {
    output.writeFieldBegin('accountId', Thrift.Type.STRING, 1);
    output.writeString(this.accountId);
    output.writeFieldEnd();
  }
  if (this.appId) {
    output.writeFieldBegin('appId', Thrift.Type.STRING, 2);
    output.writeString(this.appId);
    output.writeFieldEnd();
  }
  if (this.flowId) {
    output.writeFieldBegin('flowId', Thrift.Type.STRING, 3);
    output.writeString(this.flowId);
    output.writeFieldEnd();
  }
  if (this.versionId) {
    output.writeFieldBegin('versionId', Thrift.Type.STRING, 4);
    output.writeString(this.versionId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FlowMonitor_getFlowDefinition_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
FlowMonitor_getFlowDefinition_result.prototype = {};
FlowMonitor_getFlowDefinition_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FlowMonitor_getFlowDefinition_result.prototype.write = function(output) {
  output.writeStructBegin('FlowMonitor_getFlowDefinition_result');
  if (this.success) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FlowMonitor_getFlowMetrics_args = function(args) {
  this.accountId = null;
  this.appId = null;
  this.flowId = null;
  this.rid = null;
  if (args) {
    if (args.accountId !== undefined) {
      this.accountId = args.accountId;
    }
    if (args.appId !== undefined) {
      this.appId = args.appId;
    }
    if (args.flowId !== undefined) {
      this.flowId = args.flowId;
    }
    if (args.rid !== undefined) {
      this.rid = args.rid;
    }
  }
};
FlowMonitor_getFlowMetrics_args.prototype = {};
FlowMonitor_getFlowMetrics_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.accountId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.appId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.flowId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.rid = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FlowMonitor_getFlowMetrics_args.prototype.write = function(output) {
  output.writeStructBegin('FlowMonitor_getFlowMetrics_args');
  if (this.accountId) {
    output.writeFieldBegin('accountId', Thrift.Type.STRING, 1);
    output.writeString(this.accountId);
    output.writeFieldEnd();
  }
  if (this.appId) {
    output.writeFieldBegin('appId', Thrift.Type.STRING, 2);
    output.writeString(this.appId);
    output.writeFieldEnd();
  }
  if (this.flowId) {
    output.writeFieldBegin('flowId', Thrift.Type.STRING, 3);
    output.writeString(this.flowId);
    output.writeFieldEnd();
  }
  if (this.rid) {
    output.writeFieldBegin('rid', Thrift.Type.STRING, 4);
    output.writeString(this.rid);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FlowMonitor_getFlowMetrics_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
FlowMonitor_getFlowMetrics_result.prototype = {};
FlowMonitor_getFlowMetrics_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.LIST) {
        var _size16 = 0;
        var _rtmp320;
        this.success = [];
        var _etype19 = 0;
        _rtmp320 = input.readListBegin();
        _etype19 = _rtmp320.etype;
        _size16 = _rtmp320.size;
        for (var _i21 = 0; _i21 < _size16; ++_i21)
        {
          var elem22 = null;
          elem22 = new ttypes.Metric();
          elem22.read(input);
          this.success.push(elem22);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FlowMonitor_getFlowMetrics_result.prototype.write = function(output) {
  output.writeStructBegin('FlowMonitor_getFlowMetrics_result');
  if (this.success) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
    for (var iter23 in this.success)
    {
      if (this.success.hasOwnProperty(iter23))
      {
        iter23 = this.success[iter23];
        iter23.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FlowMonitorClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this.seqid = 0;
    this._reqs = {};
};
FlowMonitorClient.prototype = {};
FlowMonitorClient.prototype.add = function(metric, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_add(metric);
};

FlowMonitorClient.prototype.send_add = function(metric) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('add', Thrift.MessageType.CALL, this.seqid);
  var args = new FlowMonitor_add_args();
  args.metric = metric;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

FlowMonitorClient.prototype.recv_add = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new FlowMonitor_add_result();
  result.read(input);
  input.readMessageEnd();

  callback(null)
};
FlowMonitorClient.prototype.getFlows = function(accountId, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_getFlows(accountId);
};

FlowMonitorClient.prototype.send_getFlows = function(accountId) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getFlows', Thrift.MessageType.CALL, this.seqid);
  var args = new FlowMonitor_getFlows_args();
  args.accountId = accountId;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

FlowMonitorClient.prototype.recv_getFlows = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new FlowMonitor_getFlows_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getFlows failed: unknown result');
};
FlowMonitorClient.prototype.getFlowHistory = function(accountId, appId, flowId, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_getFlowHistory(accountId, appId, flowId);
};

FlowMonitorClient.prototype.send_getFlowHistory = function(accountId, appId, flowId) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getFlowHistory', Thrift.MessageType.CALL, this.seqid);
  var args = new FlowMonitor_getFlowHistory_args();
  args.accountId = accountId;
  args.appId = appId;
  args.flowId = flowId;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

FlowMonitorClient.prototype.recv_getFlowHistory = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new FlowMonitor_getFlowHistory_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getFlowHistory failed: unknown result');
};
FlowMonitorClient.prototype.getFlowDefinition = function(accountId, appId, flowId, versionId, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_getFlowDefinition(accountId, appId, flowId, versionId);
};

FlowMonitorClient.prototype.send_getFlowDefinition = function(accountId, appId, flowId, versionId) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getFlowDefinition', Thrift.MessageType.CALL, this.seqid);
  var args = new FlowMonitor_getFlowDefinition_args();
  args.accountId = accountId;
  args.appId = appId;
  args.flowId = flowId;
  args.versionId = versionId;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

FlowMonitorClient.prototype.recv_getFlowDefinition = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new FlowMonitor_getFlowDefinition_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getFlowDefinition failed: unknown result');
};
FlowMonitorClient.prototype.getFlowMetrics = function(accountId, appId, flowId, rid, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_getFlowMetrics(accountId, appId, flowId, rid);
};

FlowMonitorClient.prototype.send_getFlowMetrics = function(accountId, appId, flowId, rid) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getFlowMetrics', Thrift.MessageType.CALL, this.seqid);
  var args = new FlowMonitor_getFlowMetrics_args();
  args.accountId = accountId;
  args.appId = appId;
  args.flowId = flowId;
  args.rid = rid;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

FlowMonitorClient.prototype.recv_getFlowMetrics = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new FlowMonitor_getFlowMetrics_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getFlowMetrics failed: unknown result');
};
var FlowMonitorProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
FlowMonitorProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.Exception, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

FlowMonitorProcessor.prototype.process_add = function(seqid, input, output) {
  var args = new FlowMonitor_add_args();
  args.read(input);
  input.readMessageEnd();
  var result = new FlowMonitor_add_result();
  this._handler.add(args.metric, function (success) {
    result.success = success;
    output.writeMessageBegin("add", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

FlowMonitorProcessor.prototype.process_getFlows = function(seqid, input, output) {
  var args = new FlowMonitor_getFlows_args();
  args.read(input);
  input.readMessageEnd();
  var result = new FlowMonitor_getFlows_result();
  this._handler.getFlows(args.accountId, function (success) {
    result.success = success;
    output.writeMessageBegin("getFlows", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

FlowMonitorProcessor.prototype.process_getFlowHistory = function(seqid, input, output) {
  var args = new FlowMonitor_getFlowHistory_args();
  args.read(input);
  input.readMessageEnd();
  var result = new FlowMonitor_getFlowHistory_result();
  this._handler.getFlowHistory(args.accountId, args.appId, args.flowId, function (success) {
    result.success = success;
    output.writeMessageBegin("getFlowHistory", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

FlowMonitorProcessor.prototype.process_getFlowDefinition = function(seqid, input, output) {
  var args = new FlowMonitor_getFlowDefinition_args();
  args.read(input);
  input.readMessageEnd();
  var result = new FlowMonitor_getFlowDefinition_result();
  this._handler.getFlowDefinition(args.accountId, args.appId, args.flowId, args.versionId, function (success) {
    result.success = success;
    output.writeMessageBegin("getFlowDefinition", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

FlowMonitorProcessor.prototype.process_getFlowMetrics = function(seqid, input, output) {
  var args = new FlowMonitor_getFlowMetrics_args();
  args.read(input);
  input.readMessageEnd();
  var result = new FlowMonitor_getFlowMetrics_result();
  this._handler.getFlowMetrics(args.accountId, args.appId, args.flowId, args.rid, function (success) {
    result.success = success;
    output.writeMessageBegin("getFlowMetrics", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

