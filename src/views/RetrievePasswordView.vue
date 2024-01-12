<template>
  <div class="login-wrapper">
    <div class="header">
      <p>找回密码</p>
    </div>
    <el-form  class="form-wrapper" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" >
      <el-form-item  prop="email" :rules="[
        {
          required: true,
          message: '请输入邮箱地址',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: ['blur', 'change'],
        },
      ]">
        <el-input type="text"  v-model="ruleForm.email" placeholder="邮箱" class="input-item"  clearable></el-input>
      </el-form-item>
      <el-form-item  class="input-item-row" prop="emailCheckCode">
        <el-input type="text" v-model="ruleForm.emailCheckCode"  onkeyup="value=value.replace(/\D/g,'')" placeholder="验证码" class="input-item" clearable></el-input>
        <el-button :disabled="emailCheckCodeStatus"  @click="showEmailCheckCode">{{emailCheckCodeText}}</el-button>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input type="password" v-model="ruleForm.password" placeholder="新密码" class="input-item" clearable show-password></el-input>
      </el-form-item>
      <el-form-item  prop="checkPassword">
        <el-input type="password" v-model="ruleForm.checkPassword" placeholder="确认密码" class="input-item" clearable show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn" @click="Retrieve('ruleForm')">修改密码</el-button>
      </el-form-item>
    </el-form>
    <br>
    <div class="msg">
      已有账户?
      <a style="color: blue" @click="this.$router.push('/login')">去登陆</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
export default {
  name: "RetrievePasswordView",
  data(){
    const validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }else if (value === this.ruleForm.password) {
        callback();
      }else{
        callback(new Error('两次密码输入不一致'));
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6){
        callback(new Error('输入的密码太短了'))
      }else {
        callback();
      }
    };
    const validateEmail = async (rule, value, callback) => {
      if (await this.checkEmail()) {
        callback(new Error("您还没有注册过呢"));
      } else {
        callback();
      }
    };
    const validateEmailCheckCode = async (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else {
        if (await this.checkEmailCode()) {
          callback();
        } else {
          callback(new Error("验证码输入错误"));
        }
        callback();
      }
    };

    return {
      ruleForm:{
        username:'superstore',
        emailCheckCode: '',
        checkPassword:'',
        password:'',
        email: '',

      },
      rules: {
        checkPassword: [
          { validator: validateCheckPassword, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        emailCheckCode:[
          { validator: validateEmailCheckCode, trigger: 'blur' }
        ],
        email:[
          { validator: validateEmail, trigger: 'blur' }
        ]
      },
      emailCheckCodeText:'获取验证码',
      emailCheckCodeStatus:false
    };
  },
  methods:{
    Retrieve(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post(`${this.$domainUrl}/register/retrieve`,this.ruleForm).then(e => {
            if (e.data.code === 211){
              ElMessage.success(e.data.message)
            }
          })
        } else {
          return false;
        }
      });
    },
    timer(time) {
      if (time > 0) {
        time--;
        this.emailCheckCodeText = "已发送（" + time + "）";
        setTimeout(() => {
          this.timer(time)
        }, 1000);
      } else{
        this.emailCheckCodeText = "获取验证码";
        this.emailCheckCodeStatus = false;
      }
    },
    //获取验证码
    showEmailCheckCode(){
      this.$refs.ruleForm.validateField("email",(valid) => {
        if (valid){
          this.emailCheckCodeStatus = true;
          let time = 60;
          this.timer(time)
          axios.get(`${this.$domainUrl}/register/getEmailCheckCode/${this.ruleForm.email}`).then(e => {
            if (e.data.code === 200) {
              ElMessage.success(e.data.data)
            }
          })
        }else {
          return false;
        }
      })
    },
    //检测这个邮箱是否注册过
    async checkEmail(){
      try {
        const response = await axios.get(`${this.$domainUrl}/register/checkEmail/${this.ruleForm.email}`);
        return response.data.code === 200;
      } catch (error) {
        return false;
      }
    },
    //检测邮箱验证码是否正确
    async checkEmailCode() {
      try {
        const response = await axios.post(`${this.$domainUrl}/register/checkEmailCode`, this.ruleForm);
        return response.data.code === 200;
      } catch (error) {
        return false;
      }
    },
  }
}
</script>

<style scoped>

</style>