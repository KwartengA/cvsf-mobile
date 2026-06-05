import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

function FeedbackBubble({
  icon,
  label,
  sub,
  status,
  rotate,
  top,
  left,
  right,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  sub: string;
  status: 'good' | 'warn' | 'fix';
  rotate: string;
  top?: number;
  left?: number;
  right?: number;
}) {
  const colors = {
    good: { bg: '#DCFCE7', icon: '#16A34A', dot: '#16A34A' },
    warn: { bg: '#FEF9C3', icon: '#CA8A04', dot: '#CA8A04' },
    fix: { bg: '#FEE2E2', icon: '#DC2626', dot: '#DC2626' },
  }[status];

  return (
    <View
      style={{
        position: 'absolute',
        top,
        left,
        right,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderWidth: 1.5,
        borderColor: '#F3F4F6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 10,
        elevation: 4,
        width: 220,
        transform: [{ rotate }],
      }}>
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          backgroundColor: colors.bg,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Ionicons name={icon} size={20} color={colors.icon} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 13, fontWeight: '700', color: '#111827' }}>{label}</Text>
        <Text style={{ fontSize: 11, color: '#6B7280', marginTop: 1 }}>{sub}</Text>
      </View>
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.dot,
        }}
      />
    </View>
  );
}

export default function Slide2() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: 60 }}>
      
      <View style={{ paddingHorizontal: 28, marginBottom: 32 }}>
        <Text style={{ fontSize: 32, fontWeight: '800', color: '#111827', lineHeight: 40 }}>
          Instant feedback,{'\n'}
          <Text style={{ color: '#1B4D3E' }}>every rep.</Text>
        </Text>
        <Text style={{ fontSize: 15, color: '#6B7280', marginTop: 10, lineHeight: 22 }}>
          The camera catches what your eyes miss — posture cues delivered in real time.
        </Text>
      </View>

      
      <View style={{ flex: 1, position: 'relative' }}>
        <FeedbackBubble
          icon="checkmark-circle-outline"
          label="Knee alignment"
          sub="Looking great — keep it up"
          status="good"
          rotate="-4deg"
          top={8}
          left={16}
        />
        <FeedbackBubble
          icon="alert-circle-outline"
          label="Back angle"
          sub="Lean forward slightly"
          status="warn"
          rotate="3deg"
          top={90}
          right={10}
        />
        <FeedbackBubble
          icon="close-circle-outline"
          label="Elbow position"
          sub="Keep elbows tucked in"
          status="fix"
          rotate="-2deg"
          top={175}
          left={30}
        />
        <FeedbackBubble
          icon="checkmark-circle-outline"
          label="Core engaged"
          sub="Perfect tension"
          status="good"
          rotate="4deg"
          top={260}
          right={8}
        />
      </View>
    </View>
  );
}
