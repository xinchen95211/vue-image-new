<template>
  <div class="login-wrapper">
    <div class="header">
      <p>注册</p>
    </div>

    <el-form  class="form-wrapper" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" >
      <el-form-item  prop="username">
        <el-input type="text" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" v-model="ruleForm.username" autocomplete="off"  placeholder="用户名" class="input-item" minlength="3" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="密码" class="input-item" minlength="6" maxlength="30" show-password></el-input>
      </el-form-item>
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
        <el-input type="text"  v-model="ruleForm.email" placeholder="邮箱"  class="input-item"  clearable></el-input>
      </el-form-item>
      <el-form-item  class="input-item-row" prop="emailCheckCode">
        <el-input type="text"  onkeyup="value=value.replace(/\D/g,'')" v-model="ruleForm.emailCheckCode" placeholder="验证码" class="input-item" clearable></el-input>
        <el-button :disabled="emailCheckCodeStatus"  @click="showEmailCheckCode">{{emailCheckCodeText}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn" @click="Register('ruleForm')">注册</el-button>
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
import {ElLoading, ElMessage} from "element-plus";
import {Base64} from "js-base64";

export default {
  name: "RegisterView",
  data() {
    const validateUsername = async (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      }else if (value.length < 3){
        callback(new Error('输入的用户名太短了'))
      } else {
        if (await this.checkNameFrom()) {
          callback();
        } else {
          callback(new Error("用户名已存在"));
        }
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
        callback();
      } else {
        callback(new Error("你已经注册过了,请去登陆吧"));
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
      //输入内容
      ruleForm:{
        username: '',
        password: '',
        email:'',
        emailCheckCode:'',
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
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
  created() {
  },
  methods:{
    //注册用户
    Register(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const loading = ElLoading.service({
            lock: true,
            text: '正在注册中,请稍等片刻',
            background: 'rgba(0, 0, 0, 0.8)',
          })
          axios.post(`${this.$domainUrl}/register`,this.ruleForm).then(e => {
            if (e.data.code === 210){
              this.$cookies.set("dXNlcm5hbWU%3D",Base64.encode(this.ruleForm.username));
              this.$cookies.set("cGFzc3dvcmQ%3D",Base64.encode(this.ruleForm.password));
              loading.close()
              ElMessage.success(e.data.message)
              this.$router.push("/login")
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
              // ElMessage.success(e.data.data)
              this.ruleForm.emailCheckCode = e.data.data;
            }
          })
        }else {
          return false;
        }
      })
    },
    //检测用户名是否存在
    async checkNameFrom() {
      try {
        const response = await axios.get(`${this.$domainUrl}/register/checkName/${this.ruleForm.username}`);
        return response.data.code === 200;
      } catch (error) {
        return false;
      }
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