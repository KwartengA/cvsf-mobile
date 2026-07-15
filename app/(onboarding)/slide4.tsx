import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BG = '#0A0E0F';
const ACCENT = '#39FF88';
const TEXT = '#E8ECEC';
const TEXT_MUTED = '#8A9694';
const SURFACE = '#141A1B';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const CHART_PATH = 'M2,58 L20,52 L38,55 L56,38 L74,30 L92,20 L110,12 L128,6';
const CHART_LENGTH = 200;

function StatBlock({ icon, value, label }: { icon: React.ComponentProps<typeof Ionicons>['name']; value: string; label: string }) {
  return (
    <View style={{ flex: 1, backgroundColor: SURFACE, borderRadius: 16, padding: 16, gap: 6 }}>
      <Ionicons name={icon} size={18} color={ACCENT} />
      <Text style={{ fontSize: 20, fontWeight: '800', color: TEXT, fontFamily: 'monospace' }}>{value}</Text>
      <Text style={{ fontSize: 11, color: TEXT_MUTED }}>{label}</Text>
    </View>
  );
}

export default function Slide4() {
  const draw = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    draw.setValue(0);
    Animated.timing(draw, {
      toValue: 1,
      duration: 1200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
      delay: 200,
    }).start();
  }, [draw]);

  const dashoffset = draw.interpolate({ inputRange: [0, 1], outputRange: [CHART_LENGTH, 0] });

  return (
    <View style={{ flex: 1, backgroundColor: BG, paddingTop: 76 }}>
      <View style={{ paddingHorizontal: 28, marginBottom: 24 }}>
        <Text style={{ color: ACCENT, fontSize: 12, fontWeight: '700', letterSpacing: 2, marginBottom: 12 }}>
          MEASURED PROGRESS
        </Text>
        <Text style={{ fontSize: 32, fontWeight: '800', color: TEXT, lineHeight: 40 }}>
          Watch yourself{'\n'}
          <Text style={{ color: ACCENT }}>get better.</Text>
        </Text>
        <Text style={{ fontSize: 15, color: TEXT_MUTED, marginTop: 12, lineHeight: 22 }}>
          Every session scored and charted, so improvement isn't a guess.
        </Text>
      </View>

      <View style={{ paddingHorizontal: 28 }}>
        <View style={{ backgroundColor: SURFACE, borderRadius: 20, padding: 20, marginBottom: 16 }}>
          <Text style={{ color: TEXT_MUTED, fontSize: 11, marginBottom: 4 }}>AVG FORM SCORE</Text>
          <Text style={{ color: TEXT, fontSize: 28, fontWeight: '800', fontFamily: 'monospace', marginBottom: 12 }}>
            88%
          </Text>
          <Svg width="100%" height={64} viewBox="0 0 130 64">
            <AnimatedPath
              d={CHART_PATH}
              stroke={ACCENT}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray={CHART_LENGTH}
              strokeDashoffset={dashoffset}
            />
          </Svg>
        </View>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <StatBlock icon="flame-outline" value="12" label="Day streak" />
          <StatBlock icon="fitness-outline" value="47" label="Sessions" />
          <StatBlock icon="trending-up-outline" value="+14%" label="Improvement" />
        </View>
      </View>
    </View>
  );
}
