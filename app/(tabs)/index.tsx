import { Link } from 'expo-router';
import { StyleSheet, View, Text, Pressable, ScrollView, StatusBar, Animated, Easing } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [activeTab, setActiveTab] = useState('suggestions');
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Mock data
  const currentGameweek = {
    number: 28,
    deadline: '10 Feb 11:30',
    isActive: true,
    daysLeft: 2
  };

  const myTeam = {
    name: 'Klopptimists FC',
    points: 1580,
    rank: 45231,
    chipUsed: 'Bench Boost',
    value: 102.8
  };

  const aiSuggestions = [
    { id: 1, playerIn: 'Watkins', playerOut: 'Nketiah', reason: 'Better fixtures & form', confidence: 85, trend: 'up' },
    { id: 2, playerIn: 'Palmer', playerOut: 'Sterling', reason: 'Higher xGI per 90', confidence: 78, trend: 'up' },
    { id: 3, playerIn: 'Gabriel', playerOut: 'Chilwell', reason: 'Less rotation risk', confidence: 92, trend: 'steady' }
  ];

  useEffect(() => {
    // Entry animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    ]).start();

    // Pulsing animation for important elements
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up': return <Ionicons name="trending-up" size={16} color="#4CAF50" />;
      case 'down': return <Ionicons name="trending-down" size={16} color="#F44336" />;
      default: return <Ionicons name="trending-flat" size={16} color="#FFC107" />;
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        isDarkMode && styles.darkContainer,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
      ]}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {/* Gradient Header */}
      <Animated.View style={[
        styles.header,
        isDarkMode && styles.darkHeader,
        { transform: [{ scale: pulseAnim }] }
      ]}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerSubtitle}>FPL COMPANION</Text>
            <Text style={styles.headerTitle}>Gameweek {currentGameweek.number}</Text>
          </View>
          <MaterialCommunityIcons 
            name="robot-happy-outline" 
            size={28} 
            color={isDarkMode ? '#00FF87' : '#37003C'} 
          />
        </View>
        
        <View style={styles.deadlineContainer}>
          <Ionicons name="time-outline" size={16} color="#FFFFFF" />
          <Text style={styles.deadlineText}>
            Deadline: {currentGameweek.deadline} ({currentGameweek.daysLeft}d)
          </Text>
        </View>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* AI Assistant Card */}
        <View style={[styles.assistantCard, isDarkMode && styles.darkAssistantCard]}>
          <View style={styles.assistantHeader}>
            <MaterialCommunityIcons 
              name="robot" 
              size={24} 
              color={isDarkMode ? '#00FF87' : '#37003C'} 
            />
            <Text style={[styles.assistantTitle, isDarkMode && styles.darkText]}>AI ASSISTANT</Text>
          </View>
          <Text style={[styles.assistantMessage, isDarkMode && styles.darkText]}>
            "Your team is strong but consider swapping Nketiah for Watkins to capitalize on Villa's upcoming fixtures."
          </Text>
          <Link href="/ai-assistant" asChild>
            <Pressable style={({ pressed }) => [
              styles.assistantButton,
              isDarkMode && styles.darkAssistantButton,
              { opacity: pressed ? 0.9 : 1 }
            ]}>
              <Text style={styles.assistantButtonText}>CHAT WITH AI COACH</Text>
              <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
            </Pressable>
          </Link>
        </View>

        {/* Recommendation Tabs */}
        <View style={styles.tabsContainer}>
          <Pressable 
            style={[styles.tabButton, activeTab === 'suggestions' && styles.activeTab]}
            onPress={() => setActiveTab('suggestions')}
          >
            <MaterialCommunityIcons 
              name="swap-horizontal" 
              size={20} 
              color={activeTab === 'suggestions' ? '#FFFFFF' : (isDarkMode ? '#AAAAAA' : '#666666')} 
            />
            <Text style={[
              styles.tabText,
              activeTab === 'suggestions' && styles.activeTabText
            ]}>
              Transfers
            </Text>
          </Pressable>
          
          <Pressable 
            style={[styles.tabButton, activeTab === 'captain' && styles.activeTab]}
            onPress={() => setActiveTab('captain')}
          >
            <MaterialCommunityIcons 
              name="arm-flex" 
              size={20} 
              color={activeTab === 'captain' ? '#FFFFFF' : (isDarkMode ? '#AAAAAA' : '#666666')} 
            />
            <Text style={[
              styles.tabText,
              activeTab === 'captain' && styles.activeTabText
            ]}>
              Captain
            </Text>
          </Pressable>
          
          <Pressable 
            style={[styles.tabButton, activeTab === 'differentials' && styles.activeTab]}
            onPress={() => setActiveTab('differentials')}
          >
            <MaterialCommunityIcons 
              name="chart-line" 
              size={20} 
              color={activeTab === 'differentials' ? '#FFFFFF' : (isDarkMode ? '#AAAAAA' : '#666666')} 
            />
            <Text style={[
              styles.tabText,
              activeTab === 'differentials' && styles.activeTabText
            ]}>
              Differentials
            </Text>
          </Pressable>
        </View>

        {/* Recommendation Content */}
        <View style={[styles.recommendationContent, isDarkMode && styles.darkRecommendationContent]}>
          {activeTab === 'suggestions' && aiSuggestions.map((suggestion) => (
            <View key={suggestion.id} style={[styles.suggestionCard, isDarkMode && styles.darkSuggestionCard]}>
              <View style={styles.suggestionHeader}>
                <View style={styles.confidenceBadge}>
                  <Text style={styles.confidenceText}>{suggestion.confidence}%</Text>
                </View>
                {getTrendIcon(suggestion.trend)}
              </View>
              
              <View style={styles.playerSwapContainer}>
                <View style={styles.playerOutContainer}>
                  <Text style={styles.playerOutText}>OUT</Text>
                  <Text style={[styles.playerName, isDarkMode && styles.darkText]}>{suggestion.playerOut}</Text>
                </View>
                
                <MaterialCommunityIcons 
                  name="swap-horizontal" 
                  size={24} 
                  color={isDarkMode ? '#00FF87' : '#37003C'} 
                  style={styles.swapIcon}
                />
                
                <View style={styles.playerInContainer}>
                  <Text style={styles.playerInText}>IN</Text>
                  <Text style={[styles.playerName, isDarkMode && styles.darkText]}>{suggestion.playerIn}</Text>
                </View>
              </View>
              
              <Text style={[styles.suggestionReason, isDarkMode && styles.darkSecondaryText]}>
                {suggestion.reason}
              </Text>
              
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${suggestion.confidence}%` }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Team Summary Card */}
        <View style={[styles.teamCard, isDarkMode && styles.darkTeamCard]}>
          <View style={styles.teamHeader}>
            <Text style={[styles.teamName, isDarkMode && styles.darkText]}>{myTeam.name}</Text>
            <View style={styles.teamChip}>
              <Text style={styles.teamChipText}>{myTeam.chipUsed}</Text>
            </View>
          </View>
          
          <View style={styles.teamStatsGrid}>
            <View style={[styles.statItem, styles.primaryStat]}>
              <Text style={styles.statValue}>{myTeam.points}</Text>
              <Text style={styles.statLabel}>POINTS</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, isDarkMode && styles.darkText]}>
                #{myTeam.rank.toLocaleString()}
              </Text>
              <Text style={[styles.statLabel, isDarkMode && styles.darkSecondaryText]}>RANK</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, isDarkMode && styles.darkText]}>
                £{myTeam.value.toFixed(1)}m
              </Text>
              <Text style={[styles.statLabel, isDarkMode && styles.darkSecondaryText]}>VALUE</Text>
            </View>
          </View>
          
          <Link href="/team" asChild>
            <Pressable style={({ pressed }) => [
              styles.viewTeamButton,
              isDarkMode && styles.darkViewTeamButton,
              { opacity: pressed ? 0.9 : 1 }
            ]}>
              <Text style={styles.viewTeamButtonText}>VIEW TEAM DETAILS</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </Pressable>
          </Link>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsTitle}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>QUICK ACTIONS</Text>
        </View>
        
        <View style={styles.quickActionsGrid}>
          <Link href="/transfers" asChild>
            <Pressable style={({ pressed }) => [
              styles.quickAction,
              isDarkMode && styles.darkQuickAction,
              { opacity: pressed ? 0.9 : 1 }
            ]}>
              <MaterialCommunityIcons 
                name="swap-horizontal" 
                size={28} 
                color={isDarkMode ? '#00FF87' : '#37003C'} 
              />
              <Text style={[styles.quickActionText, isDarkMode && styles.darkText]}>Transfers</Text>
            </Pressable>
          </Link>
          
          <Link href="/fixtures" asChild>
            <Pressable style={({ pressed }) => [
              styles.quickAction,
              isDarkMode && styles.darkQuickAction,
              { opacity: pressed ? 0.9 : 1 }
            ]}>
              <MaterialCommunityIcons 
                name="calendar" 
                size={28} 
                color={isDarkMode ? '#00FF87' : '#37003C'} 
              />
              <Text style={[styles.quickActionText, isDarkMode && styles.darkText]}>Fixtures</Text>
            </Pressable>
          </Link>
          
          <Link href="/stats" asChild>
            <Pressable style={({ pressed }) => [
              styles.quickAction,
              isDarkMode && styles.darkQuickAction,
              { opacity: pressed ? 0.9 : 1 }
            ]}>
              <MaterialCommunityIcons 
                name="chart-box" 
                size={28} 
                color={isDarkMode ? '#00FF87' : '#37003C'} 
              />
              <Text style={[styles.quickActionText, isDarkMode && styles.darkText]}>Stats</Text>
            </Pressable>
          </Link>
          
          <Link href="/news" asChild>
            <Pressable style={({ pressed }) => [
              styles.quickAction,
              isDarkMode && styles.darkQuickAction,
              { opacity: pressed ? 0.9 : 1 }
            ]}>
              <MaterialCommunityIcons 
                name="newspaper" 
                size={28} 
                color={isDarkMode ? '#00FF87' : '#37003C'} 
              />
              <Text style={[styles.quickActionText, isDarkMode && styles.darkText]}>News</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 25,
    backgroundColor: '#37003C',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  darkHeader: {
    backgroundColor: '#1A0036',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF90',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00000040',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  deadlineText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 5,
  },
  assistantCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  darkAssistantCard: {
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
  },
  assistantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  assistantTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#37003C',
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  assistantMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  darkText: {
    color: '#FFFFFF',
  },
  darkSecondaryText: {
    color: '#AAAAAA',
  },
  assistantButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#37003C',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  darkAssistantButton: {
    backgroundColor: '#00FF87',
  },
  assistantButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
    marginRight: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 14,
    padding: 5,
  },
  darkTabsContainer: {
    backgroundColor: '#2A2A2A',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#37003C',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  recommendationContent: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  darkRecommendationContent: {
    backgroundColor: '#121212',
  },
  suggestionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkSuggestionCard: {
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
  },
  suggestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  confidenceBadge: {
    backgroundColor: '#37003C10',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#37003C',
  },
  darkConfidenceBadge: {
    backgroundColor: '#00FF8710',
    borderColor: '#00FF87',
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#37003C',
  },
  darkConfidenceText: {
    color: '#00FF87',
  },
  playerSwapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  playerOutContainer: {
    alignItems: 'center',
    flex: 1,
  },
  playerInContainer: {
    alignItems: 'center',
    flex: 1,
  },
  playerOutText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#F44336',
    marginBottom: 5,
    letterSpacing: 1,
  },
  playerInText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4CAF50',
    marginBottom: 5,
    letterSpacing: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  swapIcon: {
    marginHorizontal: 10,
  },
  suggestionReason: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 15,
    textAlign: 'center',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  darkProgressBarContainer: {
    backgroundColor: '#333333',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#37003C',
    borderRadius: 3,
  },
  darkProgressBar: {
    backgroundColor: '#00FF87',
  },
  teamCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  darkTeamCard: {
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  teamChip: {
    backgroundColor: '#37003C10',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#37003C',
  },
  darkTeamChip: {
    backgroundColor: '#00FF8710',
    borderColor: '#00FF87',
  },
  teamChipText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#37003C',
  },
  darkTeamChipText: {
    color: '#00FF87',
  },
  teamStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  primaryStat: {
    backgroundColor: '#37003C10',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#37003C',
  },
  darkPrimaryStat: {
    backgroundColor: '#00FF8710',
    borderColor: '#00FF87',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#37003C',
    marginBottom: 5,
  },
  darkStatValue: {
    color: '#00FF87',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#666666',
    letterSpacing: 1,
  },
  viewTeamButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#37003C',
    borderRadius: 12,
    paddingVertical: 14,
  },
  darkViewTeamButton: {
    backgroundColor: '#00FF87',
  },
  viewTeamButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
    marginRight: 8,
  },
  quickActionsTitle: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#37003C',
    letterSpacing: 1,
  },
  darkSectionTitle: {
    color: '#00FF87',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  quickAction: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkQuickAction: {
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginTop: 10,
  },
});