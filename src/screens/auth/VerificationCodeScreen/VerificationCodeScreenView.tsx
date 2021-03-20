import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Header, TextInput } from '@components';
import { COLORS } from '@constants';
import { HelperText, Logo, TextButton, Timer } from '@screens/auth/components';

const { text_input_placeholder } = COLORS;

interface IProps {
  smsCode: string;
  phone: string;
  isTimerDone: boolean;
  handleSmsCode: (data: string) => void;
  timerCallback: () => void;
  resendSMS: () => void;
  onPressContinue: () => void;
  goBack: () => void;
}

const TIMER_SECONDS = 30;

const VerificationCodeScreenView: FC<IProps> = ({
  smsCode,
  phone,
  isTimerDone,
  timerCallback,
  handleSmsCode,
  resendSMS,
  onPressContinue,
  goBack,
}): JSX.Element => {
  const renderTimer = (): JSX.Element => (
    <View style={styles.timerContainer}>
      {isTimerDone ? (
        <TextButton onPress={resendSMS}>Resend code</TextButton>
      ) : (
        <Timer maxSeconds={TIMER_SECONDS} leftText='Resend code after: ' callback={timerCallback} />
      )}
    </View>
  );

  return (
    <>
      <Header icon='back' title='SMS-code' borderBottom={false} onPress={goBack} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps='never'
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Logo />
        <TextInput
          textInputProps={{
            value: smsCode,
            keyboardType: 'number-pad',
            maxLength: 9,
            placeholder: '- - - - -',
            placeholderTextColor: text_input_placeholder,
            onChangeText: handleSmsCode,
          }}
          textInputMaskProps={{
            type: 'custom',
            options: {
              mask: '9 9 9 9 9',
            },
          }}
          textInputStyle={styles.input}
        />
        <HelperText style={styles.helpText}>SMS code sent to the number</HelperText>
        <HelperText>{phone}</HelperText>
        {renderTimer()}
        <Button
          disabled={smsCode.trim().length !== 9}
          buttonStyle={styles.button}
          onPress={onPressContinue}
        >
          Continue
        </Button>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 48,
    paddingHorizontal: 24,
    backgroundColor: '#FFF',
  },
  logo: {
    marginTop: 12,
  },
  input: {
    marginTop: 48,
  },
  helpText: {
    marginTop: 12,
  },
  timerContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  button: {
    marginTop: 56,
  },
});

export default memo(VerificationCodeScreenView);
