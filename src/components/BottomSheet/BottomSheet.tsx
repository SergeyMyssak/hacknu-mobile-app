import React, { FC, memo, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '@constants';
import RNBottomSheet from 'reanimated-bottom-sheet';

import Overlay from '../Overlay';

const { primary } = COLORS;
const { bold } = FONTS;

interface IProps {
  innerRef: any;
  title: string;
  snapPoint?: number | string;
  isVisible: boolean;
  enabledInnerScrolling?: boolean;
  titleStyle?: any;

  renderHeader?: () => JSX.Element;
  renderContent?: () => JSX.Element;
  onClose: () => void;
  onCloseEnd: () => void;
}

const BottomSheet: FC<IProps> = ({
  innerRef,
  title,
  snapPoint: defaultSnapPoint,
  isVisible,
  enabledInnerScrolling = true,
  titleStyle,

  renderHeader,
  renderContent,
  onClose,
  onCloseEnd,
}): JSX.Element => {
  const [snapPoint, setSnapPoint] = useState(defaultSnapPoint || 0);
  const snapPoints = defaultSnapPoint
    ? [Platform.OS === 'ios' ? '90%' : '95%', snapPoint, 0]
    : [snapPoint, 0];
  const initialSnapPoint = defaultSnapPoint ? 2 : 1;

  const hiddenStyle = defaultSnapPoint
    ? !isVisible
      ? styles.none
      : null
    : !isVisible || !snapPoint
    ? styles.invisible
    : null;

  const renderCustomHeader = (): JSX.Element => (
    <View style={[styles.header, hiddenStyle]}>
      <View style={styles.line} />
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {!!renderHeader && renderHeader()}
    </View>
  );

  const renderCustomContent = (): JSX.Element => {
    const onLayout = defaultSnapPoint
      ? undefined
      : (e): void => {
          const { nativeEvent } = e;
          const { layout } = nativeEvent;
          const { height: calculatedHeight } = layout;

          if (calculatedHeight > 20) {
            setSnapPoint(calculatedHeight + 40);
          }
        };

    return (
      <View style={[styles.content, hiddenStyle]} onLayout={onLayout}>
        {!!renderContent && renderContent()}
      </View>
    );
  };

  return (
    <>
      {isVisible && <Overlay hide={onClose} />}
      <RNBottomSheet
        key={snapPoint}
        ref={innerRef}
        snapPoints={snapPoints}
        initialSnap={initialSnapPoint}
        renderHeader={renderCustomHeader}
        renderContent={renderCustomContent}
        enabledBottomClamp={true}
        enabledInnerScrolling={enabledInnerScrolling}
        enabledContentTapInteraction={false}
        onCloseEnd={onCloseEnd}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopEndRadius: 24,
    marginBottom: -1,
  },
  content: {
    backgroundColor: '#FFF',
    paddingTop: 1,
    paddingBottom: 10,
  },
  none: {
    display: 'none',
  },
  invisible: {
    opacity: 0,
  },
  line: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 12,
  },
  title: {
    color: primary,
    fontSize: 16,
    fontFamily: bold,
    marginTop: 12,
    marginBottom: 8,
    marginHorizontal: 24,
  },
});

export default memo(BottomSheet);
