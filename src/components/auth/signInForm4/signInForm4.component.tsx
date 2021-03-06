import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  textStyle,
  ValidationInput,
} from '@src/components/common';
import {
  PhoneNumberValidator,
  SMSCodeValidator,
} from '@src/core/validators';
import {
  LockIconFill,
  PhoneIconFill,
} from '@src/assets/icons';
import { SignInForm4Data } from './type';

interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with input value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (value: SignInForm4Data | undefined) => void;
}

export type SignInForm4Props = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
  phone: string | undefined;
  code: string | undefined;
}

class SignInForm4Component extends React.Component<SignInForm4Props, State> {

  public state: State = {
    phone: undefined,
    code: undefined,
  };

  public componentDidUpdate(prevProps: SignInForm4Props, prevState: State) {
    const oldFormValid: boolean = this.isValid(prevState);
    const newFormValid: boolean = this.isValid(this.state);

    const isStateChanged: boolean = this.state !== prevState;
    const becomeValid: boolean = !oldFormValid && newFormValid;
    const becomeInvalid: boolean = oldFormValid && !newFormValid;
    const remainValid: boolean = oldFormValid && newFormValid;

    if (becomeValid) {
      this.props.onDataChange(this.state);
    } else if (becomeInvalid) {
      this.props.onDataChange(undefined);
    } else if (isStateChanged && remainValid) {
      this.props.onDataChange(this.state);
    }
  }

  private onPhoneInputTextChange = (phone: string) => {
    this.setState({ phone });
  };

  private onCodeInputTextChange = (code: string) => {
    this.setState({ code });
  };

  private isValid = (value: SignInForm4Data): boolean => {
    const { phone, code } = value;

    return phone !== undefined
      && code !== undefined;
  };

  public render(): React.ReactNode {
    const { style, themedStyle, theme, ...restProps } = this.props;

    return (
      <View
        {...restProps}
        style={[themedStyle.container, style]}>
        <ValidationInput
          style={themedStyle.phoneInput}
          textStyle={textStyle.paragraph}
          placeholder='Phone Number'
          icon={PhoneIconFill}
          validator={PhoneNumberValidator}
          onChangeText={this.onPhoneInputTextChange}
        />
        <ValidationInput
          style={themedStyle.codeInput}
          textStyle={textStyle.paragraph}
          placeholder='SMS Code'
          secureTextEntry={true}
          icon={LockIconFill}
          validator={SMSCodeValidator}
          onChangeText={this.onCodeInputTextChange}
        />
      </View>
    );
  }
}

export const SignInForm4 = withStyles(SignInForm4Component, (theme: ThemeType) => ({
  container: {},
  phoneInput: {},
  codeInput: {
    marginTop: 16,
  },
}));
