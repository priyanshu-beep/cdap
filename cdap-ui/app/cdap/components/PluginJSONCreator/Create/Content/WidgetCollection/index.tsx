/*
 * Copyright © 2020 Cask Data, Inc.
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

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import If from 'components/If';
import WidgetActionButtons from 'components/PluginJSONCreator/Create/Content/WidgetCollection/WidgetActionButtons';
import WidgetAttributesCollection from 'components/PluginJSONCreator/Create/Content/WidgetCollection/WidgetAttributesCollection';
import WidgetInput from 'components/PluginJSONCreator/Create/Content/WidgetCollection/WidgetInput';
import { ICreateContext } from 'components/PluginJSONCreator/CreateContextConnect';
import { List, Map } from 'immutable';
import * as React from 'react';
import uuidV4 from 'uuid/v4';

const styles = (theme): StyleRules => {
  return {
    eachWidget: {
      display: 'grid',
      gridTemplateColumns: '5fr 1fr',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    nestedWidgets: {
      border: `1px solid`,
      borderColor: theme.palette.grey[300],
      borderRadius: '6px',
      position: 'relative',
      padding: '7px 10px 5px',
      margin: '25px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    addWidgetLabel: {
      fontSize: '12px',
      position: 'absolute',
      top: '-10px',
      left: '15px',
      padding: '0 5px',
      backgroundColor: theme.palette.white[50],
    },
    required: {
      fontSize: '14px',
      marginLeft: '5px',
      lineHeight: '12px',
      verticalAlign: 'middle',
    },
    widgetContainer: {
      width: '90%',
    },
    widgetDivider: {
      width: '100%',
    },
  };
};

interface IWidgetCollectionProps extends WithStyles<typeof styles>, ICreateContext {
  groupID: string;
}

const WidgetCollectionView: React.FC<IWidgetCollectionProps> = ({
  classes,
  groupID,
  widgetInfo,
  groupToWidgets,
  setWidgetInfo,
  setGroupToWidgets,
  widgetToAttributes,
  setWidgetToAttributes,
}) => {
  const activeWidgets = groupID ? groupToWidgets.get(groupID) : List([]);
  const [openWidgetIndex, setOpenWidgetIndex] = React.useState(null);

  function addWidgetToGroup(index: number) {
    return () => {
      const newWidgetID = 'Widget_' + uuidV4();

      // Add a new widget's ID at the specified index
      let newWidgets;
      if (activeWidgets.isEmpty()) {
        newWidgets = activeWidgets.insert(0, newWidgetID);
      } else {
        newWidgets = activeWidgets.insert(index + 1, newWidgetID);
      }
      setGroupToWidgets(groupToWidgets.set(groupID, newWidgets));

      // Set the default empty properties of the widget
      setWidgetInfo(
        widgetInfo.set(
          newWidgetID,
          Map({
            widgetType: '',
            label: '',
            name: '',
          })
        )
      );

      setWidgetToAttributes(widgetToAttributes.set(newWidgetID, Map({})));
    };
  }

  function deleteWidgetFromGroup(widgetIndex) {
    return () => {
      // Grab the widget ID to delete
      const widgetToDelete = activeWidgets.get(widgetIndex);

      const newWidgets = activeWidgets.delete(widgetIndex);
      setGroupToWidgets(groupToWidgets.set(groupID, newWidgets));

      const newWidgetsToInfo = widgetInfo.delete(widgetToDelete);
      setWidgetInfo(newWidgetsToInfo);

      const restWidgetToAttributes = widgetToAttributes.delete(widgetToDelete);
      setWidgetToAttributes(restWidgetToAttributes);
    };
  }

  function openWidgetAttributes(widgetIndex) {
    return () => {
      setOpenWidgetIndex(widgetIndex);
    };
  }

  function closeWidgetAttributes() {
    setOpenWidgetIndex(null);
  }

  return (
    <div className={classes.nestedWidgets} data-cy="widget-wrapper-container">
      <div className={classes.addWidgetLabel}>
        Add Widgets
        <span className={classes.required}>*</span>
      </div>
      <div className={classes.widgetContainer}>
        {activeWidgets.map((widgetID, widgetIndex) => {
          return (
            <If key={widgetID} condition={widgetInfo.has(widgetID)}>
              <div className={classes.eachWidget}>
                <WidgetInput
                  widgetInfo={widgetInfo}
                  widgetID={widgetID}
                  setWidgetInfo={setWidgetInfo}
                  widgetToAttributes={widgetToAttributes}
                  setWidgetToAttributes={setWidgetToAttributes}
                />
                <WidgetActionButtons
                  onAddWidgetToGroup={addWidgetToGroup(widgetIndex)}
                  onDeleteWidgetFromGroup={deleteWidgetFromGroup(widgetIndex)}
                />

                <WidgetAttributesCollection
                  widgetAttributesOpen={openWidgetIndex === widgetIndex}
                  onWidgetAttributesClose={closeWidgetAttributes}
                  widgetID={widgetID}
                  widgetInfo={widgetInfo}
                  setWidgetInfo={setWidgetInfo}
                  widgetToAttributes={widgetToAttributes}
                  setWidgetToAttributes={setWidgetToAttributes}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                component="span"
                onClick={openWidgetAttributes(widgetIndex)}
              >
                Attributes
              </Button>
              <If condition={activeWidgets && widgetIndex < activeWidgets.size - 1}>
                <Divider className={classes.widgetDivider} />
              </If>
            </If>
          );
        })}
        <If condition={activeWidgets.isEmpty()}>
          <Button variant="contained" color="primary" onClick={addWidgetToGroup(0)}>
            Add Properties
          </Button>
        </If>
      </div>
    </div>
  );
};

const WidgetCollection = withStyles(styles)(WidgetCollectionView);
export default WidgetCollection;