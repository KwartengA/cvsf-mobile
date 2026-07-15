import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

const BG = '#0A0E0F';
const ACCENT = '#39FF88';
const TEXT = '#E8ECEC';
const TEXT_MUTED = '#8A9694';
const SURFACE = '#141A1B';

const SPORTS = [
  { icon: 'tennisball-outline' as const, label: 'Tennis', techniques: 12 },
  { icon: 'basketball-outline' as const, label: 'Basketball', techniques: 9 },
  { icon: 'water-outline' as const, label: 'Swimming', techniques: 8 },
  { icon: 'barbell-outline' as const, label: 'Gym', techniques: 21 },
];

function SportTile({
  icon,
  label,
  techniques,
  selected,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  techniques: number;
  selected: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true, speed: 50 }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();

  return (
    <Animated.View style={{ width: '46%', transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: selected }}
        accessibilityLabel={`${label}, ${techniques} techniques`}
        style={{
          backgroundColor: selected ? ACCENT : SURFACE,
          borderRadius: 20,
          padding: 18,
          borderWidth: 1.5,
          borderColor: selected ? ACCENT : 'rgba(255,255,255,0.06)',
          gap: 10,
        }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: selected ? 'rgba(10,14,15,0.15)' : 'rgba(57,255,136,0.08)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name={icon} size={22} color={selected ? '#0A0E0F' : ACCENT} />
        </View>
        <Text style={{ fontSize: 15, fontWeight: '700', color: selected ? '#0A0E0F' : TEXT }}>
          {label}
        </Text>
        <Text
          style={{
            fontSize: 11,
            fontFamily: 'monospace',
            color: selected ? 'rgba(10,14,15,0.6)' : TEXT_MUTED,
          }}>
          {techniques} techniques
        </Text>
        {selected && (
          <View
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: '#0A0E0F',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name="checkmark" size={13} color={ACCENT} />
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

export default function Slide3() {
  const [selected, setSelected] = useState<string[]>(['Tennis', 'Gym']);

  const toggle = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: BG, paddingTop: 76 }}>
      <View style={{ paddingHorizontal: 28, marginBottom: 28 }}>
        <Text style={{ color: ACCENT, fontSize: 12, fontWeight: '700', letterSpacing: 2, marginBottom: 12 }}>
          PICK YOUR SPORTS
        </Text>
        <Text style={{ fontSize: 32, fontWeight: '800', color: TEXT, lineHeight: 40 }}>
          Four sports.{'\n'}
          <Text style={{ color: ACCENT }}>One system.</Text>
        </Text>
        <Text style={{ fontSize: 15, color: TEXT_MUTED, marginTop: 12, lineHeight: 22 }}>
          Tap to select what you train — you can change this anytime.
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: 28,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 14,
        }}>
        {SPORTS.map((sport) => (
          <SportTile
            key={sport.label}
            icon={sport.icon}
            label={sport.label}
            techniques={sport.techniques}
            selected={selected.includes(sport.label)}
            onPress={() => toggle(sport.label)}
          />
        ))}
      </View>
    </View>
  );
}
