import * as React from 'react';
import Slider, { SliderProps } from '@material-ui/core/Slider';
import { BaseComponentProps } from '../../base/base-component-props';

export type WSliderProps = BaseComponentProps & SliderProps & {  
}

export class WSlider extends React.Component<WSliderProps, {}> {
  public render() {
    return <Slider {...this.props}/>
  }
}