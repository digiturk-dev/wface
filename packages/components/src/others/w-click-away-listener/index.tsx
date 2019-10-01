import * as React from 'react';
import ClickAwayListener, { ClickAwayListenerProps } from '@material-ui/core/ClickAwayListener';

export interface WClickAwayListenerProps extends ClickAwayListenerProps {
}

export class WClickAwayListener extends React.Component<WClickAwayListenerProps, {}> {
  public render() {
    return <ClickAwayListener {...this.props}/>
  }
}