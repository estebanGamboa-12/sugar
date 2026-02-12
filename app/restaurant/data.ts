export type ImageAsset = {
  localSrc: string;
  remoteSrc: string;
  alt: string;
};

export type HeroImage = ImageAsset & {
  id: string;
  className: string;
  parallax: number;
};

export type Dish = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  background: ImageAsset;
  thumbs: ImageAsset[];
};

export const chefPortrait: ImageAsset = {
  localSrc: '/restaurant/chef-portrait.jpg',
  remoteSrc:
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
  alt: 'Chef de restaurante sonriendo en la cocina'
};

export const heroImages: HeroImage[] = [
  {
    id: 'h1',
    localSrc: '/restaurant/hero-01.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    alt: 'Copa de vino tinto sobre mesa elegante',
    className: 'left-[6%] top-[8%] w-28 md:w-36',
    parallax: -90
  },
  {
    id: 'h2',
    localSrc: '/restaurant/hero-02.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=900&q=80',
    alt: 'Plato gourmet con flores comestibles',
    className: 'right-[8%] top-[10%] w-32 md:w-40',
    parallax: 70
  },
  {
    id: 'h3',
    localSrc: '/restaurant/hero-03.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80',
    alt: 'Manos sirviendo comida en plato blanco',
    className: 'left-[13%] top-[38%] w-24 md:w-32',
    parallax: -60
  },
  {
    id: 'h4',
    localSrc: '/restaurant/hero-04.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=900&q=80',
    alt: 'Pan artesanal recién horneado',
    className: 'right-[16%] top-[36%] w-24 md:w-32',
    parallax: 110
  },
  {
    id: 'h5',
    localSrc: '/restaurant/hero-05.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80',
    alt: 'Verduras frescas sobre mármol',
    className: 'left-[4%] bottom-[15%] w-28 md:w-36',
    parallax: -120
  },
  {
    id: 'h6',
    localSrc: '/restaurant/hero-06.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
    alt: 'Pasta fresca en plato oscuro',
    className: 'right-[4%] bottom-[16%] w-28 md:w-36',
    parallax: 100
  },
  {
    id: 'h7',
    localSrc: '/restaurant/hero-07.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
    alt: 'Chef tostando ingredientes en sartén',
    className: 'left-[26%] top-[12%] w-20 md:w-28',
    parallax: -70
  },
  {
    id: 'h8',
    localSrc: '/restaurant/hero-08.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
    alt: 'Mesa de restaurante con luz cálida',
    className: 'right-[26%] top-[16%] w-20 md:w-28',
    parallax: 85
  },
  {
    id: 'h9',
    localSrc: '/restaurant/hero-09.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1559847844-d721426d6edc?auto=format&fit=crop&w=900&q=80',
    alt: 'Pinzas colocando brotes en plato',
    className: 'left-[30%] bottom-[6%] w-20 md:w-24',
    parallax: -95
  },
  {
    id: 'h10',
    localSrc: '/restaurant/hero-10.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80',
    alt: 'Postre de autor con salsa',
    className: 'right-[30%] bottom-[8%] w-20 md:w-24',
    parallax: 75
  },
  {
    id: 'h11',
    localSrc: '/restaurant/hero-11.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1477764250597-dffe9f601ae8?auto=format&fit=crop&w=900&q=80',
    alt: 'Humo sobre parrilla en cocina abierta',
    className: 'left-[42%] top-[4%] w-16 md:w-24',
    parallax: -80
  },
  {
    id: 'h12',
    localSrc: '/restaurant/hero-12.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80',
    alt: 'Cóctel cítrico con hielo',
    className: 'right-[42%] top-[5%] w-16 md:w-24',
    parallax: 80
  }
];

export const dishes: Dish[] = [
  {
    id: 'd1',
    name: 'Vieira a la Brasa',
    subtitle: 'Mantequilla avellanada · limón negro',
    description: 'Carbón noble y mantequilla noisette para un final cítrico y profundo.',
    background: {
      localSrc: '/restaurant/dish-01.jpg',
      remoteSrc:
        'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1800&q=80',
      alt: 'Vieiras a la brasa con mantequilla'
    },
    thumbs: [
      {
        localSrc: '/restaurant/dish-01-thumb-01.jpg',
        remoteSrc:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80',
        alt: 'Detalle de vieira sellada'
      },
      {
        localSrc: '/restaurant/dish-01-thumb-02.jpg',
        remoteSrc:
          'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=500&q=80',
        alt: 'Salsa emplatada artística'
      },
      {
        localSrc: '/restaurant/dish-01-thumb-03.jpg',
        remoteSrc:
          'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=500&q=80',
        alt: 'Brotes verdes frescos'
      }
    ]
  },
  {
    id: 'd2',
    name: 'Arroz de Costa Umami',
    subtitle: 'Caldo de crustáceos · alga kombu',
    description: 'Textura melosa, aroma marino y notas tostadas de fuego lento.',
    background: {
      localSrc: '/restaurant/dish-02.jpg',
      remoteSrc:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80',
      alt: 'Arroz cremoso de mariscos'
    },
    thumbs: [
      {
        localSrc: '/restaurant/dish-02-thumb-01.jpg',
        remoteSrc:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80',
        alt: 'Arroz servido en plato oscuro'
      },
      {
        localSrc: '/restaurant/dish-02-thumb-02.jpg',
        remoteSrc:
          'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=500&q=80',
        alt: 'Cuchara levantando arroz cremoso'
      },
      {
        localSrc: '/restaurant/dish-02-thumb-03.jpg',
        remoteSrc:
          'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=500&q=80',
        alt: 'Detalle de mariscos sobre arroz'
      }
    ]
  },
  {
    id: 'd3',
    name: 'Huerta Fermentada',
    subtitle: 'Remolacha · yogur ahumado · eneldo',
    description: 'Vegetal protagonista con acidez brillante y textura sedosa.',
    background: {
      localSrc: '/restaurant/dish-03.jpg',
      remoteSrc:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1800&q=80',
      alt: 'Plato vegetal con remolacha'
    },
    thumbs: [
      {
        localSrc: '/restaurant/dish-03-thumb-01.jpg',
        remoteSrc:
          'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=500&q=80',
        alt: 'Verduras de temporada'
      },
      {
        localSrc: '/restaurant/dish-03-thumb-02.jpg',
        remoteSrc:
          'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=500&q=80',
        alt: 'Huerta colorida sobre mesa'
      },
      {
        localSrc: '/restaurant/dish-03-thumb-03.jpg',
        remoteSrc:
          'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=500&q=80',
        alt: 'Plato vegetal de alta cocina'
      }
    ]
  },
  {
    id: 'd4',
    name: 'Cordero y Ceniza',
    subtitle: 'Reducción de vino · berenjena al fuego',
    description: 'Cocción precisa, grasa fundente y notas minerales ahumadas.',
    background: {
      localSrc: '/restaurant/dish-04.jpg',
      remoteSrc:
        'https://images.unsplash.com/photo-1514516345957-556ca7ff3804?auto=format&fit=crop&w=1800&q=80',
      alt: 'Cordero con berenjena a la brasa'
    },
    thumbs: [
      {
        localSrc: '/restaurant/dish-04-thumb-01.jpg',
        remoteSrc:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80',
        alt: 'Carne de cordero glaseada'
      },
      {
        localSrc: '/restaurant/dish-04-thumb-02.jpg',
        remoteSrc:
          'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=500&q=80',
        alt: 'Carne reposando en plato'
      },
      {
        localSrc: '/restaurant/dish-04-thumb-03.jpg',
        remoteSrc:
          'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=500&q=80',
        alt: 'Salsa oscura sobre proteína'
      }
    ]
  },
  {
    id: 'd5',
    name: 'Cacao Salino',
    subtitle: 'Ganache 70% · aceite de oliva · sal marina',
    description: 'Postre intenso, untuoso y equilibrado con contraste salino.',
    background: {
      localSrc: '/restaurant/dish-05.jpg',
      remoteSrc:
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1800&q=80',
      alt: 'Postre de cacao con sal marina'
    },
    thumbs: [
      {
        localSrc: '/restaurant/dish-05-thumb-01.jpg',
        remoteSrc:
          'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=500&q=80',
        alt: 'Detalle de ganache de cacao'
      },
      {
        localSrc: '/restaurant/dish-05-thumb-02.jpg',
        remoteSrc:
          'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=500&q=80',
        alt: 'Postre de chocolate con crujiente'
      },
      {
        localSrc: '/restaurant/dish-05-thumb-03.jpg',
        remoteSrc:
          'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&w=500&q=80',
        alt: 'Emplatado final de postre'
      }
    ]
  }
];

export const chefCategories = ['Brasa', 'Mar', 'Huerta'];
