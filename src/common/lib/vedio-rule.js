import Moment from 'moment';

export default function (dateFiledName) {
  const that = this;
  return {
    name: [
      {message: '请输入视频名', trigger: 'blur'},
      {min: 1, max: 80, message: '长度在 1 到 80 个字符', trigger: 'blur'}
    ],
    summary:[
      {message: '请输入视频简介', trigger: 'blur'},
      {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
    ],
  };
};
