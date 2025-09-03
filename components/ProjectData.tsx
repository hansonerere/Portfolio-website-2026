// 项目数据管理
export interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  category: string;
  coverImage?: string;
  videoUrl?: string;
  galleryImages?: string[];
  tags?: string[];
  content?: {
    type: 'text' | 'image' | 'video';
    content: string;
    title?: string;
  }[];
}

export const projects: Project[] = [
  {
    id: 'about',
    title: 'About me',
    description: 'We are a studio founded by Scandinavian expats in sunny Los Angeles. We work with globally recognized brands, as well as local creatives. Reach out to us for your next campaign or rebranding!',
    year: '2025',
    category: 'Info',
    coverImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop',
    // Removed problematic video URL - will gracefully show image instead
    galleryImages: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1622020886177-239ee6e69b39?w=600&h=900&fit=crop',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=700&fit=crop',
      'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=500&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop'
    ],
    content: [
      {
        type: 'text',
        title: 'About me',
        content: 'We are a studio founded by Scandinavian expats in sunny Los Angeles. We work with globally recognized brands, as well as local creatives. Reach out to us for your next campaign or rebranding!'
      }
    ]
  },
  {
    id: 'casablanco',
    title: 'Casablanco',
    description: 'Rebranding for Californian luxurious furniture maker, Casablanco.',
    year: '2025',
    category: 'Project',
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop',
    // Removed problematic video URL - will gracefully show image instead
    galleryImages: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=700&fit=crop',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1622020886177-239ee6e69b39?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&h=900&fit=crop',
      'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?w=600&h=500&fit=crop',
      'https://images.unsplash.com/photo-1549947219-91a2b580fdd9?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop'
    ],
    content: [
      {
        type: 'text',
        title: 'Casablanco',
        content: 'Casablanco is a California-based furniture maker crafting sculptural pieces at the intersection of architecture and luxury. We partnered with their team on a full rebrand — evolving their visual identity and digital presence while keeping the brand\'s core rooted in timeless design.'
      },
      {
        type: 'text',
        title: 'Process',
        content: 'We began by stripping the brand back to its foundations. The previous identity leaned heavily on ornament — we replaced it with structural elegance, minimal type, and a calming, sun-washed palette.'
      }
    ]
  },
  {
    id: 'drowning-in-dusk',
    title: 'Drowning in Dusk',
    description: 'Brand new identity for a renowned fashion designer.',
    year: '2025',
    category: 'Project',
    coverImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=800&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=900&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=500&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop'
    ],
    content: [
      {
        type: 'text',
        title: 'Drowning in Dusk',
        content: 'A complete visual identity for an emerging fashion designer, focusing on the intersection of darkness and light, creating a mysterious yet approachable brand presence.'
      }
    ]
  },
  {
    id: 'siktak',
    title: 'SIKTAK',
    description: 'A fresh identity for the highly beloved Korean restaurant, SIKTAK.',
    year: '2025',
    category: 'Project',
    coverImage: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200&h=800&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=700&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=600&h=900&fit=crop',
      'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=500&fit=crop',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=750&fit=crop'
    ],
    content: [
      {
        type: 'text',
        title: 'SIKTAK',
        content: 'A fresh identity for the highly beloved Korean restaurant, SIKTAK. We created a modern visual system that honors traditional Korean aesthetics while appealing to a contemporary audience.'
      }
    ]
  },
  {
    id: 'ampm',
    title: 'AM/PM?',
    description: 'A grownup rebrand for this Californian marketing agency.',
    year: '2025',
    category: 'Project',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=900&fit=crop',
      'https://images.unsplash.com/photo-1552581234-26160f608093?w=600&h=700&fit=crop',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=500&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=750&fit=crop'
    ],
    content: [
      {
        type: 'text',
        title: 'AM/PM?',
        content: 'A grownup rebrand for this Californian marketing agency. We developed a sophisticated identity that reflects their 24/7 dedication to client success.'
      }
    ]
  },
  {
    id: 'tmrw',
    title: 'tmrw',
    description: 'We proudly put the finishing touches of tmrw\'s 2026 strategy and further brand growth.',
    year: '2025',
    category: 'Project',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=700&fit=crop',
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1554774853-719586f82d77?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=900&fit=crop',
      'https://images.unsplash.com/photo-1515378791036-0648a814c963?w=600&h=500&fit=crop',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=750&fit=crop'
    ],
    content: [
      {
        type: 'text',
        title: 'tmrw',
        content: 'We proudly put the finishing touches of tmrw\'s 2026 strategy and further brand growth. A forward-thinking brand identity for a future-focused company.'
      }
    ]
  },
  {
    id: 'beyond-the-pines',
    title: 'Beyond the Pines',
    description: 'New vision for Mexican/American tequila maker, Beyond the Pines.',
    year: '2025',
    category: 'Project',
    coverImage: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=1200&h=800&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=900&fit=crop',
      'https://images.unsplash.com/photo-1515961794043-5466b4098db4?w=600&h=700&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606916962954-c9c4af13465b?w=600&h=750&fit=crop'
    ],
    content: [
      {
        type: 'text',
        title: 'Beyond the Pines',
        content: 'New vision for Mexican/American tequila maker, Beyond the Pines. We crafted an identity that honors traditional craftsmanship while embracing modern luxury.'
      }
    ]
  },
  {
    id: 'outofsight',
    title: 'OUTOFSIGHT',
    description: 'Rebrand for the luxury eyewear designers, OUTOFSIGHT.',
    year: '2025',
    category: 'Project',
    coverImage: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&h=800&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=700&fit=crop',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=900&fit=crop',
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=500&fit=crop',
      'https://images.unsplash.com/photo-1556306535-38febf6782e7?w=600&h=750&fit=crop'
    ],
    content: [
      {
        type: 'text',
        title: 'OUTOFSIGHT',
        content: 'Rebrand for the luxury eyewear designers, OUTOFSIGHT. A sophisticated visual identity that reflects precision engineering and timeless style.'
      }
    ]
  },
  {
    id: 'motiv8ate',
    title: 'Motiv8/ate',
    description: 'Fresh identity for New York based studio, Motiv8/ate.',
    year: '2025',
    category: 'Project',
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=800&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=600&h=900&fit=crop',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=700&fit=crop',
      'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=600&h=500&fit=crop',
      'https://images.unsplash.com/photo-1587614203976-365c74645e83?w=600&h=750&fit=crop'
    ],
    content: [
      {
        type: 'text',
        title: 'Motiv8/ate',
        content: 'Fresh identity for New York based studio, Motiv8/ate. An energetic brand system that captures the studio\'s creative drive and innovative spirit.'
      }
    ]
  }
];