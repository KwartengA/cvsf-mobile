import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type RowItem = {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  label: string;
  chevron?: boolean;
  onPress?: () => void;
};

function SettingsRow({ icon, iconColor, label, chevron }: RowItem) {
  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.65}>
      <View style={[styles.rowIcon, { backgroundColor: iconColor + '18' }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={styles.rowLabel}>{label}</Text>
      {chevron && (
        <Ionicons name="chevron-forward" size={16} color="#C0C9D4" style={styles.chevron} />
      )}
    </TouchableOpacity>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

export default function ProfileScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces
      >
        
        <Text style={styles.title}>Settings</Text>

    
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={42} color="#B0BEC5" />
            </View>
            <TouchableOpacity style={styles.avatarEditBtn} activeOpacity={0.8}>
              <Ionicons name="camera" size={13} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.username}>User</Text>
          <Text style={styles.userSub}>CVSF Athlete</Text>
        </View>

        
        <View style={styles.card}>
          <SettingsRow
            icon="create-outline"
            iconColor="#5B8DEF"
            label="Edit Profile"
          />
        </View>

        
        <View style={styles.card}>
          <SettingsRow
            icon="lock-closed-outline"
            iconColor="#22C55E"
            label="Privacy Policy"
          />
          <Divider />
          <SettingsRow
            icon="document-text-outline"
            iconColor="#F97316"
            label="Terms of Service"
          />
          <Divider />
          <SettingsRow
            icon="information-circle-outline"
            iconColor="#A855F7"
            label="About"
            chevron
          />
        </View>

        
        <View style={styles.card}>
          <SettingsRow
            icon="star-outline"
            iconColor="#EAB308"
            label="Rate the app"
          />
          <Divider />
          <SettingsRow
            icon="share-social-outline"
            iconColor="#EF4444"
            label="Share the app"
          />
        </View>

        
        <TouchableOpacity style={styles.signOutBtn} activeOpacity={0.8}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F2F4F7',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 0.2,
  },

  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 14,
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  avatarEditBtn: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F2F4F7',
  },
  username: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.3,
  },
  userSub: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 3,
    fontWeight: '500',
    letterSpacing: 0.4,
  },


  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

 
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 52,
  },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
  },
  chevron: {
    marginLeft: 4,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E8EDF2',
    marginLeft: 64,
  },


  signOutBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#EF4444',
  },
});
