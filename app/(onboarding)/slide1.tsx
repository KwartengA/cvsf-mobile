import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';

import { Pose, PoseSkeleton } from './PoseSkeleton';
import { useReducedMotion } from './useReducedMotion';

const BG = '#0A0E0F';
const ACCENT = '#39FF88';
const TEXT = '#E8ECEC';
const TEXT_MUTED = '#8A9694';

const SERVE_POSE: Pose = {
  head: { x: 0.56, y: 0.08 },
  neck: { x: 0.54, y: 0.16 },
  lShoulder: { x: 0.44, y: 0.18 },
  rShoulder: { x: 0.62, y: 0.17 },
  lElbow: { x: 0.34, y: 0.28 },
  rElbow: { x: 0.72, y: 0.08 },
  lHand: { x: 0.28, y: 0.4 },
  rHand: { x: 0.78, y: -0.02 },
  hip: { x: 0.5, y: 0.42 },
  lKnee: { x: 0.42, y: 0.62 },
  rKnee: { x: 0.58, y: 0.6 },
  lFoot: { x: 0.4, y: 0.84 },
  rFoot: { x: 0.62, y: 0.8 },
};

export default function Slide1() {
  const angle = useRef(new Animated.Value(0)).current;
  const [angleLabel, setAngleLabel] = React.useState('162°');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const id = angle.addListener(({ value }) => {
      setAngleLabel(`${Math.round(162 + value * 16)}°`);
    });
    if (reducedMotion) {
      setAngleLabel('170°');
      return () => angle.removeListener(id);
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(angle, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
        Animated.timing(angle, { toValue: 0, duration: 1400, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
      ])
    );
    loop.start();
    return () => {
      loop.stop();
      angle.removeListener(id);
    };
  }, [angle, reducedMotion]);

  return (
    <View style={{ flex: 1, backgroundColor: BG, paddingTop: 76 }}>
      <View style={{ paddingHorizontal: 28, marginBottom: 8 }}>
        <Text style={{ color: ACCENT, fontSize: 12, fontWeight: '700', letterSpacing: 2, marginBottom: 12 }}>
          COMPUTER VISION
        </Text>
        <Text style={{ fontSize: 32, fontWeight: '800', color: TEXT, lineHeight: 40 }}>
          Your camera{'\n'}reads form{'\n'}
          <Text style={{ color: ACCENT }}>like a coach.</Text>
        </Text>
        <Text style={{ fontSize: 15, color: TEXT_MUTED, marginTop: 12, lineHeight: 22 }}>
          Real-time posture tracking across tennis, basketball, swimming and gym.
        </Text>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <PoseSkeleton pose={SERVE_POSE} size={260} highlightJoints={['rHand', 'rElbow', 'hip']} />
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            backgroundColor: '#141A1B',
            borderRadius: 10,
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: 'rgba(57,255,136,0.2)',
          }}>
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: ACCENT }} />
          <Text style={{ color: ACCENT, fontSize: 12, fontFamily: 'monospace', letterSpacing: 0.5 }}>
            ARM EXTENSION · {angleLabel}
          </Text>
        </View>
      </View>
    </View>
  );
}
