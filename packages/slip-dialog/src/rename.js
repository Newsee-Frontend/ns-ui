export const getStageName = function (name, prefix, link, index) {
  // console.log("改变的前缀名称为：", prefix)
  if (!name) throw ("the component should be set with the initial name，" +
    "please check index: " + index + " component' name whether it's property is set");
  if (typeof prefix !== "string" || !prefix) return name;//prefix name
  if (typeof link !== "string") return name;//connector
  const default_name = "default-";
  return prefix + link + name;
};
