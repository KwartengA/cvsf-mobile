import { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path, Rect, Line } from 'react-native-svg';

const { width } = Dimensions.get('window');
const GUTTER = 20;
const GAP = 12;
const HALF = (width - GUTTER * 2 - GAP) / 2;

// ─── Ring progress ────────────────────────────────────────────────────────────

function RingProgress({ value, max, size = 72 }: { value: number; max: number; size?: number }) {
  const r = (size - 10) / 2;
  const circumference = 2 * Math.PI * r;
  const progress = (value / max) * circumference;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Track */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="#E2E8F0"
        strokeWidth={5}
        fill="none"
      />
      {/* Progress */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="#0F172A"
        strokeWidth={5}
        fill="none"
        strokeDasharray={`${progress} ${circumference}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {/* Center label */}
    </Svg>
  );
}

// ─── Activity dot grid (Jan/Feb/Mar) ─────────────────────────────────────────

const ACTIVITY: Record<string, number[][]> = {
  Jan: [
    [0, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 1, 0],
  ],
  Feb: [
    [0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 1],
  ],
  Mar: [
    [1, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0],
  ],
};

function ActivityDots() {
  return (
    <View style={dotStyles.root}>
      {Object.entries(ACTIVITY).map(([month, rows]) => (
        <View key={month} style={dotStyles.col}>
          <Text style={dotStyles.monthLabel}>{month}</Text>
          <View style={dotStyles.grid}>
            {rows.map((row, ri) => (
              <View key={ri} style={dotStyles.row}>
                {row.map((active, ci) => (
                  <View
                    key={ci}
                    style={[
                      dotStyles.dot,
                      active ? dotStyles.dotActive : dotStyles.dotInactive,
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const dotStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  col: { flex: 1 },
  monthLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 8,
  },
  grid: { gap: 5 },
  row: { flexDirection: 'row', gap: 5 },
  dot: { width: 7, height: 7, borderRadius: 3.5 },
  dotActive: { backgroundColor: '#0F172A' },
  dotInactive: { backgroundColor: '#E2E8F0' },
});

// ─── Sparkline bar chart ──────────────────────────────────────────────────────

const VOLUME_BARS = [0.4, 0.6, 0.3, 0.8, 0.5, 0.9, 0.7];

function SparkBars() {
  return (
    <View style={sparkStyles.root}>
      {VOLUME_BARS.map((v, i) => (
        <View key={i} style={sparkStyles.barWrap}>
          <View style={[sparkStyles.bar, { height: `${v * 100}%` }]} />
        </View>
      ))}
    </View>
  );
}

const sparkStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 48,
    gap: 4,
    marginTop: 8,
  },
  barWrap: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    backgroundColor: '#0F172A',
    borderRadius: 3,
    opacity: 0.18,
    width: '100%',
  },
});

// ─── Home screen ──────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Workouts</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
              <Ionicons name="options-outline" size={18} color="#0F172A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
              <Ionicons name="add" size={20} color="#0F172A" />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View style={[styles.bentoGrid, { opacity: fadeAnim }]}>

          {/* Row 1: two half-width cards */}
          <View style={styles.row}>

            {/* Card: Next workout */}
            <TouchableOpacity style={[styles.card, styles.halfCard]} activeOpacity={0.85}>
              <View style={styles.cardTopRow}>
                <View style={styles.ringWrap}>
                  <RingProgress value={1} max={4} size={68} />
                  <Text style={styles.ringLabel}>1</Text>
                </View>
                <TouchableOpacity style={styles.adjustBtn} activeOpacity={0.7}>
                  <Ionicons name="options-outline" size={14} color="#94A3B8" />
                </TouchableOpacity>
              </View>
              <View style={styles.cardTextBlock}>
                <Text style={styles.cardTitle}>Chest + tricep</Text>
                <Text style={styles.cardSub}>Fridays</Text>
              </View>
            </TouchableOpacity>

            {/* Card: Body weight */}
            <TouchableOpacity style={[styles.card, styles.halfCard]} activeOpacity={0.85}>
              <View style={styles.cardTopRow}>
                <View style={{ flex: 1 }} />
                <TouchableOpacity style={styles.adjustBtn} activeOpacity={0.7}>
                  <Ionicons name="options-outline" size={14} color="#94A3B8" />
                </TouchableOpacity>
              </View>
              <View style={styles.cardTextBlock}>
                <View style={styles.weightRow}>
                  <Text style={styles.bigNumber}>190</Text>
                  <Text style={styles.bigUnit}>lbs</Text>
                </View>
                <Text style={styles.cardTitle}>Body weight</Text>
                <Text style={styles.cardSub}>31 min ago</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Row 2: full-width activity card */}
          <TouchableOpacity style={[styles.card, styles.fullCard]} activeOpacity={0.9}>
            <ActivityDots />
            <View style={styles.workoutRowDivider} />
            <View style={styles.workoutRow}>
              <View style={styles.ringWrapSm}>
                <RingProgress value={2} max={4} size={52} />
                <Text style={styles.ringLabelSm}>2</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Back + bicep + legs</Text>
                <Text style={styles.cardSub}>Mondays</Text>
              </View>
              <TouchableOpacity style={styles.adjustBtn} activeOpacity={0.7}>
                <Ionicons name="options-outline" size={14} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/* Row 3: full-width volume card */}
          <TouchableOpacity style={[styles.card, styles.fullCard]} activeOpacity={0.9}>
            <View style={styles.volumeRow}>
              <View>
                <Text style={styles.cardTitle}>Volume lifted</Text>
                <Text style={styles.cardSub}>Last 7 days</Text>
              </View>
              <View style={styles.volumeRight}>
                <View style={styles.weightRow}>
                  <Text style={styles.bigNumber}>3,200</Text>
                  <Text style={styles.bigUnit}>lbs</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.adjustBtn} activeOpacity={0.7}>
                <Ionicons name="options-outline" size={14} color="#94A3B8" />
              </TouchableOpacity>
            </View>
            <SparkBars />
          </TouchableOpacity>

          {/* Row 4: two half-width stat cards */}
          <View style={styles.row}>
            {/* Streak */}
            <TouchableOpacity style={[styles.card, styles.halfCard]} activeOpacity={0.85}>
              <Ionicons name="flame-outline" size={22} color="#F97316" style={{ marginBottom: 8 }} />
              <Text style={styles.bigNumber}>14</Text>
              <Text style={styles.cardTitle}>Day streak</Text>
              <Text style={styles.cardSub}>Personal best</Text>
            </TouchableOpacity>

            {/* This week */}
            <TouchableOpacity style={[styles.card, styles.halfCard]} activeOpacity={0.85}>
              <Ionicons name="calendar-outline" size={22} color="#6366F1" style={{ marginBottom: 8 }} />
              <Text style={styles.bigNumber}>3</Text>
              <Text style={styles.cardTitle}>This week</Text>
              <Text style={styles.cardSub}>of 4 sessions</Text>
            </TouchableOpacity>
          </View>

        </Animated.View>

        <View style={{ height: 32 }} />
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
  scroll: {
    paddingHorizontal: GUTTER,
    paddingTop: 8,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Bento grid
  bentoGrid: {
    gap: GAP,
  },
  row: {
    flexDirection: 'row',
    gap: GAP,
  },

  // Cards
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  halfCard: {
    width: HALF,
    minHeight: 170,
    justifyContent: 'space-between',
  },
  fullCard: {
    width: '100%',
  },

  // Card content
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  adjustBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTextBlock: {
    gap: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardSub: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },

  // Ring
  ringWrap: {
    width: 68,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringLabel: {
    position: 'absolute',
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  ringWrapSm: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  ringLabelSm: {
    position: 'absolute',
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },

  // Numbers
  weightRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  bigNumber: {
    fontSize: 38,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 42,
    letterSpacing: -1,
  },
  bigUnit: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 5,
  },

  // Activity card
  workoutRowDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E2E8F0',
    marginVertical: 14,
  },
  workoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Volume card
  volumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  volumeRight: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 8,
  },
});
