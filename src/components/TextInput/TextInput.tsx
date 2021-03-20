import React, { FunctionComponent, memo } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';
import Ripple from 'react-native-material-ripple';
import { ActivityIndicator } from '@components';
import { COLORS, FONTS } from '@constants';
import { ICONS } from '@static';

const { primary, border, text_input } = COLORS;
const { regular, medium } = FONTS;

interface IProps {
  type?: 'modal' | 'button' | 'normal';
  label?: string;
  title?: string;

  textInputProps?: TextInputProps;
  textInputMaskProps?: TextInputMaskProps;

  isDisabled?: boolean;
  isLoading?: boolean;

  textInputStyle?: ViewStyle;
  customStyles?: Record<string, any>;

  onPress?: () => void;
  onChangeText?: (title: string, value: string) => void;
}

const TextInput: FunctionComponent<IProps> = ({
  type = 'normal',
  label,
  title,

  textInputProps,
  textInputMaskProps,

  isDisabled,
  isLoading,

  textInputStyle,
  customStyles,

  onPress,
  onChangeText,
}): JSX.Element => {
  const isEditable = !onPress && !isDisabled;
  const isTypeButton = type === 'button' && !!onPress;
  const isTypeModal = type === 'modal' && !!onPress;
  const isButton = isTypeButton || isTypeModal;

  const renderContent = (): JSX.Element => {
    const renderTextInput = (): JSX.Element => {
      const onChange = (val: string): void =>
        title && onChangeText ? onChangeText(title, val) : undefined;

      if (textInputMaskProps) {
        return (
          <TextInputMask
            editable={isEditable}
            pointerEvents={onPress ? 'none' : undefined}
            style={[styles.textInput, isLoading && styles.textInputOneIcon, textInputStyle]}
            onChangeText={onChange}
            {...textInputProps}
            {...textInputMaskProps}
          />
        );
      }

      return (
        <RNTextInput
          multiline={true}
          scrollEnabled={false}
          textAlignVertical='center'
          editable={isEditable}
          pointerEvents={onPress ? 'none' : undefined}
          style={[
            styles.textInput,
            (isButton || isLoading) && styles.textInputOneIcon,
            isButton && isLoading && styles.textInputTwoIcons,
            Platform.OS === 'ios' && styles.additionalPaddingTop,
            textInputStyle,
          ]}
          onChangeText={onChange}
          {...textInputProps}
        />
      );
    };

    return (
      <>
        {renderTextInput()}
        {isButton &&
          (isTypeModal ? (
            <FastImage source={ICONS.right} style={styles.icon} />
          ) : (
            <FastImage source={ICONS.down} style={styles.icon} />
          ))}
        {isLoading && (
          <ActivityIndicator
            color={primary}
            style={[styles.activityIndicator, isButton && styles.activityIndicatorButton]}
          />
        )}
      </>
    );
  };

  if (onPress) {
    return (
      <>
        {label && <Text style={styles.label}>{label}</Text>}
        <Ripple
          disabled={isDisabled}
          rippleContainerBorderRadius={4}
          style={[styles.textInputWrapper, isDisabled && styles.disabled, customStyles]}
          onPress={onPress}
        >
          {renderContent()}
        </Ripple>
      </>
    );
  }

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.textInputWrapper, isDisabled && styles.disabled, customStyles]}>
        {renderContent()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    fontFamily: regular,
    marginBottom: 8,
  },

  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  textInput: {
    flex: 1,
    color: text_input,
    fontSize: 16,
    fontFamily: medium,
    lineHeight: 20,
    backgroundColor: '#FFF',

    borderWidth: 1,
    borderColor: border,
    borderRadius: 4,
    padding: 16,
    paddingRight: 28,
  },
  textInputTwoIcons: {
    paddingRight: 80,
  },
  textInputOneIcon: {
    paddingRight: 50,
  },
  icon: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 16,
    paddingTop: 4,
  },
  disabled: {
    opacity: 0.4,
  },
  activityIndicator: {
    position: 'absolute',
    right: 16,
  },
  activityIndicatorButton: {
    right: 40,
  },
  additionalPaddingTop: {
    paddingTop: 16,
  },
});

export default memo(TextInput);
