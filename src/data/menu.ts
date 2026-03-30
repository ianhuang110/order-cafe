export type Category = '組合套餐' | '咖啡' | '茶飲' | '甜點' | '沙拉' | '麵包' | '輕食' | '冰淇淋' | '周邊商品';

export interface ModifierOption {
  name: string;
  priceDelta: number;
}

export interface ModifierGroup {
  name: string;
  options: ModifierOption[];
  required: boolean;
  multiSelect?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  modifierGroups?: ModifierGroup[];
}

export const CATEGORIES: Category[] = ['組合套餐', '咖啡', '茶飲', '甜點', '沙拉', '麵包', '輕食', '冰淇淋', '周邊商品'];

// Common Coffee Modifiers
const COFFEE_MODIFIERS: ModifierGroup[] = [
  {
    name: '溫度與冰塊',
    required: true,
    options: [
      { name: '正常冰', priceDelta: 0 },
      { name: '少冰', priceDelta: 0 },
      { name: '去冰', priceDelta: 0 },
      { name: '熱', priceDelta: 0 }
    ]
  },
  {
    name: '甜度',
    required: true,
    options: [
      { name: '正常糖', priceDelta: 0 },
      { name: '半糖', priceDelta: 0 },
      { name: '無糖', priceDelta: 0 }
    ]
  },
  {
    name: '加料加價',
    required: false,
    multiSelect: true,
    options: [
      { name: '加一份濃縮', priceDelta: 20 },
      { name: '升級燕麥奶', priceDelta: 30 }
    ]
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // 組合套餐
  {
    id: 'cb1',
    name: '精緻下午茶套餐',
    description: '任選經典拿鐵或伯爵鮮奶茶，搭配招牌法式馬卡龍。',
    price: 220,
    category: '組合套餐',
    imageUrl: './images/combo_tea.png',
    modifierGroups: [
      {
        name: '選擇飲品',
        required: true,
        options: [
          { name: '經典拿鐵', priceDelta: 0 },
          { name: '伯爵鮮奶茶', priceDelta: 0 }
        ]
      },
      ...COFFEE_MODIFIERS
    ]
  },
  {
    id: 'cb2',
    name: '早晨活力套餐',
    description: '經典美式咖啡搭配現烤奶油可頌，一日的完美開始。',
    price: 130,
    category: '組合套餐',
    imageUrl: './images/combo_morning.png',
    modifierGroups: COFFEE_MODIFIERS
  },

  // 咖啡
  {
    id: 'c1',
    name: '義式濃縮咖啡',
    description: '濃郁醇厚的單品烘焙。',
    price: 80,
    category: '咖啡',
    imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=600',
    modifierGroups: [
      {
        name: '溫度',
        required: true,
        options: [{ name: '熱', priceDelta: 0 }]
      }
    ]
  },
  {
    id: 'c2',
    name: '經典拿鐵',
    description: '細緻奶泡與滑順濃縮咖啡的完美結合。',
    price: 130,
    category: '咖啡',
    imageUrl: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=600',
    modifierGroups: COFFEE_MODIFIERS
  },
  {
    id: 'c3',
    name: '卡布奇諾',
    description: '等比例濃縮咖啡、熱牛奶與綿密奶泡。',
    price: 130,
    category: '咖啡',
    imageUrl: './images/cappuccino.png',
    modifierGroups: COFFEE_MODIFIERS
  },
  {
    id: 'c4',
    name: '手沖咖啡',
    description: '手工濾泡，保留咖啡明亮香氣與清透口感。',
    price: 160,
    category: '咖啡',
    imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600',
    modifierGroups: [
      {
        name: '溫度與冰塊',
        required: true,
        options: [
          { name: '熱', priceDelta: 0 },
          { name: '冰 (單一甜度)', priceDelta: 0 }
        ]
      }
    ]
  },
  
  // 茶飲
  {
    id: 't1',
    name: '宇治抹茶拿鐵',
    description: '京都頂級抹茶粉調和香醇小農鮮奶。',
    price: 150,
    category: '茶飲',
    imageUrl: './images/matcha_latte.png',
    modifierGroups: COFFEE_MODIFIERS
  },
  {
    id: 't2',
    name: '伯爵鮮奶茶',
    description: '帶有佛手柑香氣的斯里蘭卡紅茶與鮮奶完美結合。',
    price: 130,
    category: '茶飲',
    imageUrl: './images/earl_grey.png',
    modifierGroups: COFFEE_MODIFIERS
  },
  {
    id: 't3',
    name: '夏日柚子氣泡飲',
    description: '清香韓國柚子醬搭配氣泡水，清爽解膩。',
    price: 120,
    category: '茶飲',
    imageUrl: './images/yuzu_sparkling.png'
  },

  // 甜點
  {
    id: 'd1',
    name: '經典提拉米蘇',
    description: '浸滿義式濃縮的拇指餅乾交織馬斯卡彭起司。',
    price: 150,
    category: '甜點',
    imageUrl: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'd2',
    name: '紐約重乳酪蛋糕',
    description: '濃郁綿密的乳酪與奶油消化餅乾底。',
    price: 140,
    category: '甜點',
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'd3',
    name: '法式馬卡龍 (3顆)',
    description: '精緻鬆脆外殼包裹滑順甘納許餡。',
    price: 120,
    category: '甜點',
    imageUrl: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=600'
  },

  // 沙拉
  {
    id: 's1',
    name: '雞肉凱薩沙拉',
    description: '爽脆蘿蔓、烤雞胸肉、帕瑪森起司、香烤麵包丁與經典醬汁。',
    price: 220,
    category: '沙拉',
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's2',
    name: '健康藜麥碗',
    description: '營養豐富的藜麥拌烤蔬菜、酪梨與檸檬油醋。',
    price: 240,
    category: '沙拉',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600'
  },

  // 麵包
  {
    id: 'b1',
    name: '奶油可頌',
    description: '金黃酥脆的層次，每天早晨新鮮烘焙。',
    price: 65,
    category: '麵包',
    imageUrl: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b2',
    name: '工匠法棍',
    description: '傳統法式麵包，外層酥脆內部Q彈。',
    price: 80,
    category: '麵包',
    imageUrl: 'https://images.unsplash.com/photo-1597079910443-60c43fc4f729?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b3',
    name: '烤酸種麵包佐奶油',
    description: '微酸有嚼勁的熱烤酸種麵包，搭配頂級奶油。',
    price: 90,
    category: '麵包',
    imageUrl: './images/sourdough.png'
  },

  // 輕食
  {
    id: 'lm1',
    name: '經典瑪格麗特帕尼尼',
    description: '熱壓吐司包裹新鮮番茄、羅勒與濃郁莫札瑞拉起司。',
    price: 180,
    category: '輕食',
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'lm2',
    name: '法式洛林鹹派',
    description: '酥脆派皮盛滿培根、洋蔥與滑順蛋液烘烤而成。',
    price: 160,
    category: '輕食',
    imageUrl: './images/quiche_lorraine.png'
  },

  // 冰淇淋
  {
    id: 'i1',
    name: '馬達加斯加香草籽',
    description: '使用真實香草籽製成的經典濃郁冰淇淋。',
    price: 100,
    category: '冰淇淋',
    imageUrl: './images/vanilla.png'
  },
  {
    id: 'i2',
    name: '京都特濃厚抹茶',
    description: '頂級微苦帶有大地氣息的抹茶冰淇淋。',
    price: 120,
    category: '冰淇淋',
    imageUrl: './images/matcha.png'
  },
  {
    id: 'i3',
    name: '極致黑巧克力布朗尼',
    description: '70%黑巧克力搭配濕潤的布朗尼塊。',
    price: 110,
    category: '冰淇淋',
    imageUrl: './images/chocolate.png'
  },

  // 周邊商品
  {
    id: 'm1',
    name: '店長精選 綜合咖啡豆 (250g)',
    description: '中深焙，散發太妃糖、堅果與黑巧克力的醇厚香氣。',
    price: 450,
    category: '周邊商品',
    imageUrl: './images/merch_beans.png',
    modifierGroups: [
      {
        name: '是否代客磨豆',
        required: true,
        options: [
          { name: '不需磨豆 (原豆)', priceDelta: 0 },
          { name: '義式咖啡機 (極細)', priceDelta: 0 },
          { name: '手沖濾紙 (中度)', priceDelta: 0 }
        ]
      }
    ]
  },
  {
    id: 'm2',
    name: '品牌特製霧黑保溫杯',
    description: '304不鏽鋼材質，保溫保冷長達12小時，手感極佳。',
    price: 880,
    category: '周邊商品',
    imageUrl: './images/merch_tumbler.png'
  },
  {
    id: 'm3',
    name: '經典莊園濾掛包禮盒 (10入)',
    description: '採用衣索比亞水洗豆，帶有明亮的柑橘香與花香。',
    price: 350,
    category: '周邊商品',
    imageUrl: './images/merch_drip.png'
  }
];
