import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useAppSelector } from '@/store/hooks';
import {
  seedCommunityPosts,
  type CommunityPost,
  type CommunityReply,
} from '@/data/community';
import { AppCard } from '@/components/ui/shared/AppCard';
import { AppButton } from '@/components/ui/shared/AppButton';
import Toast from 'react-native-toast-message';

const STORAGE_COMMUNITY_KEY = 'mha_mobile_community_posts_v3';

export default function CommunityTabScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [posts, setPosts] = useState<CommunityPost[]>(seedCommunityPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPostIds, setExpandedPostIds] = useState<Record<string, boolean>>({
    'post-1': true,
  });

  // Reply Drafts
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});

  // Ask Question Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImageUri, setNewImageUri] = useState<string | null>(null);

  // Image Zoom Lightbox
  const [zoomedImageUri, setZoomedImageUri] = useState<string | null>(null);

  // Load from AsyncStorage
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_COMMUNITY_KEY);
        if (stored) {
          setPosts(JSON.parse(stored));
        }
      } catch {
        // Fallback to seed posts
      }
    })();
  }, []);

  const savePosts = async (updated: CommunityPost[]) => {
    setPosts(updated);
    try {
      await AsyncStorage.setItem(STORAGE_COMMUNITY_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return posts;
    return posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q)
      );
    });
  }, [posts, searchQuery]);

  const toggleExpand = (postId: string) => {
    setExpandedPostIds((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleLike = (postId: string) => {
    const updated = posts.map((p) =>
      p.id === postId ? { ...p, likes: p.likes + 1 } : p
    );
    savePosts(updated);
  };

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Toast.show({
        type: 'error',
        text1: 'Permission Needed',
        text2: 'Photo library access is required to attach an image.',
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setNewImageUri(result.assets[0].uri);
    }
  };

  const handleOpenAskModal = () => {
    if (!isAuthenticated || !user) {
      Toast.show({
        type: 'info',
        text1: 'Sign In Required',
        text2: 'Please sign in to post questions or share suggestions in the community.',
      });
      router.push({
        pathname: '/login',
        params: { redirect: '/(tabs)/community' },
      });
      return;
    }

    setIsModalOpen(true);
  };

  const handleSubmitPost = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please enter a title and description for your question.',
      });
      return;
    }

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: user?.name || 'Anonymous User',
      title: newTitle.trim(),
      content: newContent.trim(),
      category: 'Discussion',
      topicTag: 'Discussion',
      imageUrl: newImageUri || undefined,
      createdAt: 'Just now',
      likes: 1,
      replies: [],
    };

    const updated = [newPost, ...posts];
    savePosts(updated);

    // Reset Form
    setNewTitle('');
    setNewContent('');
    setNewImageUri(null);
    setIsModalOpen(false);

    Toast.show({
      type: 'success',
      text1: 'Post Published',
      text2: 'Your post is now visible in the community.',
    });
  };

  const handleAddReply = (postId: string) => {
    if (!isAuthenticated || !user) {
      Toast.show({
        type: 'info',
        text1: 'Sign In Required',
        text2: 'Please sign in to reply to community discussions.',
      });
      router.push({
        pathname: '/login',
        params: { redirect: '/(tabs)/community' },
      });
      return;
    }

    const text = (replyInputs[postId] || '').trim();
    if (!text) return;

    const newReply: CommunityReply = {
      id: `reply-${Date.now()}`,
      author: user.name || 'Anonymous User',
      content: text,
      createdAt: 'Just now',
      likes: 1,
    };

    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [...p.replies, newReply],
        };
      }
      return p;
    });

    savePosts(updated);
    setReplyInputs((prev) => ({ ...prev, [postId]: '' }));

    Toast.show({
      type: 'success',
      text1: 'Suggestion Shared',
      text2: 'Thank you for replying.',
    });
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-canvas">
      {/* Top Bar */}
      <View className="flex-row items-center justify-between px-5 pb-3 pt-3 border-b border-line bg-surface">
        <View className="flex-row items-center gap-2.5">
          <View className="h-8 w-8 items-center justify-center rounded-xl bg-primary">
            <Ionicons name="chatbubbles" size={16} color="#FFFFFF" />
          </View>
          <View>
            <Text className="text-[14px] font-bold text-ink">Community Forum</Text>
            <Text className="text-[10px] font-semibold tracking-wider text-sage uppercase">
              Peer & Supporter Exchange
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleOpenAskModal}
          style={{ backgroundColor: '#2E5E52' }}
          className="flex-row items-center gap-1.5 rounded-xl px-3 py-1.5 shadow-xs active:opacity-90">
          <Ionicons name="add" size={16} color="#FFFFFF" />
          <Text className="text-[12px] font-bold text-white">Create Post</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input (Clean, No Filters) */}
      <View className="px-5 py-3 bg-surface border-b border-line">
        <View className="flex-row items-center rounded-2xl bg-canvas border border-line px-3.5 py-2">
          <Ionicons name="search-outline" size={16} color="#6B7A75" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search discussions and questions..."
            placeholderTextColor="#9AA5A0"
            className="ml-2.5 flex-1 text-[13px] text-ink font-medium"
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color="#9AA5A0" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Posts List */}
      <ScrollView
        className="flex-1 px-5"
        contentContainerClassName="pb-16 pt-4 gap-4"
        showsVerticalScrollIndicator={false}>
        
        {filteredPosts.length === 0 ? (
          <AppCard className="p-8 items-center text-center">
            <Ionicons name="search-outline" size={32} color="#9AA5A0" />
            <Text className="mt-3 text-[16px] font-bold text-ink">
              No discussions found
            </Text>
            <Text className="mt-1 text-[12.5px] text-ink-secondary text-center">
              Try searching with different keywords.
            </Text>
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              className="mt-4 rounded-xl border border-line bg-surface px-4 py-2">
              <Text className="text-[12px] font-semibold text-ink">Clear Search</Text>
            </TouchableOpacity>
          </AppCard>
        ) : (
          filteredPosts.map((post) => {
            const isExpanded = !!expandedPostIds[post.id];
            return (
              <AppCard key={post.id} className="p-4 bg-surface border-line">
                {/* Header: Author & Time */}
                <View className="flex-row items-center gap-2.5">
                  <View className="h-8 w-8 items-center justify-center rounded-xl bg-mist">
                    <Text className="text-[12px] font-bold text-forest">
                      {post.author.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-[13.5px] font-bold text-ink">
                      {post.author}
                    </Text>
                    <Text className="text-[11px] text-ink-tertiary">
                      {post.createdAt}
                    </Text>
                  </View>
                </View>

                {/* Question Title & Content */}
                <Text className="mt-3 text-[15.5px] font-bold text-ink leading-snug">
                  {post.title}
                </Text>
                <Text className="mt-1.5 text-[13px] leading-relaxed text-ink-secondary">
                  {post.content}
                </Text>

                {/* Attached Image Thumbnail (if any) */}
                {post.imageUrl && (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setZoomedImageUri(post.imageUrl || null)}
                    className="mt-3 overflow-hidden rounded-2xl border border-line bg-black/5">
                    <Image
                      source={{ uri: post.imageUrl }}
                      className="h-44 w-full object-cover"
                    />
                    <View className="absolute bottom-2 right-2 flex-row items-center gap-1 rounded-full bg-black/60 px-2.5 py-1">
                      <Ionicons name="scan-outline" size={11} color="#FFFFFF" />
                      <Text className="text-[10px] font-semibold text-white">
                        Tap to zoom
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}

                {/* Post Footer Action Bar */}
                <View className="mt-4 flex-row items-center justify-between border-t border-line/60 pt-3">
                  <View className="flex-row items-center gap-2">
                    {/* Like Button */}
                    <TouchableOpacity
                      onPress={() => handleLike(post.id)}
                      className="flex-row items-center gap-1.5 rounded-full bg-canvas border border-line px-3 py-1 active:bg-elevated">
                      <Ionicons name="thumbs-up-outline" size={13} color="#2E5E52" />
                      <Text className="text-[11.5px] font-bold text-forest">
                        {post.likes} Helpful
                      </Text>
                    </TouchableOpacity>

                    {/* Replies Toggle */}
                    <TouchableOpacity
                      onPress={() => toggleExpand(post.id)}
                      className="flex-row items-center gap-1 rounded-full bg-canvas border border-line px-3 py-1 active:bg-elevated">
                      <Ionicons name="chatbubble-outline" size={13} color="#6B7A75" />
                      <Text className="text-[11.5px] font-semibold text-ink-secondary">
                        {post.replies.length} {post.replies.length === 1 ? 'Answer' : 'Answers'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={() => toggleExpand(post.id)}
                    className="flex-row items-center gap-1">
                    <Text className="text-[11.5px] font-bold text-primary">
                      {isExpanded ? 'Hide' : 'View Thread'}
                    </Text>
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={13}
                      color="#2E5E52"
                    />
                  </TouchableOpacity>
                </View>

                {/* Expandable Answers & Suggestion Thread */}
                {isExpanded && (
                  <View className="mt-3.5 border-t border-line/60 pt-3">
                    {post.replies.length > 0 && (
                      <View className="gap-2.5 mb-3">
                        {post.replies.map((rep) => (
                          <View
                            key={rep.id}
                            className="rounded-2xl bg-canvas border border-line/70 p-3">
                            <View className="flex-row items-center justify-between">
                              <Text className="text-[12px] font-bold text-ink">
                                {rep.author}
                              </Text>
                              <Text className="text-[10px] text-ink-tertiary">
                                {rep.createdAt}
                              </Text>
                            </View>
                            <Text className="mt-1 text-[12px] leading-relaxed text-ink-secondary">
                              {rep.content}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Inline Reply Input Box */}
                    <View className="flex-row items-center gap-2 rounded-2xl bg-canvas border border-line p-1.5 pl-3">
                      <TextInput
                        value={replyInputs[post.id] || ''}
                        onChangeText={(t) =>
                          setReplyInputs((prev) => ({ ...prev, [post.id]: t }))
                        }
                        placeholder="Write a supportive suggestion or reply..."
                        placeholderTextColor="#9AA5A0"
                        className="flex-1 text-[12px] text-ink font-medium"
                      />
                      <TouchableOpacity
                        onPress={() => handleAddReply(post.id)}
                        style={{ backgroundColor: '#2E5E52' }}
                        className="rounded-xl px-3 py-2 shadow-xs active:opacity-90">
                        <Text className="text-[11.5px] font-bold text-white">
                          Reply
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </AppCard>
            );
          })
        )}
      </ScrollView>

      {/* Ask a Question Modal (Simple: Title, Context, Image) */}
      <Modal
        visible={isModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalOpen(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-end bg-black/60">
          <View className="rounded-t-3xl bg-surface p-5 pb-9 border-t border-line max-h-[90%]">
            <View className="flex-row items-center justify-between pb-3 border-b border-line">
              <View>
                <Text className="text-[17px] font-bold text-ink">
                  Create a Post
                </Text>
                <Text className="text-[11.5px] text-ink-secondary">
                  Share a question or helpful coping experience.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsModalOpen(false)}
                className="h-8 w-8 items-center justify-center rounded-full bg-canvas border border-line">
                <Ionicons name="close" size={17} color="#6B7A75" />
              </TouchableOpacity>
            </View>

            <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
              {/* Title Input */}
              <Text className="text-[11.5px] font-bold uppercase tracking-wider text-sage mb-1.5">
                Post Title
              </Text>
              <TextInput
                value={newTitle}
                onChangeText={setNewTitle}
                placeholder="What is your question or reflection?"
                placeholderTextColor="#9AA5A0"
                className="rounded-2xl border border-line bg-canvas px-3.5 py-2.5 text-[13px] text-ink font-medium mb-3"
              />

              {/* Details Content Input */}
              <Text className="text-[11.5px] font-bold uppercase tracking-wider text-sage mb-1.5">
                Details & Story
              </Text>
              <TextInput
                value={newContent}
                onChangeText={setNewContent}
                placeholder="Share your thoughts, what you are experiencing, or what helped..."
                placeholderTextColor="#9AA5A0"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                className="h-28 rounded-2xl border border-line bg-canvas p-3.5 text-[13px] text-ink font-medium mb-3"
              />

              {/* Image Attachment Picker */}
              <View className="mb-4">
                <Text className="text-[11.5px] font-bold uppercase tracking-wider text-sage mb-1.5">
                  Attach Image (Optional)
                </Text>
                {newImageUri ? (
                  <View className="relative overflow-hidden rounded-2xl border border-line">
                    <Image source={{ uri: newImageUri }} className="h-36 w-full object-cover" />
                    <TouchableOpacity
                      onPress={() => setNewImageUri(null)}
                      className="absolute top-2 right-2 h-7 w-7 items-center justify-center rounded-full bg-black/70">
                      <Ionicons name="trash" size={14} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={handlePickImage}
                    className="flex-row items-center justify-center rounded-2xl border border-dashed border-line bg-canvas py-3.5 px-4 active:bg-elevated">
                    <Ionicons name="image-outline" size={18} color="#2E5E52" />
                    <Text className="ml-2 text-[12.5px] font-bold text-primary">
                      Add a Photo / Illustration
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Submit Button */}
              <AppButton
                onPress={handleSubmitPost}
                style={{ backgroundColor: '#2E5E52' }}>
                Publish Post
              </AppButton>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Lightbox Zoom Modal */}
      <Modal
        visible={!!zoomedImageUri}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setZoomedImageUri(null)}>
        <View className="flex-1 items-center justify-center bg-black/90 p-4">
          <TouchableOpacity
            onPress={() => setZoomedImageUri(null)}
            className="absolute top-12 right-6 h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          {zoomedImageUri && (
            <Image
              source={{ uri: zoomedImageUri }}
              className="h-[75%] w-full rounded-2xl"
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}
