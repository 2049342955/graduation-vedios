import Moment from 'moment';

export default function (dateFiledName) {
  const that = this;
  return {
    name: [
      {required: true,message: '请输入用户名', trigger: 'blur'},
      {min: 1, max: 80, message: '长度在 1 到 80 个字符', trigger: 'blur'}
    ],
    email:[
      {required: true, message: '请输入邮箱', trigger: 'blur'},
      {
        validator(ignore,value,callback){
          try{
            var errors = [];
            if (!value){
              callback();
              return;
            }
            if(!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)){
              errors.push(new Error("不是一个有效的邮箱地址"));
            }
            callback(errors);
          }catch(error){
            callback(error);
          }

        }
      }
    ],
    phone: [
      {required: true, message: '请输入手机号', trigger: 'blur'},
      {
        pattern: /^(((13[0-9])|14[5|7]|(15[0-3|5-9])|(17[0|3|6-8])|(18[0-9])|(170[0|1]))+\d{8})$/,
        message: '请输入合法的手机号',
        trigger: 'blur'
      }
    ],
  };
};
