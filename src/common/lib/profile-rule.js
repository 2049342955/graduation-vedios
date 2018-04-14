import Moment from 'moment';

export default function (dateFiledName) {
  const that = this;
  return {
    nickname: [
      {message: '请输入昵称', trigger: 'blur'},
      {min: 1, max: 80, message: '长度在 1 到 80 个字符', trigger: 'blur'}
    ],
    address: [
      {message: '请输入地址', trigger: 'blur'},
      {min: 1, max: 80, message: '长度在 1 到 80 个字符', trigger: 'blur'}
    ],
    phone: [
      {required: true, message: '请设置主要联系人手机号', trigger: 'blur'},
      {
        pattern: /^(((13[0-9])|14[5|7]|(15[0-3|5-9])|(17[0|3|6-8])|(18[0-9])|(170[0|1]))+\d{8})$/,
        message: '请输入合法的手机号',
        trigger: 'blur'
      }
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
    oldPassword:[
      {required: true, message: '请输入原密码', trigger: 'blur'},
      {
        validator(ignore,value,callback){
          try{
            var errors = [];
            if (!value){
              callback();
              return;
            }
            if(value!= that[dateFiledName].password){
              errors.push(new Error("密码错误，请检查"))
            }
            callback(errors);
          }catch(error){
            callback(error);
          }

        }
      }
    ],
    newPassword:[
      {required: true, message: '请输入密码', trigger: 'blur'},
      {min:6,max:20,message:'请输入6-20位密码',required:true, trigger: 'blur'},
      {
        validator(ignore, value, callback) {
          try {
            var errors = [];
            if (!value) {
              callback();
              return;
            }
            //校验密码复杂度
            if (value.length < 6 || value.length > 20) {
              errors.push(new Error("密码长度为6-20位"));
            } else {
              var count = 0;
              if (value.match(/([a-z])+/)) {
                count++;
              }
              if (value.match(/([0-9])+/)) {
                count++;
              }
              if (value.match(/([A-Z])+/)) {
                count++;
              }
              if (value.match(/[^a-zA-Z0-9]+/)) {
                count++;
              }
              if (count < 2) {
                errors.push(new Error("密码必须包括大小写字母、数字、特殊字符中任意两种!"));
              }
            }
            callback(errors);
          } catch (error) {
            callback(error);
          }

        }
      }
    ],
    ensure:[
      {required: true, message: '请再次输入密码', trigger: 'blur'},
      {
        validator(ignore, value, callback) {
          try {
            var errors = [];
            if (!value) {
              callback();
              return;
            }
            if (value !== that[dateFiledName].newPassword) {
              errors.push(new Error("密码不一致"));
            }
            callback(errors);
          } catch (error) {
            callback(error);
          }

        }
      }
    ],
  };
};
