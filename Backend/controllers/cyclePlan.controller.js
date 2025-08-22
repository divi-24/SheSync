// Controller for cycle syncing fitness & nutrition plans
export const cyclePlanController = async (req, res) => {
  // Get user's current phase from query or body (for demo, accept as query param)
  const { phase } = req.query;
  if (!phase) {
    return res.status(400).json({ message: 'Cycle phase is required (e.g., Follicular, Ovulatory, Luteal, Menstrual)' });
  }

  // Example plans for each phase
  const plans = {
    Menstrual: {
      fitness: [
        'Gentle yoga or stretching',
        'Short walks',
        'Rest as needed',
      ],
      nutrition: [
        'Iron-rich foods (spinach, beans, lean meats)',
        'Warm herbal teas',
        'Hydrating fruits (watermelon, cucumber)'
      ],
      tips: [
        'Listen to your body and rest',
        'Use heat packs for cramps',
      ]
    },
    Follicular: {
      fitness: [
        'Cardio workouts (running, cycling)',
        'Strength training',
        'Dance or aerobics',
      ],
      nutrition: [
        'Fresh fruits and veggies',
        'Lean proteins',
        'Whole grains'
      ],
      tips: [
        'Try new activities, energy is higher',
        'Focus on building healthy habits',
      ]
    },
    Ovulatory: {
      fitness: [
        'High-intensity interval training (HIIT)',
        'Group sports',
        'Challenging workouts',
      ],
      nutrition: [
        'Antioxidant-rich foods (berries, nuts)',
        'Plenty of water',
        'Light, balanced meals'
      ],
      tips: [
        'Socialize and enjoy group activities',
        'Stay hydrated',
      ]
    },
    Luteal: {
      fitness: [
        'Moderate exercise (pilates, swimming)',
        'Gentle yoga',
        'Walking',
      ],
      nutrition: [
        'Complex carbs (sweet potatoes, oats)',
        'Magnesium-rich foods (dark chocolate, nuts)',
        'Herbal teas'
      ],
      tips: [
        'Prioritize sleep and stress relief',
        'Eat small, frequent meals',
      ]
    },
  };

  const plan = plans[phase] || plans['Menstrual'];
  return res.status(200).json({ phase, ...plan });
};
