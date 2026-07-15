import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

import { useReducedMotion } from './useReducedMotion';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type Point = { x: number; y: number };

export type Pose = {
  head: Point;
  neck: Point;
  lShoulder: Point;
  rShoulder: Point;
  lElbow: Point;
  rElbow: Point;
  lHand: Point;
  rHand: Point;
  hip: Point;
  lKnee: Point;
  rKnee: Point;
  lFoot: Point;
  rFoot: Point;
};

const BONES: [keyof Pose, keyof Pose][] = [
  ['head', 'neck'],
  ['neck', 'lShoulder'],
  ['neck', 'rShoulder'],
  ['lShoulder', 'lElbow'],
  ['lElbow', 'lHand'],
  ['rShoulder', 'rElbow'],
  ['rElbow', 'rHand'],
  ['lShoulder', 'hip'],
  ['rShoulder', 'hip'],
  ['hip', 'lKnee'],
  ['lKnee', 'lFoot'],
  ['hip', 'rKnee'],
  ['rKnee', 'rFoot'],
];

const JOINTS: (keyof Pose)[] = [
  'head',
  'neck',
  'lShoulder',
  'rShoulder',
  'lElbow',
  'rElbow',
  'lHand',
  'rHand',
  'hip',
  'lKnee',
  'rKnee',
  'lFoot',
  'rFoot',
];

const ACCENT = '#39FF88';
const ACCENT_DIM = '#1E5C3E';

export function PoseSkeleton({
  pose,
  size = 280,
  highlightJoints = [],
}: {
  pose: Pose;
  size?: number;
  highlightJoints?: (keyof Pose)[];
}) {
  const pulse = useRef(new Animated.Value(0)).current;
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      pulse.setValue(0.5);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse, reducedMotion]);

  const radius = pulse.interpolate({ inputRange: [0, 1], outputRange: [4, 6] });

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {BONES.map(([a, b], i) => {
        const pa = pose[a];
        const pb = pose[b];
        return (
          <Line
            key={i}
            x1={pa.x * 100}
            y1={pa.y * 100}
            x2={pb.x * 100}
            y2={pb.y * 100}
            stroke={ACCENT_DIM}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        );
      })}
      {JOINTS.map((j) => {
        const p = pose[j];
        const isHighlighted = highlightJoints.includes(j);
        return isHighlighted ? (
          <AnimatedCircle
            key={j}
            cx={p.x * 100}
            cy={p.y * 100}
            r={radius}
            fill={ACCENT}
          />
        ) : (
          <Circle key={j} cx={p.x * 100} cy={p.y * 100} r={2.6} fill={ACCENT_DIM} />
        );
      })}
    </Svg>
  );
}
