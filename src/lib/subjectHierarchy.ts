export interface SubjectHierarchy {
    [subject: string]: {
      [topic: string]: string[];
    };
  }
  
  export const subjectHierarchy: SubjectHierarchy = {
    Anatomy: {
      'Embryology': [
        'Gametogenesis',
        'Pre-Embryonic Phase of Development',
        'Embryonic Phase of Development',
        'Placenta, Fetal Membranes and Twinning',
        'Pharyngeal Arches, Skeletal & Muscular Systems',
        'Cardiovascular and Respiratory Systems',
        'Alimentary, Hepatobiliary Systems, Pancreas and Spleen',
        'Face, Nose & Palate, Eye, Ear',
        'Nervous System and Endocrine Glands',
        'Urogenital System',
        'How to Approach Anatomy Edition 8 (Orientation)',
        '1st and 2nd Week of Development',
        '3rd Week Development',
      ],
      'Histology': [
        'Cell Structure, Epithelia, Glands & Connective Tissue',
        'Bone, Cartilage & Muscular Tissue',
        'Nervous and Endocrine Systems',
        'Cardiovascular, Lymphatic and Respiratory Systems',
        'Digestive, Hepatobiliary & Genitourinary Systems',
        'Skin & Special Senses, Eye and Ear',
        'Histology: Part 1',
        'Histology: Part 2',
        'Histology: Part 3',
      ],
      'Neuroanatomy': [
        'Cranial Nerves',
        'Meninges and Dural Venous Sinuses',
        'Ventricular System and Subarachnoid Space',
        'Cerebrum',
        'White Matter of the Brain',
        'Basal Ganglia and Limbic System',
        'Diencephalon',
        'Brainstem',
        'Cerebellum',
        'Vascular Supply of Brain',
        'Spinal Cord',
      ],
      'Head and Neck': [
        'Osteology, Scalp and Face',
        'Deep Fascia and Triangles of the Neck',
        'Muscles, Neurovascular Anatomy of Head & Neck',
        'Glands of the Head and Neck',
        'Tongue and Palate',
        'Pharynx',
        'Larynx',
      ],
      'Upper Limb': [
        'Upper Limb Bones and Joints',
        'Fossae and Spaces of the Upper Limb',
        'Breast',
        'Brachial Plexus and Nerves',
        'Muscles – Upper Limb',
        'Vessels – Upper Limb',
      ],
      'Thorax': [
        'General Anatomy of Thorax',
        'Thoracic Wall',
        'Mediastinum',
        'Diaphragm',
        'Heart',
        'Lungs and Pleura',
      ],
      'Abdomen and Pelvis': [
        'Anterior Abdominal Wall',
        'Abdominal Cavity and Peritoneum',
        'GI Tract',
        'Hepatobiliary System, Spleen & Pancreas',
        'KUB & Adrenal Gland',
        'Internal and External Genitalia',
        'Pelvis & Perineum',
      ],
      'Lower Limb': [
        'Bones of the Lower Limb',
        'Joints of the Lower Limb',
        'Muscles of the Lower Limb',
        'Nerves & Vessels of Lower Limb',
        'Important Structures of Lower Limb',
      ],
      'Back': ['Vertebral Column'],
      'General Anatomy': [
        'Bones, Joints and Cartilage',
        'Muscles and Tendons',
        'Cardiovascular, Lymphatic and Nervous Systems',
        'Skin, Connective Tissue and Ligaments',
      ],
    },
  
    // Add more subjects here
    // Physiology: { ... },
    // Pathology: { ... },
  };