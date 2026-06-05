import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CORNER_SIZE = 28;
const CORNER_THICKNESS = 3;

function ScanCorners() {
  return (
    <>
      {/* Top-left */}
      <View style={[styles.corner, styles.cornerTL]} />
      {/* Top-right */}
      <View style={[styles.corner, styles.cornerTR]} />
      {/* Bottom-left */}
      <View style={[styles.corner, styles.cornerBL]} />
      {/* Bottom-right */}
      <View style={[styles.corner, styles.cornerBR]} />
    </>
  );
}

function ScanLine() {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.7],
  });

  return (
    <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]} />
  );
}

export default function AnalysisScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isAnalyzing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.08, duration: 600, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      ).start();
      Animated.timing(overlayOpacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
      Animated.timing(overlayOpacity, { toValue: 0, duration: 200, useNativeDriver: true }).start();
    }
  }, [isAnalyzing]);

  const handleAnalyze = () => {
    setIsAnalyzing(prev => !prev);
  };

  const flipCamera = () => {
    setFacing(f => (f === 'back' ? 'front' : 'back'));
  };

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Requesting camera access...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionCard}>
          <Ionicons name="camera-outline" size={52} color="#1D4ED8" />
          <Text style={styles.permissionTitle}>Camera Access Needed</Text>
          <Text style={styles.permissionSub}>
            CVSF uses your camera to analyze movement and technique in real time.
          </Text>
          <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission} activeOpacity={0.8}>
            <Text style={styles.permissionBtnText}>Grant Access</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Full-screen camera */}
      <CameraView style={StyleSheet.absoluteFill} facing={facing} />

      {/* Dark vignette overlay */}
      <View style={styles.vignette} pointerEvents="none" />

      {/* Analyzing pulse overlay */}
      <Animated.View style={[styles.analyzingOverlay, { opacity: overlayOpacity }]} pointerEvents="none" />

      {/* Top bar */}
      <SafeAreaView edges={['top']} style={styles.topBar}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="chevron-down" size={20} color="#0F172A" />
          </TouchableOpacity>

          {isAnalyzing && (
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>ANALYZING</Text>
            </View>
          )}

          <TouchableOpacity style={styles.iconBtn} onPress={flipCamera} activeOpacity={0.7}>
            <Ionicons name="camera-reverse-outline" size={22} color="#0F172A" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Scan frame in center */}
      <View style={styles.scanFrame} pointerEvents="none">
        <ScanCorners />
        {isAnalyzing && <ScanLine />}
      </View>

      {/* Stats strip — visible when analyzing */}
      <Animated.View style={[styles.statsStrip, { opacity: overlayOpacity }]} pointerEvents="none">
        <View style={styles.statItem}>
          <Text style={styles.statValue}>--</Text>
          <Text style={styles.statLabel}>Rep count</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>--</Text>
          <Text style={styles.statLabel}>Form score</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>--</Text>
          <Text style={styles.statLabel}>Pace</Text>
        </View>
      </Animated.View>

      {/* Bottom panel */}
      <SafeAreaView edges={['bottom']} style={styles.bottomPanel}>
        <View style={styles.bottomHandle} />

        <View style={styles.bottomRow}>
          {/* Sport selector */}
          <View style={styles.sideAction}>
            <TouchableOpacity style={styles.sideBtn} activeOpacity={0.7}>
              <Ionicons name="fitness-outline" size={22} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.sideBtnLabel}>Sport</Text>
          </View>

          {/* Analyze button */}
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity
              style={[styles.analyzeBtn, isAnalyzing && styles.analyzeBtnActive]}
              onPress={handleAnalyze}
              activeOpacity={0.85}
            >
              <Ionicons
                name={isAnalyzing ? 'stop' : 'play'}
                size={28}
                color="#F8FAFC"
              />
            </TouchableOpacity>
          </Animated.View>
          <Text style={[styles.analyzeBtnLabel, isAnalyzing && styles.analyzeBtnLabelActive]}>
            {isAnalyzing ? 'Stop' : 'Analyze'}
          </Text>

          {/* Route / History */}
          <View style={styles.sideAction}>
            <TouchableOpacity style={styles.sideBtn} activeOpacity={0.7}>
              <Ionicons name="stats-chart-outline" size={22} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.sideBtnLabel}>History</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const SCAN_BOX = width * 0.72;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0F172A',
  },

  // Permission
  permissionContainer: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  permissionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    gap: 12,
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 8,
  },
  permissionSub: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  permissionText: {
    color: '#64748B',
    fontSize: 15,
  },
  permissionBtn: {
    marginTop: 12,
    backgroundColor: '#1D4ED8',
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  permissionBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },

  // Overlays
  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    // subtle dark edges via gradient-like shadows via nested views
    borderWidth: 0,
  },
  analyzingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(29,78,216,0.06)',
  },

  // Top bar
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 4,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.82)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'rgba(29,78,216,0.5)',
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#1D4ED8',
  },
  liveText: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  // Scan frame
  scanFrame: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: SCAN_BOX,
    height: SCAN_BOX,
    marginTop: -(SCAN_BOX / 2) - 40,
    marginLeft: -(SCAN_BOX / 2),
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: '#1D4ED8',
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: CORNER_THICKNESS,
    borderLeftWidth: CORNER_THICKNESS,
    borderTopLeftRadius: 4,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: CORNER_THICKNESS,
    borderRightWidth: CORNER_THICKNESS,
    borderTopRightRadius: 4,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CORNER_THICKNESS,
    borderLeftWidth: CORNER_THICKNESS,
    borderBottomLeftRadius: 4,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CORNER_THICKNESS,
    borderRightWidth: CORNER_THICKNESS,
    borderBottomRightRadius: 4,
  },
  scanLine: {
    position: 'absolute',
    left: 8,
    right: 8,
    top: 0,
    height: 2,
    backgroundColor: '#1D4ED8',
    opacity: 0.9,
    shadowColor: '#1D4ED8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  },

  // Stats strip
  statsStrip: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 160,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(29,78,216,0.2)',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    letterSpacing: 0.3,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(100,116,139,0.2)',
    marginVertical: 4,
  },

  // Bottom panel
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.96)',
    paddingTop: 12,
    paddingBottom: 8,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  bottomHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingBottom: 8,
  },

  // Side actions
  sideAction: {
    alignItems: 'center',
    gap: 6,
    width: 64,
  },
  sideBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sideBtnLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },

  // Analyze button
  analyzeBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1D4ED8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1D4ED8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  analyzeBtnActive: {
    backgroundColor: '#1E3A8A',
    shadowColor: '#1E3A8A',
  },
  analyzeBtnLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1D4ED8',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginTop: 6,
  },
  analyzeBtnLabelActive: {
    color: '#1E3A8A',
  },
});
