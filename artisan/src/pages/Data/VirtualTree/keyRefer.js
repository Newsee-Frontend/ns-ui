//house tree
/**
 * origanize tree key refer
 */
export default {
  id: 'houseId',
  label: 'houseName',
  children: 'childOwnerHouseBaseInfoTreeNodeList',
  isLeaf:  (item) => !item.isHasChild,
};
