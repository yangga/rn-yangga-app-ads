import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Image,
  LayoutChangeEvent,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { useInterval } from 'react-use-timeout';
import type { ISize } from 'src/types';
import { useYanggaAppAds } from './Context';

const CONTAINER_RATIO = 1 / 8;

export interface IBannerProp {
  locale?: string;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
}

export const Banner = (props: IBannerProp) => {
  const { locale, containerStyle, style } = props;

  const [containerSize, setContainerSize] = useState<Partial<ISize>>({
    width: undefined,
    height: undefined,
  });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width < 10 || height < 10) {
      return;
    }

    setContainerSize({
      width,
      height: Math.floor(width * CONTAINER_RATIO),
    });
  };

  return (
    <View
      style={[styles.container, containerSize, containerStyle]}
      onLayout={onLayout}
    >
      <BannerInner locale={locale} style={style} />
    </View>
  );
};

interface IFontStyleGroup {
  title: TextStyle;
  content: TextStyle;
}

interface IBannerInnerProp {
  locale?: string;
  style?: ViewStyle;
}

const BannerInner = (props: IBannerInnerProp) => {
  const { locale = 'en', style } = props;

  const { database } = useYanggaAppAds();
  const [containerSize, setContainerSize] = useState<Partial<ISize>>({
    width: undefined,
    height: undefined,
  });
  const [appIdx, setAppIdx] = useState(0);
  const [uiRatio, setUiRatio] = useState(1);

  const handleNextApp = () => {
    if (!database || !database.apps.length) {
      return;
    }

    const idx = (appIdx + 1) % database.apps.length;
    setAppIdx(idx);
  };

  const intervalChangeAppIdx = useInterval(handleNextApp, 1000 * 10);

  useEffect(() => {
    try {
      intervalChangeAppIdx.start();
    } catch (error: unknown) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (!containerSize.width) {
      return;
    }

    setUiRatio(containerSize.width / 480);
  }, [containerSize.width]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width < 10 || height < 10) {
      return;
    }

    setContainerSize({
      width,
      height,
    });
  };

  const fontConfigGroup = useMemo<IFontStyleGroup>(
    () => ({
      title: {
        fontSize: 16 * uiRatio,
      },
      content: {
        fontSize: 11 * uiRatio,
      },
    }),
    [uiRatio]
  );

  if (!database || !database.apps.length || !database.apps[appIdx]) {
    return null;
  }

  const app = database.apps[appIdx]!;
  const storeUri = Platform.select({
    ios: app.store.ios,
    default: app.store.aos,
  });

  const name = app.name[locale] || app.name.en || '';
  const desc = app.desc[locale] || app.desc.en || '';

  const handleOnPressBanner = () => {
    Linking.openURL(storeUri).catch((error: unknown) =>
      Alert.alert('Error', (error as any).message)
    );
  };

  return (
    <TouchableWithoutFeedback onPress={handleOnPressBanner}>
      <View style={[styles.bannerInnerContainer, style]} onLayout={onLayout}>
        <Image source={app.icon} style={styles.icon} resizeMode="contain" />
        <View style={styles.space} />
        <View style={styles.descContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={fontConfigGroup.title}
          >
            {name}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={fontConfigGroup.content}
          >
            {desc}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 72,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#222222',
    overflow: 'hidden',
  },
  bannerInnerContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    flex: 5,
    width: '100%',
    height: '100%',
  },
  space: {
    flex: 1,
  },
  descContainer: {
    flex: 30,
  },
});
