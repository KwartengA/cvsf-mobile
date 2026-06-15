import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const META: Record<string, {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  accentBg: string;
  accentText: string;
  iconBg: string;
}> = {
  tennis:     { label: 'Tennis',     icon: 'tennisball-outline', accentBg: '#FFF7ED', accentText: '#C2410C', iconBg: '#FED7AA' },
  basketball: { label: 'Basketball', icon: 'basketball-outline', accentBg: '#FFF3E0', accentText: '#B45309', iconBg: '#FDE68A' },
  swimming:   { label: 'Swimming',   icon: 'water-outline',      accentBg: '#EFF6FF', accentText: '#1D4ED8', iconBg: '#BFDBFE' },
  gym:        { label: 'Gym',        icon: 'barbell-outline',    accentBg: '#F0FDF4', accentText: '#15803D', iconBg: '#BBF7D0' },
};

export default function SportDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const sport = META[id] ?? META['gym'];

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#F2F2F7' }}>
      {/* Header */}
      <View
        style={{
          paddingTop: 10,
          paddingHorizontal: 16,
          paddingBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => ({
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.6 : 1,
          })}>
          <Ionicons name="chevron-back" size={20} color="#111827" />
        </Pressable>
        <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>
          {sport.label}
        </Text>
      </View>

      {/* Placeholder body */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 24,
            backgroundColor: sport.iconBg,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name={sport.icon} size={40} color={sport.accentText} />
        </View>
        <Text style={{ fontSize: 22, fontWeight: '800', color: '#111827' }}>
          {sport.label}
        </Text>
        <Text style={{ fontSize: 14, color: '#9CA3AF', textAlign: 'center', paddingHorizontal: 40 }}>
          Content for this section is coming soon. Check back once drills are added.
        </Text>
      </View>
    </SafeAreaView>
  );
}
