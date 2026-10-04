import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Article, TopicId } from '@/types';
import { getArticlesByTopicId, searchArticles } from '@/data/articles';

interface ArticleSelectorProps {
  topicId: TopicId;
  selectedArticles: Article[];
  onToggleArticle: (article: Article) => void;
  onSelectAll: (articles: Article[]) => void;
  onClearAll: () => void;
}

export function ArticleSelector({
  topicId,
  selectedArticles,
  onToggleArticle,
  onSelectAll,
  onClearAll,
}: ArticleSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // All articles for this topic
  const topicArticles = useMemo(() => {
    return getArticlesByTopicId(topicId);
  }, [topicId]);

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set<string>(['All']);
    topicArticles.forEach((a) => set.add(a.category));
    return Array.from(set);
  }, [topicArticles]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    let list = topicArticles;
    if (searchQuery.trim()) {
      list = searchArticles(searchQuery, topicId);
    }
    if (activeCategory !== 'All') {
      list = list.filter((a) => a.category === activeCategory);
    }
    return list;
  }, [topicArticles, searchQuery, activeCategory, topicId]);

  const allFilteredSelected =
    filteredArticles.length > 0 &&
    filteredArticles.every((art) =>
      selectedArticles.some((s) => s.id === art.id)
    );

  const handleSelectAllToggle = () => {
    if (allFilteredSelected) {
      // Deselect filtered articles
      const filteredIds = new Set(filteredArticles.map((a) => a.id));
      const remaining = selectedArticles.filter((a) => !filteredIds.has(a.id));
      onSelectAll(remaining);
    } else {
      // Merge filtered articles into selectedArticles
      const map = new Map<string, Article>();
      selectedArticles.forEach((a) => map.set(a.id, a));
      filteredArticles.forEach((a) => map.set(a.id, a));
      onSelectAll(Array.from(map.values()));
    }
  };

  return (
    <View style={styles.container}>
      {/* Header bar */}
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <View style={styles.iconContainer}>
            <Ionicons name="library-outline" size={17} color="#2E5E52" />
          </View>
          <View>
            <Text style={styles.sectionTitle}>Select Article Resources</Text>
            <Text style={styles.sectionSubtitle}>
              {selectedArticles.length} of {topicArticles.length} article
              {topicArticles.length === 1 ? '' : 's'} chosen to attach
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSelectAllToggle}
          style={styles.toggleAllBtn}>
          <Text style={styles.toggleAllText}>
            {allFilteredSelected ? 'Clear All' : 'Select All'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Input Bar */}
      <View
        style={[
          styles.searchBar,
          isSearchFocused && styles.searchBarFocused,
        ]}>
        <Ionicons name="search-outline" size={18} color="#85928C" />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          placeholder="Search articles by title or keyword..."
          placeholderTextColor="#9AA5A0"
          style={styles.searchInput}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearSearchBtn}>
            <Ionicons name="close-circle" size={17} color="#85928C" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter Pills */}
      {categories.length > 2 && (
        <View style={styles.categoryRow}>
          {categories.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                style={[
                  styles.categoryPill,
                  isSelected && styles.categoryPillActive,
                ]}>
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextActive,
                  ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Articles List */}
      <View style={styles.articlesList}>
        {filteredArticles.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={28} color="#9AA5A0" />
            <Text style={styles.emptyTitle}>No matching articles found</Text>
            <Text style={styles.emptySubtitle}>
              Try searching with another keyword or reset filters.
            </Text>
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                style={styles.resetBtn}>
                <Text style={styles.resetBtnText}>Clear Search</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          filteredArticles.map((article) => {
            const isSelected = selectedArticles.some((a) => a.id === article.id);
            return (
              <TouchableOpacity
                key={article.id}
                activeOpacity={0.85}
                onPress={() => onToggleArticle(article)}
                style={[
                  styles.articleCard,
                  isSelected && styles.articleCardSelected,
                ]}>
                {/* Checkbox indicator */}
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected,
                    ]}>
                    {isSelected && (
                      <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                    )}
                  </View>

                  <View style={styles.cardHeaderContent}>
                    <Text
                      style={[
                        styles.articleTitle,
                        isSelected && styles.articleTitleSelected,
                      ]}>
                      {article.title}
                    </Text>
                  </View>
                </View>

                {/* Excerpt */}
                <Text style={styles.articleExcerpt}>{article.excerpt}</Text>

                {/* Badges & Web Link Row */}
                <View style={styles.metaRow}>
                  <View style={styles.tagGroup}>
                    <View style={styles.badgePill}>
                      <Ionicons name="time-outline" size={11} color="#5F756C" />
                      <Text style={styles.badgeText}>{article.readTime}</Text>
                    </View>

                    <View style={styles.badgePill}>
                      <Text style={styles.badgeText}>{article.category}</Text>
                    </View>
                  </View>

                  {/* Link Preview */}
                  <View style={styles.linkPill}>
                    <Ionicons name="globe-outline" size={12} color="#285346" />
                    <Text
                      numberOfLines={1}
                      style={styles.linkText}>
                      Web Resource Link
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#EDF4F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#18231F',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#6B7A75',
    marginTop: 1,
  },
  toggleAllBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#EDF4F0',
  },
  toggleAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#285346',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E6DF',
    borderRadius: 14,
    paddingHorizontal: 12,
    minHeight: 46,
    gap: 8,
  },
  searchBarFocused: {
    borderColor: '#285346',
  },
  searchInput: {
    flex: 1,
    minHeight: 44,
    fontSize: 13.5,
    color: '#18231F',
    backgroundColor: 'transparent',
    borderWidth: 0,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        outlineWidth: 0,
        outlineColor: 'transparent',
        boxShadow: 'none',
      } as any,
    }),
  },
  clearSearchBtn: {
    padding: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2,
  },
  categoryPill: {
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E6DF',
  },
  categoryPillActive: {
    backgroundColor: '#285346',
    borderColor: '#285346',
  },
  categoryText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#55665F',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  articlesList: {
    gap: 10,
    marginTop: 4,
  },
  articleCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E6EAE3',
    borderRadius: 16,
    padding: 14,
    gap: 8,
  },
  articleCardSelected: {
    borderColor: '#285346',
    backgroundColor: '#FAFDFB',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#98ABA1',
    backgroundColor: '#F7F8F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1.5,
  },
  checkboxSelected: {
    backgroundColor: '#285346',
    borderColor: '#285346',
  },
  cardHeaderContent: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 14.5,
    fontWeight: '600',
    lineHeight: 20,
    color: '#18231F',
  },
  articleTitleSelected: {
    color: '#1B3830',
  },
  articleExcerpt: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#657770',
    paddingLeft: 30,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingTop: 4,
    flexWrap: 'wrap',
    gap: 8,
  },
  tagGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#F0F4F1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475D54',
  },
  linkPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F2EC',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  linkText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#285346',
  },
  emptyContainer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E6EAE3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#18231F',
    marginTop: 8,
  },
  emptySubtitle: {
    fontSize: 12.5,
    color: '#6B7A75',
    textAlign: 'center',
    marginTop: 4,
  },
  resetBtn: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#285346',
  },
  resetBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
