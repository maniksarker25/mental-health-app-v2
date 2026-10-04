import type { Article, TopicId } from '@/types';

export const mockArticles: Article[] = [
  // --- Anxiety ---
  {
    id: 'art-anx-1',
    topicId: 'anxiety',
    title: 'Understanding Early Anxiety Symptoms & Somatic Body Cues',
    excerpt:
      'Learn how the nervous system triggers physical symptoms like tight chest, shallow breathing, and dizziness before panic sets in.',
    readTime: '4 min read',
    category: 'Clinical Guide',
    url: 'https://mentalhealthanonymous.org/resources/anxiety/somatic-cues',
    featured: true,
  },
  {
    id: 'art-anx-2',
    topicId: 'anxiety',
    title: 'Daily 5-4-3-2-1 Sensory Grounding Technique',
    excerpt:
      'A practical step-by-step grounding protocol designed to rapidly anchor attention during high acute worry.',
    readTime: '3 min read',
    category: 'Practical Toolkit',
    url: 'https://mentalhealthanonymous.org/resources/anxiety/grounding-protocol',
    featured: true,
  },
  {
    id: 'art-anx-3',
    topicId: 'anxiety',
    title: 'De-escalating Panic Attacks in Public or Workplace Spaces',
    excerpt:
      'Crucial strategies for calming your body when experiencing unexpected panic attacks away from home.',
    readTime: '6 min read',
    category: 'Emergency Help',
    url: 'https://mentalhealthanonymous.org/resources/anxiety/panic-deescalation',
  },
  {
    id: 'art-anx-4',
    topicId: 'anxiety',
    title: 'When and How to Seek Evidence-Based CBT Therapy',
    excerpt:
      'An overview of Cognitive Behavioral Therapy and what to expect in your first diagnostic consultation.',
    readTime: '5 min read',
    category: 'Treatment Overview',
    url: 'https://mentalhealthanonymous.org/resources/anxiety/cbt-therapy-guide',
  },
  {
    id: 'art-anx-5',
    topicId: 'anxiety',
    title: 'Supporting a Friend Experiencing Severe Health Anxiety',
    excerpt:
      'Compassionate communication scripts that validate feelings without feeding repetitive reassurance cycles.',
    readTime: '4 min read',
    category: 'Support Guide',
    url: 'https://mentalhealthanonymous.org/resources/anxiety/supporting-loved-ones',
  },

  // --- Depression ---
  {
    id: 'art-dep-1',
    topicId: 'depression',
    title: 'The Neurological Difference Between Sadness and Clinical Depression',
    excerpt:
      'Why clinical depression impacts energy, sleep, cognitive clarity, and motivation, and why willpower alone cannot fix it.',
    readTime: '5 min read',
    category: 'Clinical Guide',
    url: 'https://mentalhealthanonymous.org/resources/depression/sadness-vs-depression',
    featured: true,
  },
  {
    id: 'art-dep-2',
    topicId: 'depression',
    title: 'Micro-Steps for Low-Energy Days: Building a Minimalist Routine',
    excerpt:
      'Gentle, zero-shame self-care routines to maintain basic nourishment and personal dignity during depressive episodes.',
    readTime: '4 min read',
    category: 'Practical Toolkit',
    url: 'https://mentalhealthanonymous.org/resources/depression/micro-steps-routine',
    featured: true,
  },
  {
    id: 'art-dep-3',
    topicId: 'depression',
    title: 'Overcoming Depressive Isolation Without Feeling Overwhelmed',
    excerpt:
      'Low-friction ways to stay connected to loved ones when phone calls and social events feel impossible.',
    readTime: '5 min read',
    category: 'Support Guide',
    url: 'https://mentalhealthanonymous.org/resources/depression/gentle-connection',
  },
  {
    id: 'art-dep-4',
    topicId: 'depression',
    title: 'Understanding Modern Antidepressants & Therapy Modalities',
    excerpt:
      'A stigma-free, evidence-backed breakdown of medical treatments and psychological therapies for depression.',
    readTime: '7 min read',
    category: 'Treatment Overview',
    url: 'https://mentalhealthanonymous.org/resources/depression/medication-and-therapy',
  },

  // --- Stress & Burnout ---
  {
    id: 'art-str-1',
    topicId: 'stress-burnout',
    title: 'The 5 Clinical Stages of Workplace Burnout',
    excerpt:
      'How chronic workplace stress progresses from ambition and neglect of personal needs to emotional exhaustion.',
    readTime: '6 min read',
    category: 'Clinical Guide',
    url: 'https://mentalhealthanonymous.org/resources/burnout/5-stages-of-burnout',
    featured: true,
  },
  {
    id: 'art-str-2',
    topicId: 'stress-burnout',
    title: 'Healthy Work Boundaries: Professional Scripts for Saying No',
    excerpt:
      'Clear, polite email and verbal scripts to protect your capacity and prevent over-commitment.',
    readTime: '4 min read',
    category: 'Practical Toolkit',
    url: 'https://mentalhealthanonymous.org/resources/burnout/boundary-scripts',
    featured: true,
  },
  {
    id: 'art-str-3',
    topicId: 'stress-burnout',
    title: 'Vagus Nerve Stimulation & 10-Minute Somatic Stress Resets',
    excerpt:
      'Physiological sigh exercises and nervous system regulation practices to downshift out of fight-or-flight mode.',
    readTime: '4 min read',
    category: 'Practical Toolkit',
    url: 'https://mentalhealthanonymous.org/resources/burnout/nervous-system-reset',
  },

  // --- Substance Abuse ---
  {
    id: 'art-sub-1',
    topicId: 'substance-abuse',
    title: 'Harm Reduction Principles: Compassion Without Judgment',
    excerpt:
      'Understanding harm reduction strategies that prioritize safety, dignity, and incremental positive changes.',
    readTime: '5 min read',
    category: 'Clinical Guide',
    url: 'https://mentalhealthanonymous.org/resources/substance-use/harm-reduction-basics',
    featured: true,
  },
  {
    id: 'art-sub-2',
    topicId: 'substance-abuse',
    title: 'Confidential Treatment Paths: Outpatient, Inpatient & Peer Groups',
    excerpt:
      'A straightforward walkthrough of what medical detoxification, rehabilitation, and 12-step/SMART Recovery involve.',
    readTime: '6 min read',
    category: 'Treatment Overview',
    url: 'https://mentalhealthanonymous.org/resources/substance-use/treatment-paths',
    featured: true,
  },
  {
    id: 'art-sub-3',
    topicId: 'substance-abuse',
    title: 'Anonymous Helplines & Family Support Directory',
    excerpt:
      'Free, 24/7 toll-free crisis numbers and peer support networks for individuals and family members.',
    readTime: '3 min read',
    category: 'Emergency Help',
    url: 'https://mentalhealthanonymous.org/resources/substance-use/helplines-directory',
  },

  // --- Grief & Loss ---
  {
    id: 'art-grf-1',
    topicId: 'grief-loss',
    title: 'Why Grief Has No Fixed Timeline: The Wave Model of Bereavement',
    excerpt:
      'Moving past the rigid stage model to understand how grief expands and recedes like unpredictable ocean waves.',
    readTime: '5 min read',
    category: 'Clinical Guide',
    url: 'https://mentalhealthanonymous.org/resources/grief/wave-model-bereavement',
    featured: true,
  },
  {
    id: 'art-grf-2',
    topicId: 'grief-loss',
    title: 'Navigating Anniversaries, Holidays & Unexpected Triggers',
    excerpt:
      'Practical preparation strategies for handling milestone dates after losing someone close.',
    readTime: '4 min read',
    category: 'Support Guide',
    url: 'https://mentalhealthanonymous.org/resources/grief/navigating-milestones',
    featured: true,
  },

  // --- Dementia ---
  {
    id: 'art-dem-1',
    topicId: 'dementia',
    title: 'Spotting Early Cognitive Changes vs Normal Age-Related Memory',
    excerpt:
      'Key differences between common forgetfulness and clinical indicators that warrant professional assessment.',
    readTime: '5 min read',
    category: 'Clinical Guide',
    url: 'https://mentalhealthanonymous.org/resources/dementia/early-signs-checklist',
    featured: true,
  },
  {
    id: 'art-dem-2',
    topicId: 'dementia',
    title: 'Compassionate Communication & Validation Therapy Techniques',
    excerpt:
      'How to de-escalate agitation and connect with loved ones living with cognitive decline using validation instead of confrontation.',
    readTime: '6 min read',
    category: 'Caregiver Guide',
    url: 'https://mentalhealthanonymous.org/resources/dementia/validation-communication',
    featured: true,
  },

  // --- Trauma ---
  {
    id: 'art-trm-1',
    topicId: 'trauma',
    title: 'Understanding Trauma Loops & Hypervigilance in the Body',
    excerpt:
      'How traumatic experiences can leave the amygdala on high alert and why intellectual understanding alone doesn’t stop triggers.',
    readTime: '6 min read',
    category: 'Clinical Guide',
    url: 'https://mentalhealthanonymous.org/resources/trauma/understanding-hypervigilance',
    featured: true,
  },
  {
    id: 'art-trm-2',
    topicId: 'trauma',
    title: 'Evidence-Based Trauma Therapies: EMDR, CPT & Somatic Work',
    excerpt:
      'An accessible guide to how specialized therapies help reprocess traumatic memories and restore safety.',
    readTime: '5 min read',
    category: 'Treatment Overview',
    url: 'https://mentalhealthanonymous.org/resources/trauma/emdr-and-somatic-therapy',
    featured: true,
  },

  // --- Eating Disorders ---
  {
    id: 'art-eat-1',
    topicId: 'eating-disorders',
    title: 'Early Warning Signs of Disordered Eating & Food Obsession',
    excerpt:
      'Identifying subtle behavioral shifts around control, exercise, and restriction before physical damage occurs.',
    readTime: '5 min read',
    category: 'Clinical Guide',
    url: 'https://mentalhealthanonymous.org/resources/eating-disorders/early-warning-signs',
    featured: true,
  },
  {
    id: 'art-eat-2',
    topicId: 'eating-disorders',
    title: 'How to Support a Loved One in Recovery During Shared Meals',
    excerpt:
      'Helpful, supportive language guidelines and habits to avoid around table conversations.',
    readTime: '4 min read',
    category: 'Support Guide',
    url: 'https://mentalhealthanonymous.org/resources/eating-disorders/mealtime-support',
    featured: true,
  },
];

export function getArticlesByTopicId(topicId: TopicId): Article[] {
  return mockArticles.filter((a) => a.topicId === topicId);
}

export function searchArticles(query: string, topicId?: TopicId): Article[] {
  const q = query.trim().toLowerCase();
  return mockArticles.filter((article) => {
    const matchesTopic = topicId ? article.topicId === topicId : true;
    const matchesQuery =
      !q ||
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.category.toLowerCase().includes(q);
    return matchesTopic && matchesQuery;
  });
}
