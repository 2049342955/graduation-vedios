import Moment from 'moment';

export default function (dateFiledName) {
  const that = this;
  return {
    name: [
      {message: '请输入昵称', trigger: 'blur'},
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
    pwd:[
      {required: true, message: '请输入密码', trigger: 'blur'},
      {min:6,max:20,message:'请输入6-20位密码', trigger: 'blur'},
      {
        validator(ignore, value, callback) {
          try {
            var errors = [];
            if (!value) {
              callback();
              return;
            }
            // console.log('pp',value)
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
    npwd:[
      {required: true, message: '请再次输入密码', trigger: 'blur'},
      {
        validator(ignore, value, callback) {
          try {
            var errors = [];
            if (!value) {
              callback();
              return;
            }
            if (value !== that[dateFiledName].pwd) {
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
