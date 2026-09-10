export interface CommunityReply {
  id: string;
  author: string;
  authorBadge?: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorRole?: string;
  title: string;
  content: string;
  category: string;
  topicTag: string;
  imageUrl?: string;
  createdAt: string;
  likes: number;
  replies: CommunityReply[];
  isPinned?: boolean;
}

export const communityCategories = [
  'All Discussions',
  'Anxiety & Panic',
  'Depression & Low Mood',
  'Burnout & Work Stress',
  'Coping Strategies & Tips',
  'Grief & Loss',
  'Questions for Supporters',
];

export const seedCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    author: 'QuietOak_32',
    authorRole: 'Community Member',
    title: 'How do you handle sudden physical panic attacks in public spaces?',
    content:
      'I was on the subway this morning and felt the intense chest tightness and dizziness hit out of nowhere. I had to get off three stops early. What grounding rituals or subtle techniques do you use when you cannot easily lie down or close your eyes in a crowded place?',
    category: 'Anxiety & Panic',
    topicTag: 'Grounding in Public',
    imageUrl:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
    createdAt: '2 hours ago',
    likes: 18,
    isPinned: true,
    replies: [
      {
        id: 'reply-1-1',
        author: 'Dr. Sarah',
        authorBadge: 'Clinical Guide',
        content:
          'A very discreet tool is tactile grounding: press both feet firmly into the floor, feel the texture of your phone case or keys in your pocket, and use extended exhale breathing (inhale 4s through nose, exhale 6-8s through slightly parted lips). The long exhale activates your vagus nerve without drawing anyone’s attention.',
        createdAt: '1 hour ago',
        likes: 14,
      },
      {
        id: 'reply-1-2',
        author: 'NorthStar_Calm',
        content:
          'I carry a bottle of ice cold water. Taking a tiny sip and letting the cold sensation sit on the roof of my mouth gives my nervous system an immediate sensory anchor.',
        createdAt: '45 mins ago',
        likes: 9,
      },
    ],
  },
  {
    id: 'post-2',
    author: 'Elena_Caregiver',
    authorRole: 'Supporter',
    title:
      'Sent an anonymous guide to my brother who has been withdrawing for weeks — he responded!',
    content:
      'My younger brother has been struggling with burnout and depression after losing his job. Direct conversations always made him defensive. Yesterday I used the anonymous dispatch tool to send the depression & low mood resource by text. He texted me today asking if we could get coffee this weekend. Just wanted to share for anyone hesitating to send a resource.',
    category: 'Questions for Supporters',
    topicTag: 'Family Support',
    imageUrl:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
    createdAt: '5 hours ago',
    likes: 34,
    replies: [
      {
        id: 'reply-2-1',
        author: 'Renée Alvarez',
        content:
          'This is exactly why anonymous dispatch exists. When shame or pride blocks direct conversation, receiving clinically grounded material in private lets the person process on their own timeline without feeling put on the spot.',
        createdAt: '3 hours ago',
        likes: 19,
      },
    ],
  },
  {
    id: 'post-3',
    author: 'Sam_Mindful',
    authorRole: 'Community Member',
    title: 'Tips for breaking the 3:00 AM insomnia worry loop?',
    content:
      'Every night this week I wake up at 3:15 AM with my brain racing through work emails and worst-case scenarios. I try staying in bed with my eyes closed but it makes the thoughts louder. What practical steps work for you to break this loop?',
    category: 'Coping Strategies & Tips',
    topicTag: 'Sleep & Insomnia',
    imageUrl:
      'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=80',
    createdAt: '1 day ago',
    likes: 22,
    replies: [
      {
        id: 'reply-3-1',
        author: 'Maya_Journaler',
        content:
          'The 20-minute rule changed everything for me: if awake for more than 20 minutes, get out of bed in dim light, sit on a comfortable chair, and do a "brain dump" on paper or read a book until drowsy. Keeps your brain from associating the bed with anxiety.',
        createdAt: '18 hours ago',
        likes: 12,
      },
      {
        id: 'reply-3-2',
        author: 'David_K',
        content:
          'I turn on the 4-7-8 breathing pacer on low brightness. Just following the pacer for 5 minutes slows my heart rate down enough to reset.',
        createdAt: '14 hours ago',
        likes: 8,
      },
    ],
  },
  {
    id: 'post-4',
    author: 'Alex_Engineer',
    authorRole: 'Community Member',
    title: 'Recognizing burnout before complete exhaustion sets in',
    content:
      'Sharing a reflection: For months I thought burnout was just feeling tired. It turns out my early signs were emotional detachment, cynicism about things I usually care about, and feeling irritable over tiny tasks. What were your subtle early warnings before hitting the wall?',
    category: 'Burnout & Work Stress',
    topicTag: 'Burnout Recovery',
    imageUrl:
      'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop&q=80',
    createdAt: '2 days ago',
    likes: 29,
    replies: [
      {
        id: 'reply-4-1',
        author: 'Jordan_H',
        content:
          'For me it was decision fatigue. Staring at a menu or choosing what to wear in the morning felt like climbing a mountain.',
        createdAt: '1 day ago',
        likes: 11,
      },
    ],
  },
];
