import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Header, TextInput } from '@components';
import { COLORS } from '@constants';
import { HelperText, Logo } from '@screens/auth/components';

const { text_input_placeholder } = COLORS;

interface IProps {
  phone: string;
  onChangePhone: (data: string) => void;
  onVerificationCodeScreen: () => void;
  goBack: () => void;
}

const SignInScreenView: FC<IProps> = ({
  phone,
  onChangePhone,
  onVerificationCodeScreen,
  goBack,
}): JSX.Element => (
  <>
    <Header icon='back' title='Войти' borderBottom={false} onPress={goBack} />
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps='never'
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <Logo />
      <TextInput
        textInputProps={{
          value: phone,
          keyboardType: 'phone-pad',
          maxLength: 18,
          placeholder: '+7 ( ___ ) ___ - __ - __',
          placeholderTextColor: text_input_placeholder,
          onChangeText: onChangePhone,
        }}
        textInputMaskProps={{
          type: 'custom',
          options: {
            mask: '+7 (999) 999-99-99',
          },
        }}
        textInputStyle={styles.input}
      />
      <HelperText style={styles.helpText}>Для входа введите свой номер телефона</HelperText>
      <Button
        loading={false}
        disabled={phone.trim().length !== 18}
        buttonStyle={styles.button}
        onPress={onVerificationCodeScreen}
      >
        Продолжить
      </Button>
    </KeyboardAwareScrollView>
  </>
);

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
  button: {
    marginTop: 120,
  },
});

export default memo(SignInScreenView);
