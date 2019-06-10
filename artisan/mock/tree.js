const Mock = require('mockjs');

let childResultData = [...new Array(7)].map((item, index) =>{
  return  {
    "houseId":Mock.mock('@integer(60, 1000000000)'),
    "disabled": index > 5,
    "organizationId": 263,
    "houseName": "65678",
    "houseFullName": "红黄蓝项目-65678" + index,
    "houseType": "9",
    "parentId": 114191,
    "path": "/114191/",
    "level": 1,
    "sort": 2,
    "stage": "10",
    "rentStage": "0",
    "decorateStage": "0",
    "isBlockUp": 0,
    "isVirtual": 0,
    "isLock": 0,
    "editStatus": 0,
    "parentHouseIds": "",
    "childOwnerHouseBaseInfoTreeNodeList": [],
    "isHasChild": Mock.mock('@boolean')
  }
})

let rootResultData = [
  {
    "organizationId": 263,
    "companyName": "new see",
    "houseId": 0,
    "id": 0,
    "childOwnerHouseBaseInfoTreeNodeList": [{
      "houseId": 114191,
      "organizationId": 263,
      "houseName": "红黄蓝项目",
      "houseFullName": "红黄蓝项目",
      "houseType": "2",
      "parentId": 0,
      "path": "/",
      "level": 0,
      "sort": 1,
      "stage": "10",
      "rentStage": "0",
      "decorateStage": "0",
      "isBlockUp": 0,
      "isVirtual": 0,
      "isLock": 0,
      "editStatus": 0,
      "parentHouseIds": "",
      "childOwnerHouseBaseInfoTreeNodeList": [],
      "isHasChild": true
    }],
    "isHasChild": true,
    "houseName": null,
    "precinctId": "114191"
  }
]

rootResultData[0].childOwnerHouseBaseInfoTreeNodeList[0].childOwnerHouseBaseInfoTreeNodeList = childResultData;

const treeOptions = (req, res) => {
  return res.json({
    resultCode: '200',
    resultMsg: '操作成功。',
    restLog: null,
    resultData: childResultData
  })
}

const initOptions = (req, res) => {
  return res.json({
    resultCode: '200',
    resultMsg: '操作成功。',
    restLog: null,
    resultData: rootResultData
  })
}

module.exports = {
  'GET /system/data/childrenTree': treeOptions,
  'GET /system/data/initTree': initOptions
}
