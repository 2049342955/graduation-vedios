const DeepClone={};
DeepClone.deepClone = function(obj){
  var str, newobj = obj.constructor === Array ? [] : {};
  if(typeof obj !== 'object'){
    return;
  } else if(window.JSON){
    str = JSON.stringify(obj), //系列化对象
      newobj = JSON.parse(str); //还原
  } else {
    for(var i in obj){
      newobj[i] = typeof obj[i] === 'object' ?
        cloneObj(obj[i]) : obj[i];
    }
  }
  return newobj;
};

export default DeepClone;
