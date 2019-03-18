export const getStageName = function (name, prefix, link, index) {
  // console.log("改变的前缀名称为：", prefix)
  if (!name) throw ("the component should be set with the initial name，" +
    "please check index: " + index + " component' name whether it's property is set");
  if (typeof prefix !== "string" || !prefix) return name;//prefix name
  if (typeof link !== "string") return name;//connector
  const default_name = "default-";
  if (name.indexOf(default_name) === 0) {
    const reg = new RegExp(default_name, "g"); //'default-' => prefix name + connector
    return name.replace(reg, prefix + link);
  }
  else {
    return name;
  }
};
