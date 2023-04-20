<template>
  <div class="login">
    <div class="title">
      <span>世纪江尚CRM系统</span>
    </div>

    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
    >
      <el-form-item label="账号" prop="username">
        <el-input
          v-model="form.username"
          prefix-icon="iconfont icon-user"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          @keydown.native.enter="submitForm"
          prefix-icon="iconfont icon-psw"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//引入接口模块
import { checkLogin } from "@/api/login.js";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入员工姓名", trigger: "blur" },
          {
            min: 2,
            max: 12,
            message: "长度在 2 到 12 个字符",
            trigger: "blur", //失焦
          },
        ],
        password: [
          { required: true, message: "请输入员工密码", trigger: "blur" },
          {
            min: 5,
            max: 12,
            message: "长度在 5 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      // 选中整个表单 调用验证方法
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 发送登录ajax
          checkLogin(this.form).then((res) => {
            // 如果等于0 就是成功
            if (res.data.code == 0) {
              // 把令牌存入本地
              localStorage.setItem("token", res.data.token);

              // 跳转到首页
              this.$router.push("/layout/department");
            } else {
              // 失败也要弹窗
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            }

            this.loading = false;
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(@/assets/images/4799.jpg) center no-repeat;
  .title {
    line-height: 30px;
    font-size: 30px;
    // background: pink;
    // font-family: '楷体';
    font-weight: bold;
    color: #177bcd;
    margin-bottom: 20px;
    padding-left: 60px;
  }
}
</style>