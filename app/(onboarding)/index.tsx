import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
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

  const onViewable = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index != null) setIndex(viewableItems[0].index);
  }).current;

  const next = () => {
    if (index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      router.replace('/(tabs)');
    }
  };

  const isLast = index === SLIDES.length - 1;

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Slides */}
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewable}
        viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
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
          paddingTop: 16,
          backgroundColor: '#FFFFFF',
          gap: 16,
        }}>
        {/* Dots */}
        <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'center' }}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={{
                height: 4,
                width: i === index ? 28 : 8,
                borderRadius: 999,
                backgroundColor: i === index ? '#1B4D3E' : '#D1D5DB',
              }}
            />
          ))}
        </View>

    
        <Pressable
          onPress={next}
          style={({ pressed }) => ({
            backgroundColor: '#1B4D3E',
            borderRadius: 999,
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 8,
            opacity: pressed ? 0.85 : 1,
          })}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
            {isLast ? "Let's go" : 'Continue'}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </Pressable>

        {/* Sign in */}
        <Pressable onPress={() => router.replace('/(tabs)')} style={{ alignItems: 'center' }}>
          <Text style={{ color: '#6B7280', fontSize: 14 }}>
            Already have an account?{' '}
            <Text style={{ color: '#1B4D3E', fontWeight: '600' }}>Sign in</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
