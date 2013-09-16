package com.continuuity.data;

import com.continuuity.api.common.Bytes;
import com.continuuity.common.conf.CConfiguration;
import com.continuuity.data2.dataset.api.DataSetManager;
import com.continuuity.data2.dataset.lib.table.OrderedColumnarTable;
import com.continuuity.data2.dataset.lib.table.hbase.HBaseOcTableClient;
import com.continuuity.data2.dataset.lib.table.hbase.HBaseOcTableManager;
import com.google.common.collect.Maps;
import com.google.inject.Inject;
import com.google.inject.name.Named;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.HTableDescriptor;
import org.apache.hadoop.hbase.client.HBaseAdmin;

import java.io.IOException;
import java.util.Map;

/**
 *
 */
public class DistributedDataSetAccessor extends AbstractDataSetAccessor {
  private final Configuration hConf;

  @Inject
  public DistributedDataSetAccessor(@Named("HBaseOVCTableHandleCConfig") CConfiguration cConf,
                                    @Named("HBaseOVCTableHandleHConfig") Configuration hConf)
    throws IOException {
    super(cConf);
    this.hConf = hConf;
  }

  @Override
  public  <T> T getDataSetClient(String name, Class<? extends T> type) throws Exception {
    if (type == OrderedColumnarTable.class) {
      return (T) new HBaseOcTableClient(name, hConf);
    }

    return null;
  }

  @Override
  public DataSetManager getDataSetManager(Class type) throws Exception {
    if (type == OrderedColumnarTable.class) {
      return new HBaseOcTableManager(hConf);
    }

    return null;
  }

  @Override
  protected Map<String, Class<?>> list(String prefix) throws Exception {
    Map<String, Class<?>> datasets = Maps.newHashMap();
    HBaseAdmin admin = new HBaseAdmin(hConf);
    for (HTableDescriptor tableDescriptor : admin.listTables()) {
      String tableName = Bytes.toString(tableDescriptor.getName());
      if (tableName.startsWith(prefix)) {
        datasets.put(tableName, OrderedColumnarTable.class);
      }
    }
    return datasets;
  }
}

