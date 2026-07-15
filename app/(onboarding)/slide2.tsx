import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

import { Pose, PoseSkeleton } from './PoseSkeleton';

const BG = '#0A0E0F';
const ACCENT = '#39FF88';
const WARN = '#FFC24B';
const TEXT = '#E8ECEC';
const TEXT_MUTED = '#8A9694';

const SQUAT_POSE: Pose = {
  head: { x: 0.5, y: 0.1 },
  neck: { x: 0.5, y: 0.2 },
  lShoulder: { x: 0.4, y: 0.22 },
  rShoulder: { x: 0.6, y: 0.22 },
  lElbow: { x: 0.3, y: 0.32 },
  rElbow: { x: 0.7, y: 0.32 },
  lHand: { x: 0.24, y: 0.42 },
  rHand: { x: 0.76, y: 0.42 },
  hip: { x: 0.5, y: 0.5 },
  lKnee: { x: 0.38, y: 0.66 },
  rKnee: { x: 0.62, y: 0.66 },
  lFoot: { x: 0.36, y: 0.86 },
  rFoot: { x: 0.64, y: 0.86 },
};

function Readout({ label, value, status }: { label: string; value: string; status: 'good' | 'warn' }) {
  const color = status === 'good' ? ACCENT : WARN;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#141A1B',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: status === 'good' ? 'rgba(57,255,136,0.2)' : 'rgba(255,194,75,0.25)',
      }}>
      <Ionicons name={status === 'good' ? 'checkmark-circle' : 'alert-circle'} size={16} color={color} />
      <Text style={{ color: TEXT, fontSize: 12, fontWeight: '600', flex: 1 }}>{label}</Text>
      <Text style={{ color, fontSize: 12, fontFamily: 'monospace' }}>{value}</Text>
    </View>
  );
}

export default function Slide2() {
  return (
    <View style={{ flex: 1, backgroundColor: BG, paddingTop: 76 }}>
      <View style={{ paddingHorizontal: 28, marginBottom: 8 }}>
        <Text style={{ color: ACCENT, fontSize: 12, fontWeight: '700', letterSpacing: 2, marginBottom: 12 }}>
          LIVE CORRECTION
        </Text>
        <Text style={{ fontSize: 32, fontWeight: '800', color: TEXT, lineHeight: 40 }}>
          Feedback,{'\n'}
          <Text style={{ color: ACCENT }}>every rep.</Text>
        </Text>
        <Text style={{ fontSize: 15, color: TEXT_MUTED, marginTop: 12, lineHeight: 22 }}>
          The camera catches what your eyes miss, scored joint by joint.
        </Text>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <PoseSkeleton pose={SQUAT_POSE} size={240} highlightJoints={['lKnee', 'rKnee']} />

        <View style={{ width: '100%', paddingHorizontal: 28, gap: 8 }}>
          <Readout label="Knee alignment" value="OK" status="good" />
          <Readout label="Back angle" value="52°" status="warn" />
          <Readout label="Depth" value="94%" status="good" />
        </View>
      </View>
    </View>
  );
}
