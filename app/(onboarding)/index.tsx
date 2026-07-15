import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  Text,
  View,
  ViewToken,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Slide1 from './slide1';
import Slide2 from './slide2';
import Slide3 from './slide3';
import Slide4 from './slide4';

const { width } = Dimensions.get('window');

const BG = '#0A0E0F';
const ACCENT = '#39FF88';
const TEXT_MUTED = '#8A9694';

const SLIDES = [
  { key: 's1', component: Slide1 },
  { key: 's2', component: Slide2 },
  { key: 's3', component: Slide3 },
  { key: 's4', component: Slide4 },
];

export default function Onboarding() {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const ctaScale = useRef(new Animated.Value(1)).current;

  const onViewable = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index != null) setIndex(viewableItems[0].index);
  }).current;

  const pressIn = () =>
    Animated.spring(ctaScale, { toValue: 0.96, useNativeDriver: true, speed: 40 }).start();
  const pressOut = () =>
    Animated.spring(ctaScale, { toValue: 1, useNativeDriver: true, speed: 40 }).start();

  const next = () => {
    if (index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      router.replace('/(tabs)');
    }
  };

  const skip = () => router.replace('/(tabs)');

  const isLast = index === SLIDES.length - 1;

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* Skip */}
      <View
        style={{
          position: 'absolute',
          top: insets.top + 8,
          right: 24,
          zIndex: 10,
        }}>
        {!isLast && (
          <Pressable
            onPress={skip}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Skip onboarding">
            <Text style={{ color: TEXT_MUTED, fontSize: 13, fontWeight: '600', letterSpacing: 0.5 }}>
              SKIP
            </Text>
          </Pressable>
        )}
      </View>

      {/* Slides */}
      <Animated.FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewable}
        viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <item.component />
          </View>
        )}
      />

      {/* Bottom fixed area */}
      <View
        style={{
          paddingHorizontal: 28,
          paddingBottom: insets.bottom + 20,
          paddingTop: 20,
          backgroundColor: BG,
          gap: 20,
        }}>
        {/* Progress track */}
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {SLIDES.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const fillWidth = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 1],
              extrapolate: 'clamp',
            });
            return (
              <View
                key={i}
                style={{
                  flex: 1,
                  height: 3,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                }}>
                <Animated.View
                  style={{
                    height: '100%',
                    borderRadius: 2,
                    backgroundColor: ACCENT,
                    width: fillWidth.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  }}
                />
              </View>
            );
          })}
        </View>

        <Animated.View style={{ transform: [{ scale: ctaScale }] }}>
          <Pressable
            onPress={next}
            onPressIn={pressIn}
            onPressOut={pressOut}
            accessibilityRole="button"
            accessibilityLabel={isLast ? 'Start tracking' : 'Continue to next slide'}
            style={{
              backgroundColor: ACCENT,
              borderRadius: 16,
              height: 56,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 8,
            }}>
            <Text style={{ color: '#0A0E0F', fontSize: 16, fontWeight: '700' }}>
              {isLast ? 'Start tracking' : 'Continue'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#0A0E0F" />
          </Pressable>
        </Animated.View>

        {/* Sign in */}
        <Pressable
          onPress={() => router.replace('/(tabs)')}
          accessibilityRole="button"
          accessibilityLabel="Sign in to an existing account"
          style={{ alignItems: 'center' }}>
          <Text style={{ color: TEXT_MUTED, fontSize: 14 }}>
            Already have an account? <Text style={{ color: ACCENT, fontWeight: '600' }}>Sign in</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
