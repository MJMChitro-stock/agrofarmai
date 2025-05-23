export type AnimalType = {
  id: string;
  name: string;
  icon: string;
  categories: string[];
};

export const Animals: AnimalType[] = [
  {
    id: 'cow',
    name: 'Cow',
    icon: '🐄',
    categories: ['Dairy', 'Beef']
  },
  {
    id: 'goat',
    name: 'Goat',
    icon: '🐐',
    categories: ['Dairy', 'Meat']
  },
  {
    id: 'sheep',
    name: 'Sheep',
    icon: '🐑',
    categories: ['Wool', 'Meat']
  },
  {
    id: 'chicken',
    name: 'Chicken',
    icon: '🐓',
    categories: ['Egg Layer', 'Broiler']
  },
  {
    id: 'duck',
    name: 'Duck',
    icon: '🦆',
    categories: ['Egg Layer', 'Meat']
  },
  {
    id: 'pig',
    name: 'Pig',
    icon: '🐖',
    categories: ['Meat']
  },
  {
    id: 'rabbit',
    name: 'Rabbit',
    icon: '🐇',
    categories: ['Meat', 'Fur']
  },
  {
    id: 'horse',
    name: 'Horse',
    icon: '🐎',
    categories: ['Work', 'Sport']
  }
];

export type HealthIssueType = {
  id: string;
  name: string;
  animals: string[];
  symptoms: string[];
  description: string;
  severity: 'low' | 'medium' | 'high';
};

export const CommonHealthIssues: HealthIssueType[] = [
  {
    id: 'mastitis',
    name: 'Mastitis',
    animals: ['cow', 'goat', 'sheep'],
    symptoms: ['Swollen udder', 'Pain in udder', 'Abnormal milk', 'Reduced milk production'],
    description: 'Inflammation of the mammary gland and udder tissue, usually caused by bacterial infection.',
    severity: 'medium'
  },
  {
    id: 'footrot',
    name: 'Foot Rot',
    animals: ['cow', 'goat', 'sheep'],
    symptoms: ['Lameness', 'Foul odor', 'Swelling between toes', 'Discharge'],
    description: 'Bacterial infection causing inflammation and necrosis of the foot tissue.',
    severity: 'medium'
  },
  {
    id: 'bloat',
    name: 'Bloat',
    animals: ['cow', 'goat', 'sheep'],
    symptoms: ['Distended left flank', 'Discomfort', 'Difficulty breathing', 'Excessive salivation'],
    description: 'Excessive gas build-up in the rumen, often caused by lush, legume-rich pastures.',
    severity: 'high'
  },
  {
    id: 'coccidiosis',
    name: 'Coccidiosis',
    animals: ['chicken', 'rabbit', 'goat', 'sheep'],
    symptoms: ['Bloody diarrhea', 'Weight loss', 'Dehydration', 'Weakness'],
    description: 'Intestinal disease caused by microscopic parasites called coccidia.',
    severity: 'medium'
  },
  {
    id: 'newcastle',
    name: 'Newcastle Disease',
    animals: ['chicken', 'duck'],
    symptoms: ['Respiratory distress', 'Nervous symptoms', 'Decreased egg production', 'Diarrhea'],
    description: 'Highly contagious viral disease affecting many species of birds.',
    severity: 'high'
  }
];

export type RemedyType = {
  id: string;
  name: string;
  healthIssueIds: string[];
  ingredients: string[];
  instructions: string[];
  preventiveMeasures: string[];
};

export const NaturalRemedies: RemedyType[] = [
  {
    id: 'garlic-mastitis',
    name: 'Garlic Compress for Mastitis',
    healthIssueIds: ['mastitis'],
    ingredients: ['Fresh garlic cloves', 'Warm water', 'Clean cloth'],
    instructions: [
      'Crush 5-6 garlic cloves',
      'Mix with warm water to make a paste',
      'Apply to affected udder using clean cloth',
      'Leave for 20 minutes, repeat 3 times daily'
    ],
    preventiveMeasures: [
      'Maintain clean bedding',
      'Practice proper milking hygiene',
      'Ensure complete milk-out during each milking',
      'Isolate affected animals'
    ]
  },
  {
    id: 'copper-footrot',
    name: 'Copper Sulfate Foot Bath',
    healthIssueIds: ['footrot'],
    ingredients: ['Copper sulfate', 'Water', 'Foot bath container'],
    instructions: [
      'Mix 10% copper sulfate solution with water',
      'Have animals stand in solution for 5-10 minutes',
      'Ensure hooves are clean before treatment',
      'Repeat every 5-7 days until healed'
    ],
    preventiveMeasures: [
      'Keep housing areas dry',
      'Regular hoof trimming',
      'Avoid muddy, wet pastures',
      'Quarantine new animals'
    ]
  },
  {
    id: 'baking-soda-bloat',
    name: 'Baking Soda Drench for Bloat',
    healthIssueIds: ['bloat'],
    ingredients: ['Baking soda', 'Water', 'Drench syringe or bottle'],
    instructions: [
      'Mix 2 tablespoons of baking soda in 1 liter of water',
      'Administer slowly via drench syringe or bottle',
      'Walk animal gently after administration',
      'Monitor for relief of symptoms'
    ],
    preventiveMeasures: [
      'Introduce animals gradually to lush pastures',
      'Feed dry hay before turning out on pasture',
      'Avoid sudden feed changes',
      'Consider adding anti-bloat agents to feed'
    ]
  }
];