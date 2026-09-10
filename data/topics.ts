import type { Topic } from '@/types';

export const topics: Topic[] = [
  {
    id: 'anxiety',
    name: 'Anxiety',
    shortDescription: 'Understanding worry, panic and the body',
    intro:
      'Share educational information that may help someone better understand anxiety, common signs, and available support.',
    packetTitle: 'Understanding Anxiety',
    packetItems: [
      'What anxiety is, and what it is not',
      'Common physical and emotional signs',
      'Grounding techniques to try today',
      'When and how to reach out for support',
    ],
    tone: 'sky',
    icon: 'wind',
  },
  {
    id: 'depression',
    name: 'Depression',
    shortDescription: 'Low mood, energy and finding a first step',
    intro:
      'Share clear, gentle information about what depression can look like and the kinds of support that help people recover.',
    packetTitle: 'Understanding Depression',
    packetItems: [
      'How depression differs from sadness',
      'Signs that often go unnoticed',
      'Small daily steps that support recovery',
      'Ways to find professional help',
    ],
    tone: 'lavender',
    icon: 'cloud',
  },
  {
    id: 'stress-burnout',
    name: 'Stress & Burnout',
    shortDescription: 'Recognising overload before it deepens',
    intro:
      'Share practical information about chronic stress, the stages of burnout, and realistic ways to recover capacity.',
    packetTitle: 'Stress & Burnout',
    packetItems: [
      'The difference between stress and burnout',
      'Early warning signs at work and home',
      'Recovery practices that actually help',
      'Talking to an employer or doctor',
    ],
    tone: 'sand',
    icon: 'flame',
  },
  {
    id: 'substance-abuse',
    name: 'Substance Abuse',
    shortDescription: 'Non-judgemental information and options',
    intro:
      'Share supportive, stigma-free information about substance use, harm reduction, and the paths available to treatment.',
    packetTitle: 'Substance Use & Support',
    packetItems: [
      'Understanding dependency without blame',
      'Harm reduction basics',
      'What treatment can look like',
      'Confidential helplines and services',
    ],
    tone: 'mist',
    icon: 'shield',
  },
  {
    id: 'grief-loss',
    name: 'Grief & Loss',
    shortDescription: 'Living with loss, in its own time',
    intro:
      'Share compassionate information about grief, how it changes over time, and where people find support after a loss.',
    packetTitle: 'Grief & Loss',
    packetItems: [
      'Grief has no fixed timeline',
      'Common waves and unexpected triggers',
      'Supporting yourself through anniversaries',
      'Bereavement services and groups',
    ],
    tone: 'blush',
    icon: 'heart',
  },
  {
    id: 'dementia',
    name: 'Dementia',
    shortDescription: 'For families, carers and early signs',
    intro:
      'Share information about early signs of dementia, what a diagnosis involves, and the support available to carers.',
    packetTitle: 'Dementia & Caregiving',
    packetItems: [
      'Early changes worth noticing',
      'How a diagnosis usually happens',
      'Communicating with care and patience',
      'Support for carers and families',
    ],
    tone: 'mist',
    icon: 'brain',
  },
  {
    id: 'trauma',
    name: 'Trauma',
    shortDescription: 'How the past can live in the present',
    intro:
      'Share educational information about trauma responses, why they persist, and the treatments known to help.',
    packetTitle: 'Understanding Trauma',
    packetItems: [
      'Why the body keeps responding',
      'Common trauma responses',
      'Evidence-based therapies explained',
      'Finding a trauma-informed clinician',
    ],
    tone: 'lavender',
    icon: 'anchor',
  },
  {
    id: 'eating-disorders',
    name: 'Eating Disorders',
    shortDescription: 'Food, control and getting help early',
    intro:
      'Share careful, recovery-focused information about eating disorders and why early support makes a difference.',
    packetTitle: 'Eating Disorders',
    packetItems: [
      'Beyond stereotypes: who is affected',
      'Signs that support is needed',
      'Why early treatment matters',
      'Specialist services and helplines',
    ],
    tone: 'sky',
    icon: 'utensils',
  },
];
