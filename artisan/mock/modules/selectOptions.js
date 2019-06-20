
const options = (req, res) => {
  return res.json({
    "resultCode": "200",
    "resultMsg": "操作成功。",
    "restLog": null,
    "resultData": {
      "pageNum": 1,
      "pageSize": 10,
      "size": 7,
      "orderBy": null,
      "startRow": 1,
      "endRow": 7,
      "total": 7,
      "pages": 1,
      "list": [{
        "id": 861,
        "enterpriseId": 0,
        "organizationId": 0,
        "organizationName": null,
        "jeCoreDictionaryitemId": "02b2e326-e764-4493-a7a1-e2693f57f15f",
        "dictionaryitemDictionaryId": "022858dc-87d9-4d99-8292-c04d420fc6d6",
        "dictionaryitemDictionaryName": null,
        "dictionaryDdname": "结算方式",
        "dictionaryitemItemcode": "100",
        "dictionaryitemItemname": "预收款结转",
        "dictionaryitemItemnameEn": "",
        "dictionaryitemNodeinfotype": "system",
        "syFlag": "1",
        "syOrderindex": 0,
        "handlerId": null
      }, {
        "id": 862,
        "enterpriseId": 0,
        "organizationId": 0,
        "organizationName": null,
        "jeCoreDictionaryitemId": "f55464eb-63d0-4c55-888d-86258191f71b",
        "dictionaryitemDictionaryId": "022858dc-87d9-4d99-8292-c04d420fc6d6",
        "dictionaryitemDictionaryName": null,
        "dictionaryDdname": "结算方式",
        "dictionaryitemItemcode": "110",
        "dictionaryitemItemname": "现金",
        "dictionaryitemItemnameEn": "",
        "dictionaryitemNodeinfotype": "system",
        "syFlag": "1",
        "syOrderindex": 1,
        "handlerId": null
      }, {
        "id": 863,
        "enterpriseId": 0,
        "organizationId": 0,
        "organizationName": null,
        "jeCoreDictionaryitemId": "4e66c7a7-0144-4e71-98b5-9e2d0b8d9192",
        "dictionaryitemDictionaryId": "022858dc-87d9-4d99-8292-c04d420fc6d6",
        "dictionaryitemDictionaryName": null,
        "dictionaryDdname": "结算方式",
        "dictionaryitemItemcode": "111",
        "dictionaryitemItemname": "刷卡",
        "dictionaryitemItemnameEn": null,
        "dictionaryitemNodeinfotype": "system",
        "syFlag": "1",
        "syOrderindex": 2,
        "handlerId": null
      }, {
        "id": 864,
        "enterpriseId": 0,
        "organizationId": 0,
        "organizationName": null,
        "jeCoreDictionaryitemId": "27960031-6775-444c-902c-5cd497ec91ff",
        "dictionaryitemDictionaryId": "022858dc-87d9-4d99-8292-c04d420fc6d6",
        "dictionaryitemDictionaryName": null,
        "dictionaryDdname": "结算方式",
        "dictionaryitemItemcode": "112",
        "dictionaryitemItemname": "微信",
        "dictionaryitemItemnameEn": null,
        "dictionaryitemNodeinfotype": "system",
        "syFlag": "1",
        "syOrderindex": 3,
        "handlerId": null
      }, {
        "id": 865,
        "enterpriseId": 0,
        "organizationId": 0,
        "organizationName": null,
        "jeCoreDictionaryitemId": "005cc89e-edc4-4fa0-a4e5-e5cceb22ef5d",
        "dictionaryitemDictionaryId": "022858dc-87d9-4d99-8292-c04d420fc6d6",
        "dictionaryitemDictionaryName": null,
        "dictionaryDdname": "结算方式",
        "dictionaryitemItemcode": "113",
        "dictionaryitemItemname": "支付宝",
        "dictionaryitemItemnameEn": null,
        "dictionaryitemNodeinfotype": "system",
        "syFlag": "1",
        "syOrderindex": 4,
        "handlerId": null
      }, {
        "id": 866,
        "enterpriseId": 0,
        "organizationId": 0,
        "organizationName": null,
        "jeCoreDictionaryitemId": "20c61ded-f58c-48c7-a7ea-d6e6f3d9b1a8",
        "dictionaryitemDictionaryId": "022858dc-87d9-4d99-8292-c04d420fc6d6",
        "dictionaryitemDictionaryName": null,
        "dictionaryDdname": "结算方式",
        "dictionaryitemItemcode": "114",
        "dictionaryitemItemname": "储蓄卡",
        "dictionaryitemItemnameEn": null,
        "dictionaryitemNodeinfotype": "system",
        "syFlag": "1",
        "syOrderindex": 5,
        "handlerId": null
      }, {
        "id": 867,
        "enterpriseId": 0,
        "organizationId": 0,
        "organizationName": null,
        "jeCoreDictionaryitemId": "2792856b-aac7-4fa1-aaf5-e2499ef2cd5b",
        "dictionaryitemDictionaryId": "022858dc-87d9-4d99-8292-c04d420fc6d6",
        "dictionaryitemDictionaryName": null,
        "dictionaryDdname": "结算方式",
        "dictionaryitemItemcode": "115",
        "dictionaryitemItemname": "信用卡",
        "dictionaryitemItemnameEn": null,
        "dictionaryitemNodeinfotype": "system",
        "syFlag": "1",
        "syOrderindex": 6,
        "handlerId": null
      }],
      "firstPage": 1,
      "prePage": 0,
      "nextPage": 0,
      "lastPage": 1,
      "isFirstPage": true,
      "isLastPage": true,
      "hasPreviousPage": false,
      "hasNextPage": false,
      "navigatePages": 8,
      "navigatepageNums": [1]
    },
    "pageNum": null,
    "pageSize": null,
    "total": null
  });
};

const remoteOptions = (req, res) => {
  let key = req.query.key || '';
  let arr = [{
    "houseId": 1000001,
    "ownerId": null,
    "houseName": "朝阳区域-12",
    "ownerName": null
  }, {
    "houseId": 1000002,
    "ownerId": null,
    "houseName": "朝阳区域-碧云天项目-华润城1-A栋-1单元",
    "ownerName": null
  }, {
    "houseId": 1000003,
    "ownerId": null,
    "houseName": "朝阳区域-碧云天项目-华润城2-A栋-1单元",
    "ownerName": null
  }, {
    "houseId": 1000004,
    "ownerId": null,
    "houseName": "朝阳区域-碧云天项目-华润城3-A栋-1单元",
    "ownerName": null
  }, {
    "houseId": 1000005,
    "ownerId": 75928,
    "houseName": "朝阳区域-碧云天项目-金色海滩组团-筑梦师楼栋-青云单元-1001",
    "ownerName": "爱丽丝"
  }, {
    "houseId": 1000006,
    "ownerId": 768772,
    "houseName": "朝阳区域-碧云天项目-金色海滩组团-筑梦师楼栋-青云单元-1001",
    "ownerName": "122123"
  }, {
    "houseId": 1000007,
    "ownerId": 564995,
    "houseName": "朝阳区域-碧云天项目-金色海滩组团-筑梦师楼栋-青云单元-1001",
    "ownerName": "陈皮88"
  }, {
    "houseId": 1000008,
    "ownerId": 75862,
    "houseName": "黄埔区域-黑洞项目-涟漪湾组团-公元里楼栋-风浅苑单元-1010",
    "ownerName": "李小白"
  }, {
    "houseId": 1000009,
    "ownerId": 75958,
    "houseName": "黄埔区域-木星项目-涟漪湾组团-公元里楼栋-风浅单元-1111",
    "ownerName": "离席"
  }, {
    "houseId": 10000010,
    "ownerId": 75958,
    "houseName": "朝阳区域-碧云天项目-金色海滩组团-筑梦师楼栋-青云单元-1101",
    "ownerName": "离席"
  }, {
    "houseId": 10000011,
    "ownerId": 768874,
    "houseName": "红黄蓝项目-童装一号-公主裙-1011",
    "ownerName": "售楼新增9"
  }, {
    "houseId": 10000012,
    "ownerId": null,
    "houseName": "红黄蓝项目-童装一号-23-12",
    "ownerName": null
  }, {
    "houseId": 10000013,
    "ownerId": null,
    "houseName": "红黄蓝项目-童装一号-公主裙-1011",
    "ownerName": null
  }];

  let filterArr = arr.filter((item)=>{
    return (item.houseId + "").indexOf(key) > -1 || item.houseName.indexOf(key) > -1;
  });

  return res.json({
    "resultCode": "200",
    "resultMsg": "操作成功。",
    "restLog": null,
    "resultData": filterArr,
    "pageNum": null,
    "pageSize": null,
    "total": null
  })
};

module.exports = {
  'GET /system/dictionary/list-dictionaryItem': options,
  'GET /form/select/remote': remoteOptions
};
