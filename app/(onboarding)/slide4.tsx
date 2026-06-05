import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

function StatCard({
  icon,
  value,
  label,
  rotate,
  top,
  left,
  right,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  value: string;
  label: string;
  rotate: string;
  top?: number;
  left?: number;
  right?: number;
}) {
  return (
    <View
      style={{
        position: 'absolute',
        top,
        left,
        right,
        width: 160,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 10,
        elevation: 4,
        transform: [{ rotate }],
        gap: 8,
      }}>
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: '#F0FDF4',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Ionicons name={icon} size={18} color="#1B4D3E" />
      </View>
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#111827' }}>{value}</Text>
      <Text style={{ fontSize: 12, color: '#6B7280', lineHeight: 16 }}>{label}</Text>
    </View>
  );
}

export default function Slide4() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: 60 }}>
      
      <View style={{ paddingHorizontal: 28, marginBottom: 32 }}>
        <Text style={{ fontSize: 32, fontWeight: '800', color: '#111827', lineHeight: 40 }}>
          Track your{'\n'}
          <Text style={{ color: '#1B4D3E' }}>progress.</Text>
        </Text>
        <Text style={{ fontSize: 15, color: '#6B7280', marginTop: 10, lineHeight: 22 }}>
          Every session scored. Every week charted. See yourself improve over time.
        </Text>
      </View>

     
      <View style={{ flex: 1, position: 'relative' }}>
        <StatCard
          icon="flame-outline"
          value="12"
          label="Day streak"
          rotate="-5deg"
          top={10}
          left={20}
        />
        <StatCard
          icon="star-outline"
          value="88%"
          label="Avg form score"
          rotate="4deg"
          top={30}
          right={18}
        />
        <StatCard
          icon="fitness-outline"
          value="47"
          label="Sessions completed"
          rotate="-2deg"
          top={155}
          left={55}
        />
        <StatCard
          icon="trending-up-outline"
          value="+14%"
          label="Posture improvement"
          rotate="5deg"
          top={270}
          right={14}
        />
      </View>
    </View>
  );
}
