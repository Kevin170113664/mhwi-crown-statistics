const _ = require('lodash');

const KK的大小金 = {
  '冰鱼龙 大金': false, '冰鱼龙 小金': false, '猛牛龙 大金': false, '猛牛龙 小金': false,
  '痹毒龙 大金': false, '痹毒龙 小金': false, '浮眠龙 大金': true, '浮眠龙 小金': false,
  '水妖鸟 大金': false, '水妖鸟 小金': false, '冰牙龙 大金': false, '冰牙龙 小金': false,
  '斩龙 大金': false, '斩龙 小金': false, '轰龙 大金': false, '轰龙 小金': false,
  '碎龙 大金': false, '碎龙 小金': true, '霜翼风漂龙 大金': false, '霜翼风漂龙 小金': true,
  '雷鄂龙 大金': false, '雷鄂龙 小金': false, '硫斩龙 大金': false, '硫斩龙 小金': false,
  '凶爪龙 大金': true, '凶爪龙 小金': false, '冰咒龙 大金': false, '冰咒龙 小金': true,
  '红莲爆鳞龙 大金': false, '红莲爆鳞龙 小金': false, '雾瘴尸套龙 大金': false, '雾瘴尸套龙 小金': false,
  '煌怒恐暴龙 大金': false, '煌怒恐暴龙 小金': false, '歼世灭尽龙 大金': false, '歼世灭尽龙 小金': true,
  '雷狼龙 大金': false, '雷狼龙 小金': false, '黑狼鸟 大金': false, '黑狼鸟 小金': false,
  '战痕黑狼鸟 大金': false, '战痕黑狼鸟 小金': true, '金火龙 大金': false, '金火龙 小金': true,
  '银火龙 大金': false, '银火龙 小金': false, '溟波龙 大金': true, '溟波龙 小金': true,
  '迅龙 大金': true, '迅龙 小金': true,
};

const 凉快的大小金 = {
  '冰鱼龙 大金': false, '冰鱼龙 小金': true, '猛牛龙 大金': false, '猛牛龙 小金': false,
  '痹毒龙 大金': false, '痹毒龙 小金': false, '浮眠龙 大金': false, '浮眠龙 小金': true,
  '水妖鸟 大金': false, '水妖鸟 小金': false, '冰牙龙 大金': false, '冰牙龙 小金': true,
  '迅龙 大金': true, '迅龙 小金': false, '斩龙 大金': false, '斩龙 小金': false,
  '碎龙 大金': false, '碎龙 小金': true, '硫斩龙 大金': false, '硫斩龙 小金': true,
  '霜翼风漂龙 大金': false, '霜翼风漂龙 小金': false, '雷鄂龙 大金': false, '雷鄂龙 小金': true,
  '凶爪龙 大金': false, '凶爪龙 小金': true, '冰咒龙 大金': false, '冰咒龙 小金': true,
  '红莲爆鳞龙 大金': false, '红莲爆鳞龙 小金': true, '雾瘴尸套龙 大金': false, '雾瘴尸套龙 小金': false,
  '溟波龙 大金': false, '溟波龙 小金': true, '煌怒恐暴龙 大金': false, '煌怒恐暴龙 小金': true,
  '歼世灭尽龙 大金': true, '歼世灭尽龙 小金': false, '雷狼龙 大金': false, '雷狼龙 小金': true,
  '黑狼鸟 大金': false, '黑狼鸟 小金': false, '战痕黑狼鸟 大金': false, '战痕黑狼鸟 小金': true,
  '金火龙 大金': false, '金火龙 小金': false, '银火龙 大金': false, '银火龙 小金': false,
  '轰龙 大金': false, '轰龙 小金': true,
};

const getOwnedAndMissingCount = (data) => _.reduce(_.values(data), (result, current) => {
  current ? result.owned++ : result.missing++;
  return result;
}, {
  owned: 0,
  missing: 0
});

describe('mhwi统计', () => {
  test('我们都缺的大小金', () => {

    const 我俩都缺的大小金 = _.intersection(
      _.chain(KK的大小金).pickBy((owned) => !owned).keys().value(),
      _.chain(凉快的大小金).pickBy((owned) => !owned).keys().value()
    );

    console.log(`

凉快拥有: ${getOwnedAndMissingCount(凉快的大小金).owned},
凉快缺少: ${getOwnedAndMissingCount(凉快的大小金).missing},
KK拥有: ${getOwnedAndMissingCount(KK的大小金).owned},
KK缺少: ${getOwnedAndMissingCount(KK的大小金).missing},

我俩都缺的大小金: 

${我俩都缺的大小金.join('\n')}

    `);

  });
});

