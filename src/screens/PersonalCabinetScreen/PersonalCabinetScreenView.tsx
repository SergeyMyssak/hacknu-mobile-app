import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Header, TextInput } from '@components';
import { Formik } from 'formik';

import { IMyDataForm } from './PersonalCabinetScreenContainer';

interface IProps {
  isLoading: boolean;
  initialValues: IMyDataForm;
  onUpdateUserInfoPress: (data: IMyDataForm) => void;
  goBack: () => void;
}

const PersonalCabinetScreenView: FC<IProps> = ({
  initialValues,
  isLoading,
  onUpdateUserInfoPress,
  goBack,
}): JSX.Element => (
  <>
    <Header icon='back' title='Мои данные' onPress={goBack} />
    <Formik initialValues={initialValues} onSubmit={onUpdateUserInfoPress}>
      {({ values, setFieldValue, handleSubmit }) => {
        const { name, phone } = values;

        return (
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps='never'
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
          >
            <TextInput
              title='name'
              label='Имя'
              textInputProps={{ value: name, placeholder: 'Ваше имя' }}
              customStyles={[styles.textInput]}
              onChangeText={setFieldValue}
            />
            <TextInput
              title='phone'
              label='Телефон'
              textInputProps={{ value: phone, placeholder: '+7 (701) 628 05 07' }}
              customStyles={[styles.textInput, styles.lastTextInput]}
              onChangeText={setFieldValue}
              isDisabled={true}
            />
            <Button loading={isLoading} onPress={handleSubmit}>
              Сохранить
            </Button>
          </KeyboardAwareScrollView>
        );
      }}
    </Formik>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 24,
  },
  textInput: {
    marginBottom: 24,
  },
  lastTextInput: {
    marginBottom: 48,
  },
});

export default memo(PersonalCabinetScreenView);
