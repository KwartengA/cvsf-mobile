import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Ellipse, Rect, Line } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

// ─── Sport SVG illustrations ──────────────────────────────────────────────────

function SwimmingIllustration() {
  return (
    <Svg width={180} height={140} viewBox="0 0 180 140" opacity={0.18}>
      {/* Swimmer body */}
      <Ellipse cx={90} cy={70} rx={50} ry={18} fill="#fff" />
      {/* Arms */}
      <Path d="M50 65 Q30 50 15 60" stroke="#fff" strokeWidth={7} strokeLinecap="round" fill="none" />
      <Path d="M130 65 Q150 50 165 58" stroke="#fff" strokeWidth={7} strokeLinecap="round" fill="none" />
      {/* Head */}
      <Circle cx={90} cy={52} r={14} fill="#fff" />
      {/* Cap */}
      <Path d="M76 52 Q90 36 104 52" fill="#fff" />
      {/* Goggles */}
      <Circle cx={84} cy={53} r={4} stroke="#00B4D8" strokeWidth={2} fill="none" />
      <Circle cx={96} cy={53} r={4} stroke="#00B4D8" strokeWidth={2} fill="none" />
      <Line x1={88} y1={53} x2={92} y2={53} stroke="#00B4D8" strokeWidth={2} />
      {/* Waves */}
      <Path d="M10 95 Q30 85 50 95 Q70 105 90 95 Q110 85 130 95 Q150 105 170 95" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />
      <Path d="M10 110 Q30 100 50 110 Q70 120 90 110 Q110 100 130 110 Q150 120 170 110" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.5} />
    </Svg>
  );
}

function TennisIllustration() {
  return (
    <Svg width={180} height={140} viewBox="0 0 180 140" opacity={0.18}>
      {/* Racket frame */}
      <Ellipse cx={100} cy={55} rx={38} ry={44} stroke="#fff" strokeWidth={7} fill="none" />
      {/* Racket strings H */}
      <Line x1={63} y1={40} x2={137} y2={40} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
      <Line x1={63} y1={52} x2={137} y2={52} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
      <Line x1={63} y1={64} x2={137} y2={64} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
      <Line x1={66} y1={76} x2={134} y2={76} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
      {/* Racket strings V */}
      <Line x1={80} y1={12} x2={80} y2={98} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
      <Line x1={92} y1={11} x2={92} y2={99} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
      <Line x1={104} y1={11} x2={104} y2={99} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
      <Line x1={116} y1={13} x2={116} y2={97} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
      {/* Handle */}
      <Path d="M78 97 L55 128" stroke="#fff" strokeWidth={9} strokeLinecap="round" />
      {/* Grip wrap */}
      <Path d="M73 108 L60 121" stroke="#C8A96E" strokeWidth={4} strokeLinecap="round" opacity={0.7} />
      {/* Ball */}
      <Circle cx={38} cy={40} r={16} fill="#CCFF00" opacity={0.9} />
      <Path d="M24 34 Q38 44 52 34" stroke="#fff" strokeWidth={2} fill="none" />
      <Path d="M24 46 Q38 36 52 46" stroke="#fff" strokeWidth={2} fill="none" />
    </Svg>
  );
}

function GymIllustration() {
  return (
    <Svg width={180} height={140} viewBox="0 0 180 140" opacity={0.18}>
      {/* Bar */}
      <Rect x={20} y={62} width={140} height={14} rx={7} fill="#fff" />
      {/* Left weight outer */}
      <Rect x={10} y={42} width={22} height={54} rx={8} fill="#fff" />
      {/* Left weight inner */}
      <Rect x={36} y={50} width={12} height={38} rx={5} fill="#fff" />
      {/* Right weight inner */}
      <Rect x={132} y={50} width={12} height={38} rx={5} fill="#fff" />
      {/* Right weight outer */}
      <Rect x={148} y={42} width={22} height={54} rx={8} fill="#fff" />
      {/* Lifter body */}
      <Ellipse cx={90} cy={105} rx={18} ry={22} fill="#fff" />
      {/* Lifter head */}
      <Circle cx={90} cy={82} r={12} fill="#fff" />
      {/* Arms up */}
      <Path d="M72 95 Q60 75 48 69" stroke="#fff" strokeWidth={7} strokeLinecap="round" fill="none" />
      <Path d="M108 95 Q120 75 132 69" stroke="#fff" strokeWidth={7} strokeLinecap="round" fill="none" />
    </Svg>
  );
}

function BasketballIllustration() {
  return (
    <Svg width={180} height={140} viewBox="0 0 180 140" opacity={0.18}>
      {/* Hoop backboard */}
      <Rect x={130} y={10} width={36} height={60} rx={4} fill="#fff" opacity={0.5} />
      <Rect x={136} y={16} width={24} height={40} rx={2} stroke="#fff" strokeWidth={2} fill="none" />
      {/* Hoop rim */}
      <Ellipse cx={148} cy={68} rx={18} ry={5} stroke="#F97316" strokeWidth={3} fill="none" />
      {/* Hoop pole */}
      <Line x1={166} y1={10} x2={166} y2={130} stroke="#fff" strokeWidth={5} strokeLinecap="round" />
      {/* Net lines */}
      <Line x1={130} y1={68} x2={136} y2={90} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
      <Line x1={138} y1={70} x2={140} y2={92} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
      <Line x1={148} y1={73} x2={148} y2={92} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
      <Line x1={158} y1={70} x2={156} y2={92} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
      <Line x1={166} y1={68} x2={160} y2={90} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
      <Path d="M133 82 Q148 88 163 82" stroke="#fff" strokeWidth={1.5} fill="none" opacity={0.5} />
      {/* Ball */}
      <Circle cx={60} cy={88} r={38} fill="#F97316" opacity={0.85} />
      <Path d="M24 84 Q60 70 96 84" stroke="#1a1a1a" strokeWidth={2.5} fill="none" />
      <Path d="M24 92 Q60 106 96 92" stroke="#1a1a1a" strokeWidth={2.5} fill="none" />
      <Line x1={60} y1={50} x2={60} y2={126} stroke="#1a1a1a" strokeWidth={2.5} />
    </Svg>
  );
}

// ─── Sport data ───────────────────────────────────────────────────────────────

type Sport = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  level: string;
  lessons: number;
  gradient: [string, string];
  accent: string;
  icon: keyof typeof Ionicons.glyphMap;
  Illustration: () => React.ReactElement;
};

const SPORTS: Sport[] = [
  {
    id: 'swimming',
    name: 'Swimming',
    category: 'Water Sport',
    tagline: 'Master your stroke & breathing technique',
    level: 'All levels',
    lessons: 12,
    gradient: ['#0077B6', '#00B4D8'],
    accent: '#90E0EF',
    icon: 'water-outline',
    Illustration: SwimmingIllustration,
  },
  {
    id: 'tennis',
    name: 'Tennis',
    category: 'Racket Sport',
    tagline: 'Build power, precision and court awareness',
    level: 'Beginner · Pro',
    lessons: 9,
    gradient: ['#1B5E20', '#43A047'],
    accent: '#CCFF00',
    icon: 'tennisball-outline',
    Illustration: TennisIllustration,
  },
  {
    id: 'gym',
    name: 'Gym',
    category: 'Strength Training',
    tagline: 'Form-focused lifting for real results',
    level: 'All levels',
    lessons: 15,
    gradient: ['#1A1A2E', '#E94560'],
    accent: '#FF6B8A',
    icon: 'barbell-outline',
    Illustration: GymIllustration,
  },
  {
    id: 'basketball',
    name: 'Basketball',
    category: 'Team Sport',
    tagline: 'Drills, plays and movement mastery',
    level: 'Intermediate',
    lessons: 11,
    gradient: ['#7B3F00', '#F97316'],
    accent: '#FED7AA',
    icon: 'basketball-outline',
    Illustration: BasketballIllustration,
  },
];

// ─── Sport Card ───────────────────────────────────────────────────────────────

function SportCard({ sport, onPress }: { sport: Sport; onPress: () => void }) {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: sport.gradient[0],
          transform: [{ scale: pressed ? 0.975 : 1 }],
        },
      ]}
    >
      {/* Gradient overlay using nested views */}
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: 24,
            backgroundColor: sport.gradient[1],
            opacity: 0.45,
          },
        ]}
      />

      {/* Background illustration */}
      <View style={styles.illustrationBg}>
        <sport.Illustration />
      </View>

      {/* Top row: category badge + lessons count */}
      <View style={styles.cardTop}>
        <View style={[styles.categoryBadge, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
          <Ionicons name={sport.icon} size={13} color={sport.accent} />
          <Text style={[styles.categoryText, { color: sport.accent }]}>{sport.category}</Text>
        </View>
        <View style={styles.lessonsBadge}>
          <Text style={styles.lessonsText}>{sport.lessons} lessons</Text>
        </View>
      </View>

      {/* Bottom content */}
      <View style={styles.cardBottom}>
        <Text style={styles.sportName}>{sport.name}</Text>
        <Text style={styles.sportTagline}>{sport.tagline}</Text>

        <View style={styles.cardFooter}>
          <View style={styles.levelPill}>
            <View style={[styles.levelDot, { backgroundColor: sport.accent }]} />
            <Text style={styles.levelText}>{sport.level}</Text>
          </View>
          <TouchableOpacity
            style={[styles.startBtn, { backgroundColor: sport.accent }]}
            activeOpacity={0.85}
            onPress={onPress}
          >
            <Text style={[styles.startBtnText, { color: sport.gradient[0] }]}>Start</Text>
            <Ionicons name="arrow-forward" size={13} color={sport.gradient[0]} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function LearnScreen() {
  const [_selected, setSelected] = useState<string | null>(null);

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerEyebrow}>CVSF Training</Text>
          <Text style={styles.headerTitle}>Choose a Sport</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
          <Ionicons name="options-outline" size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Select a sport to start AI-powered coaching sessions
      </Text>

      {/* Cards list */}
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {SPORTS.map(sport => (
          <SportCard
            key={sport.id}
            sport={sport}
            onPress={() => setSelected(sport.id)}
          />
        ))}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    marginBottom: 6,
  },
  headerEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F97316',
    letterSpacing: 2,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.2,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  subtitle: {
    fontSize: 13,
    color: '#64748B',
    paddingHorizontal: 20,
    marginBottom: 20,
    lineHeight: 20,
  },

  // List
  list: {
    paddingHorizontal: 20,
    gap: 16,
  },

  // Card
  card: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: 24,
    padding: 20,
    justifyContent: 'space-between',
    overflow: 'hidden',
    // Press shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  illustrationBg: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },

  // Card top
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  lessonsBadge: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  lessonsText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
  },

  // Card bottom
  cardBottom: {
    gap: 6,
  },
  sportName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  sportTagline: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.72)',
    lineHeight: 17,
    maxWidth: '65%',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  levelPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  levelDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  levelText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500',
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  startBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
