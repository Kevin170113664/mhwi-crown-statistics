const _ = require('lodash');

const crownDataForKK = {
  '冰鱼龙 大金': true, '冰鱼龙 小金': false, '猛牛龙 大金': false, '猛牛龙 小金': false,
  '痹毒龙 大金': false, '痹毒龙 小金': false, '浮眠龙 大金': true, '浮眠龙 小金': false,
  '水妖鸟 大金': false, '水妖鸟 小金': false, '冰牙龙 大金': false, '冰牙龙 小金': true,
  '斩龙 大金': true, '斩龙 小金': true, '轰龙 大金': false, '轰龙 小金': true,
  '碎龙 大金': false, '碎龙 小金': true, '霜翼风漂龙 大金': false, '霜翼风漂龙 小金': true,
  '雷鄂龙 大金': true, '雷鄂龙 小金': true, '硫斩龙 大金': false, '硫斩龙 小金': true,
  '凶爪龙 大金': true, '凶爪龙 小金': true, '冰咒龙 大金': false, '冰咒龙 小金': true,
  '红莲爆鳞龙 大金': false, '红莲爆鳞龙 小金': true, '雾瘴尸套龙 大金': true, '雾瘴尸套龙 小金': true,
  '煌怒恐暴龙 大金': false, '煌怒恐暴龙 小金': false, '歼世灭尽龙 大金': false, '歼世灭尽龙 小金': true,
  '雷狼龙 大金': true, '雷狼龙 小金': false, '黑狼鸟 大金': false, '黑狼鸟 小金': false,
  '战痕黑狼鸟 大金': true, '战痕黑狼鸟 小金': true, '金火龙 大金': true, '金火龙 小金': true,
  '银火龙 大金': false, '银火龙 小金': true, '溟波龙 大金': true, '溟波龙 小金': true,
  '迅龙 大金': true, '迅龙 小金': true,
};

const crownDataForOC = {
  '冰鱼龙 大金': false, '冰鱼龙 小金': true, '猛牛龙 大金': false, '猛牛龙 小金': false,
  '痹毒龙 大金': false, '痹毒龙 小金': false, '浮眠龙 大金': false, '浮眠龙 小金': true,
  '水妖鸟 大金': false, '水妖鸟 小金': false, '冰牙龙 大金': false, '冰牙龙 小金': true,
  '迅龙 大金': true, '迅龙 小金': false, '斩龙 大金': false, '斩龙 小金': false,
  '碎龙 大金': false, '碎龙 小金': true, '硫斩龙 大金': false, '硫斩龙 小金': true,
  '霜翼风漂龙 大金': true, '霜翼风漂龙 小金': false, '雷鄂龙 大金': false, '雷鄂龙 小金': true,
  '凶爪龙 大金': false, '凶爪龙 小金': true, '冰咒龙 大金': false, '冰咒龙 小金': true,
  '红莲爆鳞龙 大金': false, '红莲爆鳞龙 小金': true, '雾瘴尸套龙 大金': false, '雾瘴尸套龙 小金': false,
  '溟波龙 大金': false, '溟波龙 小金': true, '煌怒恐暴龙 大金': false, '煌怒恐暴龙 小金': true,
  '歼世灭尽龙 大金': true, '歼世灭尽龙 小金': true, '雷狼龙 大金': false, '雷狼龙 小金': true,
  '黑狼鸟 大金': false, '黑狼鸟 小金': false, '战痕黑狼鸟 大金': false, '战痕黑狼鸟 小金': true,
  '金火龙 大金': false, '金火龙 小金': true, '银火龙 大金': false, '银火龙 小金': false,
  '轰龙 大金': false, '轰龙 小金': true,
};

const getOwnedAndMissingCount = (data) => _.reduce(_.values(data), (result, current) => {
  current ? result.owned++ : result.missing++;
  return result;
}, {
  owned: 0,
  missing: 0
});

const partitionByDangerous = (bothMissing) => {
  const I = ['冰鱼龙', '猛牛龙', '痹毒龙', '浮眠龙', '水妖鸟'];
  const II = ['冰牙龙', '斩龙', '轰龙', '碎龙', '霜翼风漂龙', '雷鄂龙', '硫斩龙', '凶爪龙', '雷狼龙', '黑狼鸟', '战痕黑狼鸟', '迅龙', '金火龙', '银火龙'];
  const III = ['冰咒龙', '红莲爆鳞龙', '雾瘴尸套龙', '煌怒恐暴龙', '歼世灭尽龙', '溟波龙'];

  const filterBy = (dangerousGroup) => _.filter(bothMissing, (name) => _.some(dangerousGroup, (i) => _.startsWith(name, i)));

  return {
    I: filterBy(I),
    II: filterBy(II),
    III: filterBy(III),
  }
};

describe('mhwi统计', () => {
  test('我们都缺的大小金', () => {

    const bothMissing = _.intersection(
      _.chain(crownDataForKK).pickBy((owned) => !owned).keys().value(),
      _.chain(crownDataForOC).pickBy((owned) => !owned).keys().value()
    );

    const {I, II, III} = partitionByDangerous(bothMissing);

    console.log(`

凉快拥有: ${getOwnedAndMissingCount(crownDataForOC).owned}
凉快缺少: ${getOwnedAndMissingCount(crownDataForOC).missing}
KK拥有: ${getOwnedAndMissingCount(crownDataForKK).owned}
KK缺少: ${getOwnedAndMissingCount(crownDataForKK).missing}

我俩都缺的大小金 

I: 
${I.join('\n')}

II: 
${II.join('\n')}

III: 
${III.join('\n')}

    `);

  });
});

