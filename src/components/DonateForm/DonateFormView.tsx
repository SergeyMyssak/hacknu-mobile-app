import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, TextInput } from '@components';
import { CATEGORIES } from '@constants';
import { DonateModuleTypes } from '@types';
import { Formik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';

import CategoriesBottomSheet from './CategoriesBottomSheet';

interface IProps {
  initState?: DonateModuleTypes.IDonateFormData;
  isLoading: boolean;
  categoriesBottomSheetRef: any;
  isCategoriesBottomSheetVisible: boolean;

  clearForm: any;
  handleCategoriesBottomSheetOpen: () => void;
  handleCategoriesBottomSheetClose: () => void;
  handleCategoriesBottomSheetCloseEnd: () => void;
  onPressSend: (
    data: DonateModuleTypes.IDonateFormData,
    helpers: FormikHelpers<DonateModuleTypes.IDonateFormData>,
  ) => void;
  onAddressMap: (
    values: DonateModuleTypes.IDonateFormData,
    setFieldValue: (field: string, value: any) => void,
  ) => void;
}

const DonateFormView: FC<IProps> = ({
  initState,
  isLoading,
  categoriesBottomSheetRef,
  isCategoriesBottomSheetVisible,

  clearForm,
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
        text: '',
      }
    }
    onSubmit={onPressSend}
  >
    {({ values, setFieldValue, resetForm, handleSubmit }) => {
      const { address, category, text } = values;
      clearForm.current = resetForm;

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
              title='text'
              label='How can you help?'
              textInputProps={{ value: text, placeholder: 'Enter text' }}
              customStyles={styles.textInput}
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

export default memo(DonateFormView);
