import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';


function WorkoutCard({
  title,
  sessions,
  duration,
  level,
  rotate,
  top,
  left,
  right,
  accent,
}: {
  title: string;
  sessions: string;
  duration: string;
  level: string;
  rotate: string;
  top?: number;
  left?: number;
  right?: number;
  accent?: boolean;
}) {
  return (
    <View
      style={{
        position: 'absolute',
        top,
        left,
        right,
        width: 170,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 12,
        borderWidth: 1.5,
        borderColor: accent ? '#1B4D3E' : '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 12,
        elevation: 4,
        transform: [{ rotate }],
      }}>
   
      <View
        style={{
          height: 70,
          backgroundColor: '#F3F4F6',
          borderRadius: 8,
          marginBottom: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Ionicons name="fitness-outline" size={28} color="#1B4D3E" />
      </View>
      <Text style={{ fontSize: 13, fontWeight: '700', color: '#111827', marginBottom: 6 }}>
        {title}
      </Text>
      <View style={{ gap: 3 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Ionicons name="layers-outline" size={11} color="#6B7280" />
          <Text style={{ fontSize: 11, color: '#6B7280' }}>{sessions} Sessions</Text>
          <Ionicons name="time-outline" size={11} color="#6B7280" style={{ marginLeft: 4 }} />
          <Text style={{ fontSize: 11, color: '#6B7280' }}>{duration}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Ionicons name="star-outline" size={11} color="#6B7280" />
          <Text style={{ fontSize: 11, color: '#6B7280' }}>{level}</Text>
        </View>
      </View>
    </View>
  );
}

export default function Slide1() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: 60 }}>
   
      <View style={{ paddingHorizontal: 28, marginBottom: 32 }}>
        <Text style={{ fontSize: 32, fontWeight: '800', color: '#111827', lineHeight: 40 }}>
          AI-powered training,{'\n'}
          <Text style={{ color: '#1B4D3E' }}>built for you.</Text>
        </Text>
        <Text style={{ fontSize: 15, color: '#6B7280', marginTop: 10, lineHeight: 22 }}>
          Real-time posture analysis across tennis, basketball, swimming and gym.
        </Text>
      </View>

      
      
      <View style={{ flex: 1, position: 'relative' }}>
        <WorkoutCard
          title="Serve Mechanics"
          sessions="24"
          duration="20 min/day"
          level="Beginner"
          rotate="-6deg"
          top={10}
          left={20}
        />
        <WorkoutCard
          title="Squat Form"
          sessions="30"
          duration="15 min/day"
          level="Intermediate"
          rotate="5deg"
          top={20}
          right={16}
        />
        <WorkoutCard
          title="Free Throw Posture"
          sessions="48"
          duration="20 min/day"
          level="Beginner"
          rotate="-2deg"
          top={130}
          left={60}
          accent
        />
      </View>
    </View>
  );
}
