import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

const SPORTS = [
  { icon: 'tennisball-outline' as const, label: 'Tennis' },
  { icon: 'basketball-outline' as const, label: 'Basketball' },
  { icon: 'water-outline' as const, label: 'Swimming' },
  { icon: 'barbell-outline' as const, label: 'Gym' },
];

export default function Slide3() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: 60 }}>
      
      <View style={{ paddingHorizontal: 28, marginBottom: 36 }}>
        <Text style={{ fontSize: 32, fontWeight: '800', color: '#111827', lineHeight: 40 }}>
          Four sports.{'\n'}
          <Text style={{ color: '#1B4D3E' }}>One system.</Text>
        </Text>
        <Text style={{ fontSize: 15, color: '#6B7280', marginTop: 10, lineHeight: 22 }}>
          From the court to the pool to the gym — every fundamental, covered.
        </Text>
      </View>

      
      <View
        style={{
          paddingHorizontal: 28,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 14,
        }}>
        {SPORTS.map((sport, i) => (
          <View
            key={sport.label}
            style={{
              width: '46%',
              backgroundColor: i === 0 ? '#1B4D3E' : '#F9FAFB',
              borderRadius: 20,
              padding: 18,
              borderWidth: i !== 0 ? 1.5 : 0,
              borderColor: '#E5E7EB',
              gap: 10,
            }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: i === 0 ? 'rgba(255,255,255,0.15)' : '#F0FDF4',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons
                name={sport.icon}
                size={22}
                color={i === 0 ? '#FFFFFF' : '#1B4D3E'}
              />
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                color: i === 0 ? '#FFFFFF' : '#111827',
              }}>
              {sport.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
