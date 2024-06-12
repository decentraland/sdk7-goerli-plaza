export enum BannerType {
  B_WITCH = 'witch',
  B_SHAMAN = 'chaman',
  B_LEVEL_TEN = 'level-ten',
  B_CRAFT = 'craft',
  B_MEAT = 'meat',
  B_MEAT_PLUS = 'meat-plus',
  B_WOOD = 'wood',
  B_WOOD_PLUS = 'wood-plus',
  B_IRON = 'iron',
  B_IRON_PLUS = 'iron-plus',
  B_BERRIES = 'berries',
  B_BERRIES_PLUS = 'berries-plus',
  B_BONES = 'bones',
  B_BONES_PLUS = 'bones-plus',
  B_XP = 'xp',
  B_LEVEL_UP = 'level-up'
}

export enum BannerPosition {
  BP_CENTER_TOP = 'center-top',
  BP_CENTER_MID = 'center-mid'
}

export const BANNER: Record<BannerType, string> = {
  [BannerType.B_WITCH]: 'images/banners/1.png',
  [BannerType.B_SHAMAN]: 'images/banners/2.png',
  [BannerType.B_LEVEL_TEN]: 'images/banners/3.png',
  [BannerType.B_CRAFT]: 'images/banners/4.png',
  [BannerType.B_MEAT]: 'images/banners/5.png',
  [BannerType.B_MEAT_PLUS]: 'images/banners/6.png',
  [BannerType.B_WOOD]: 'images/banners/7.png',
  [BannerType.B_WOOD_PLUS]: 'images/banners/8.png',
  [BannerType.B_IRON]: 'images/banners/9.png',
  [BannerType.B_IRON_PLUS]: 'images/banners/10.png',
  [BannerType.B_BERRIES]: 'images/banners/11.png',
  [BannerType.B_BERRIES_PLUS]: 'images/banners/12.png',
  [BannerType.B_BONES]: 'images/banners/13.png',
  [BannerType.B_BONES_PLUS]: 'images/banners/14.png',
  [BannerType.B_XP]: 'images/banners/15.png',
  [BannerType.B_LEVEL_UP]: 'images/lvl_up_2.png'
}
