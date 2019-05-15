<!--UI 组件库 - Timeline - 页面测试-->
<template>
  <div class="timeline-wrapper">
    <demo-block>
      <template slot="title">默认</template>
      <template slot="describe">默认时间线</template>
      <template slot="content">
        <div class="gap">
          <ns-timeline
            :options="list">
            <template slot-scope="props">
              {{props.item.content}}
            </template>
          </ns-timeline>
        </div>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">日志</template>
      <template slot="describe">操作日志</template>
      <template slot="content">
        <div class="gap">
          <ns-timeline
            :options="newListLog"
            placement="top"
            :keyRefer="keyRefer"
          >
            <template slot-scope="props">
              <div class="log-title">{{props.item.operateUserName}} &nbsp; &nbsp;&nbsp;{{props.item.operateType}}</div>
              <div v-for="log in props.item.operateContentArray" class="log-detail">
                {{log}}
              </div>
            </template>
          </ns-timeline>
        </div>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">摘要</template>
      <template slot="describe">y轴展示</template>
      <template slot="content">
        <div class="gap">
          <ns-timeline-axis
            :options="remarkList"
          >
          </ns-timeline-axis>
        </div>
      </template>
    </demo-block>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        list: [
          {
            content: '活动按期开始',
            timestamp: '2018-04-15',
            type: 'success',
          }, {
            content: '通过审核',
            timestamp: '2018-04-13',
          }, {
            content: '创建成功',
            timestamp: '2018-04-16',
          },
        ],

        keyRefer: {
          timestamp: 'operateDate',
        },

        listLog: [
          {
            'id': 'dd3e9692623f4937a728e80b8a7ed649',
            'enterpriseId': 767,
            'organizationId': 263,
            'operateUserName': 'lin',
            'operateUserId': 172,
            'operateDate': '2019-04-01 08:23:26',
            'operateType': '客户编辑',
            'operateContent': '性别从[空]修改为[男];婚姻状况从[空]修改为[未婚];',
            'systemDate': '2019-04-01 08:23:26',
            'houseId': 0,
            'ownerId': 75853,
            'chargeStandardId': 0,
            'carId': 0,
            'taxId': 0,
            'paymethodId': 0,
            'chargeItemId': 0,
            'remark': 0,
            'productOrderId': 0,
            'productOrderProductId': 0,
            'productId': 0,
            'functionPoint': '客户',
            'sossType': 0,
          }, {
            'id': 'f8b881cfa85347ca80de65b844203106',
            'enterpriseId': 767,
            'organizationId': 263,
            'operateUserName': 'lin',
            'operateUserId': 172,
            'operateDate': '2019-04-01 08:23:07',
            'operateType': '客户编辑',
            'operateContent': '民族从[空]修改为[蒙古族];',
            'systemDate': '2019-04-01 08:23:07',
            'houseId': 0,
            'ownerId': 75853,
            'chargeStandardId': 0,
            'carId': 0,
            'taxId': 0,
            'paymethodId': 0,
            'chargeItemId': 0,
            'remark': 0,
            'productOrderId': 0,
            'productOrderProductId': 0,
            'productId': 0,
            'functionPoint': '客户',
            'sossType': 0,
          }, {
            'id': 'eccb18dedf27418ba333ae6985299ab1',
            'enterpriseId': 767,
            'organizationId': 263,
            'operateUserName': 'lin',
            'operateUserId': 172,
            'operateDate': '2019-04-01 08:22:56',
            'operateType': '客户编辑',
            'operateContent': '客户名称从[路飞]修改为[海贼王路飞];',
            'systemDate': '2019-04-01 08:22:56',
            'houseId': 0,
            'ownerId': 75853,
            'chargeStandardId': 0,
            'carId': 0,
            'taxId': 0,
            'paymethodId': 0,
            'chargeItemId': 0,
            'remark': 0,
            'productOrderId': 0,
            'productOrderProductId': 0,
            'productId': 0,
            'functionPoint': '客户',
            'sossType': 0,
          }, {
            'id': '330de773d35c49d9a134ad2fe09b8c81',
            'enterpriseId': 767,
            'organizationId': 263,
            'operateUserName': 'lin',
            'operateUserId': 172,
            'operateDate': '2019-04-01 08:17:13',
            'operateType': '客户新增',
            'operateContent': '新增客户',
            'systemDate': '2019-04-01 08:17:13',
            'houseId': 0,
            'ownerId': 75853,
            'chargeStandardId': 0,
            'carId': 0,
            'taxId': 0,
            'paymethodId': 0,
            'chargeItemId': 0,
            'remark': 0,
            'productOrderId': 0,
            'productOrderProductId': 0,
            'productId': 0,
            'functionPoint': '客户',
            'sossType': 0,
          }],

        remarkList: [
          {
            'title': '售楼',
            'active': false,
            'children': [{
              'title': '售楼',
              'date': '2019-04-04',
              'info': '业主: 爱丽丝',
              'active': 0,
              'obvious': 1,
            }],
          }, {
            'title': '收房',
            'active': false,
            'children': [{
              'title': null,
              'date': '2019-04-08',
              'info': '收房人: 爱丽丝',
              'active': 0,
              'obvious': 1,
            }],
          }, {
            'title': '入住',
            'active': false,
            'children': [{
              'title': null,
              'date': '2019-04-08',
              'info': '入住人: 爱丽丝',
              'active': 0,
              'obvious': 1,
            }, {
              'title': null,
              'date': '2019-04-08',
              'info': '入住人: 爱丽丝',
              'active': 0,
              'obvious': 1,
            }],
          }, {
            'title': '装修',
            'active': 1,
            'children': [{
              'title': '装修中',
              'date': '2019-04-07至2019-04-08',
              'info': null,
              'active': 1,
              'obvious': 1,
            }],
          }, {
            'title': '出租',
            'active': false,
            'children': [],
          }],
      };
    },
    computed: {
      newListLog() {
        return this.listLog.map((item) => {
          item.operateContentArray = item.operateContent.split(';');
          return item;
        });
      },
    },
    created() {

    },
    methods: {},
    mounted() {
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .log-title {
    font-weight: bold;
  }

  .log-detail {
    color: #4e515d;
    font-size: 12px;
    line-height: 20px;
  }
</style>
