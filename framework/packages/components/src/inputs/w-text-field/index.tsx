//#region imports

import * as React from 'react';
import * as ReactDOM from 'react-dom'
import {
  Input, InputLabel,
  InputAdornment, TextField
} from '@material-ui/core';
import { WIconButton } from '../../buttons/w-icon-button';
import { WIcon } from '../../medias/w-icon'
import { TextFieldProps } from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { AppContextActions, WStore } from '@wface/store'

//#endregion

//#region export subtypes

export interface WTextFieldButton {
  icon: React.ReactNode;
  onClick(event:any, val: String): void;
}

export interface DispatchProps {
  saveScreenAny: (key: string, value: any) => void
}

export type WTextFieldProps = TextFieldProps & {
  defaultValue?: string;
  leftButtons?: WTextFieldButton[];
  rightButtons?: WTextFieldButton[];  
}

export interface WTextFieldState {
  value: string | number | boolean | (string | number | boolean)[],
  showPassword: boolean
}

//#endregion

class WTextFieldInner extends React.Component<WTextFieldProps & WStore & DispatchProps, WTextFieldState> {
  private id: string;

  constructor(props:any) {
    super(props);

    this.state = {
      value: this.props.value || this.props.defaultValue || "",
      showPassword: false
    }
  }

  componentDidMount() {
    if (!this.props.value && this.props.appContext.currentScreen) {
      const domNode = ReactDOM.findDOMNode(this);
      this.id = this.calcHashForNode(domNode);

      const valFromStore = this.props.appContext.currentScreen.values[this.id];
      if (valFromStore) {
        this.setState({ value: valFromStore });
      }
    }
  }

  componentWillReceiveProps(nextProps: WTextFieldProps) {
    if (this.props.value != nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  calcHashForNode(node: any, prevData: string = ""): string {
    if (!node) {
      return prevData;
    }

    const nodeText = node.tagName + this.calcNodeIndex(node) + "-" + prevData;
    return this.calcHashForNode(node.parentElement, nodeText);
  }

  calcNodeIndex(node:any) {
    var i = 0;
    while ((node = node.previousSibling) != null)
      i++;

    return i;
  }

  handleChange = (event:any) => {
    this.setState({ value: event.target.value });
    this.props.saveScreenAny(this.id, event.target.value);

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  //#region render methods

  private renderButtons(buttons: WTextFieldButton[]): any[] {
    return buttons.map(btn => {
      return (
        <WIconButton
          onClick={() => btn.onClick && btn.onClick.bind(this)(null, this.state.value)}
          onMouseDown={() => event.preventDefault()}>
          {btn.icon}
        </WIconButton>
      );
    })
  }

  private renderAdornments() {
    let leftButtons = this.props.leftButtons || [];
    let rightButtons = this.props.rightButtons || [];

    if (this.props.type == "password") {
      let action = {
        icon: <WIcon>{this.state.showPassword ? "visibility_off" : "visibility"}</WIcon>,
        onClick: function (e, value: string) {
          this.setState({ showPassword: !this.state.showPassword });
        }
      } as WTextFieldButton;
      rightButtons.push(action);
    }

    return {
      startAdornment: leftButtons.length > 0 &&
        <InputAdornment position="start">
          {this.renderButtons(leftButtons)}
        </InputAdornment>,
      endAdornment: rightButtons.length > 0 &&
        <InputAdornment position="end">
          {this.renderButtons(rightButtons)}
        </InputAdornment>
    };
  }

  public render() {
    let adorments = this.renderAdornments();
    return (
      <TextField
        {...this.props}
        value={this.state.value}
        type={this.props.type == 'password' && !this.state.showPassword ? 'password' : 'text'}
        onChange={this.handleChange}
        InputProps={adorments}
      />
    );
  }
  //#endregion    
}

const mapStateToProps = (state:WStore) => ({ appContext: state.appContext } as WStore);
const mapDispatchToProps = (dispatch:any) => ({
  saveScreenAny: (key: string, value: any) => dispatch(AppContextActions.saveScreenAny({ key, value }))
});

export const WTextField = connect<WStore, DispatchProps, WTextFieldProps>(mapStateToProps, mapDispatchToProps)(WTextFieldInner)