export type Category = '咖啡' | '甜點' | '沙拉' | '麵包' | '冰淇淋';

export interface ModifierOption {
  name: string;
  priceDelta: number;
}

export interface ModifierGroup {
  name: string;
  options: ModifierOption[];
  required: boolean;
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

export const CATEGORIES: Category[] = ['咖啡', '甜點', '沙拉', '麵包', '冰淇淋'];

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
    options: [
      { name: '加一份濃縮', priceDelta: 20 },
      { name: '升級燕麥奶', priceDelta: 30 }
    ]
  }
];

export const MENU_ITEMS: MenuItem[] = [
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
    imageUrl: '/images/cappuccino.png',
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
    imageUrl: '/images/sourdough.png'
  },

  // 冰淇淋
  {
    id: 'i1',
    name: '馬達加斯加香草籽',
    description: '使用真實香草籽製成的經典濃郁冰淇淋。',
    price: 100,
    category: '冰淇淋',
    imageUrl: '/images/vanilla.png'
  },
  {
    id: 'i2',
    name: '京都特濃厚抹茶',
    description: '頂級微苦帶有大地氣息的抹茶冰淇淋。',
    price: 120,
    category: '冰淇淋',
    imageUrl: '/images/matcha.png'
  },
  {
    id: 'i3',
    name: '極致黑巧克力布朗尼',
    description: '70%黑巧克力搭配濕潤的布朗尼塊。',
    price: 110,
    category: '冰淇淋',
    imageUrl: '/images/chocolate.png'
  }
];
