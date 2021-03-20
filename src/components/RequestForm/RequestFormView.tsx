import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, TextInput } from '@components';
import { CATEGORIES } from '@constants';
import { RequestModuleTypes } from '@types';
import { Formik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';

import CategoriesBottomSheet from './CategoriesBottomSheet';

interface IProps {
  initState?: RequestModuleTypes.IRequestFormData;
  isLoading: boolean;
  categoriesBottomSheetRef: any;
  isCategoriesBottomSheetVisible: boolean;

  handleCategoriesBottomSheetOpen: () => void;
  handleCategoriesBottomSheetClose: () => void;
  handleCategoriesBottomSheetCloseEnd: () => void;
  onPressSend: (
    data: RequestModuleTypes.IRequestFormData,
    helpers: FormikHelpers<RequestModuleTypes.IRequestFormData>,
  ) => void;
  onAddressMap: (
    values: RequestModuleTypes.IRequestFormData,
    setFieldValue: (field: string, value: any) => void,
  ) => void;
}

const RequestFormView: FC<IProps> = ({
  initState,
  isLoading,
  categoriesBottomSheetRef,
  isCategoriesBottomSheetVisible,

  handleCategoriesBottomSheetOpen,
  handleCategoriesBottomSheetClose,
  handleCategoriesBottomSheetCloseEnd,
  onPressSend,
  onAddressMap,
}): JSX.Element => (
  <Formik
    initialValues={
      initState || {
        address: '',
        category: CATEGORIES[0],
        latitude: '',
        longitude: '',
        need: '',
        problem: '',
      }
    }
    onSubmit={onPressSend}
  >
    {({ values, setFieldValue, handleSubmit }) => {
      const { address, category, need, problem } = values;

      const onPressSelectAddress = (): void => onAddressMap(values, setFieldValue);

      return (
        <>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps='never'
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
          >
            <TextInput
              type='modal'
              label='Category'
              textInputProps={{ value: category?.name, placeholder: 'Category' }}
              customStyles={styles.textInput}
              onPress={handleCategoriesBottomSheetOpen}
            />
            <TextInput
              type='button'
              label='Select address'
              textInputProps={{ value: address, placeholder: 'Select address' }}
              customStyles={styles.textInput}
              onPress={onPressSelectAddress}
            />
            <TextInput
              title='need'
              label='What is your problem?'
              textInputProps={{ value: need, placeholder: 'Mask - 5 pieces' }}
              customStyles={styles.textInput}
              onChangeText={setFieldValue}
            />
            <TextInput
              title='problem'
              label='Description'
              textInputProps={{ value: problem, placeholder: 'There are no masks in pharmacies' }}
              customStyles={[styles.textInput, styles.lastTextInput]}
              onChangeText={setFieldValue}
            />
            <Button disabled={isLoading} loading={isLoading} onPress={handleSubmit}>
              {initState ? 'Update' : 'Send'}
            </Button>
          </KeyboardAwareScrollView>
          <CategoriesBottomSheet
            innerRef={categoriesBottomSheetRef}
            selectedCategory={category}
            isVisible={isCategoriesBottomSheetVisible}
            onSelect={setFieldValue}
            onClose={handleCategoriesBottomSheetClose}
            onCloseEnd={handleCategoriesBottomSheetCloseEnd}
          />
        </>
      );
    }}
  </Formik>
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

export default memo(RequestFormView);
