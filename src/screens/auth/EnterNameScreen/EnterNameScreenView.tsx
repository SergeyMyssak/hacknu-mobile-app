import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Header, TextInput } from '@components';
import { COLORS } from '@constants';
import { HelperText, Logo } from '@screens/auth/components';

const { text_input_placeholder } = COLORS;

interface IProps {
  name: string;
  isLoading: boolean;
  onChangeName: (data: string) => void;
  onPressContinue: () => void;
}

const EnterNameScreenView: FC<IProps> = ({
  name,
  isLoading,
  onChangeName,
  onPressContinue,
}): JSX.Element => (
  <>
    <Header borderBottom={false} />
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps='never'
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <Logo />
      <TextInput
        textInputProps={{
          value: name,
          placeholder: 'Your name',
          placeholderTextColor: text_input_placeholder,
          onChangeText: onChangeName,
        }}
        textInputStyle={styles.input}
      />
      <HelperText style={styles.helpText}>Enter your name</HelperText>
      <Button
        loading={isLoading}
        disabled={isLoading || name.trim().length < 3}
        buttonStyle={styles.button}
        onPress={onPressContinue}
      >
        Continue
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

export default memo(EnterNameScreenView);
