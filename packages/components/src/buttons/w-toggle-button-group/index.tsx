import * as React from 'react';
import ToggleButtonGroup, { ToggleButtonGroupProps } from '@material-ui/lab/ToggleButtonGroup';

export interface WToggleButtonGroupProps extends ToggleButtonGroupProps {
}

export class WToggleButtonGroup extends React.Component<WToggleButtonGroupProps, {}> {
  public render() {
    return <ToggleButtonGroup {...this.props}/>
  }
}