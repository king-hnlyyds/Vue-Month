<template>
  <div class="personal-add">
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 卡片头部 -->
      <div slot="header" class="clearfix">
        <span>账号添加</span>
      </div>
      <!-- 内容 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <!-- 账号 -->
        <el-form-item label="姓名" prop="username">
          <el-input type="text" v-model="form.username"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号" prop="tel">
          <el-input type="text" v-model="form.tel"></el-input>
        </el-form-item>
        <!-- 入职时间 -->
        <el-form-item label="入职时间" prop="joindate">
          <el-date-picker
            v-model="form.joindate"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
          <!-- <el-input type="text" v-model="form.joindate"></el-input> -->
        </el-form-item>

        <!-- 用户组 -->
        <el-form-item label="所属部门" prop="department">
          <el-select v-model="form.department" placeholder="请选择所属部门">
            <el-option label="营业部" value="营业部"></el-option>
            <el-option label="销售部" value="销售部"></el-option>
            <el-option label="秘书室" value="秘书室"></el-option>
            <el-option label="总经办" value="总经办"></el-option>
            <el-option label="人力资源部" value="人力资源部"></el-option>

            <el-option label="项目一部" value="项目一部"></el-option>
            <el-option label="项目二部" value="项目二部"></el-option>
            <el-option label="行政部" value="行政部"></el-option>
            <el-option label="财务部" value="财务部"></el-option>
            <el-option label="商务部" value="商务部"></el-option>
          </el-select>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="handleAdd">添加</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { userAdd } from "@/api/employee";

export default {
  data() {
    //验证姓名
    const validUsername = (rule, value, callback) => {
      let reg = /^([\u4e00-\u9fa5]{2,12}|[a-zA-Z.\s]{2,12})$/; //中文或者英文

      if (!value) {
        callback(new Error("请输入员工姓名"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入2-12位的中文名或着英文名"));
      } else {
        callback();
      }
    };
    //验证密码
    const validPassword = (rule, value, callback) => {
      let reg = /^[0-9]{6,9}$/; //纯数字密码

      if (!value) {
        callback(new Error("请输入员工密码"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入6-9位的数字密码"));
      } else {
        callback();
      }
    };

    //验证手机号
    const validTel = (rule, value, callback) => {
      let reg =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/; //11位数字手机号

      if (!value) {
        callback(new Error("请输入员工手机号"));
      } else if (!reg.test(value)) {
        callback(new Error("手机号格式不正确"));
      } else {
        callback();
      }
    };

    return {
      //日期选择器配置
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      //表单数据
      form: {
        username: "",
        password: "",
        tel: "",
        joindate: "",
        department: "",
      },

      //内置表单验证规则
      rules: {
        username: [
          { required: true, validator: validUsername, trigger: "blur" },
        ],
        password: [
          { required: true, validator: validPassword, trigger: "blur" },
          // { min: 6, max: 10, message: "请输入6-10的内容", trigger: "blur" },
        ],
        tel: [{ required: true, validator: validTel, trigger: "blur" }],
        joindate: [
          { required: true, message: "请输入入职时间", trigger: "blur" },
          // { min: 10, max: 10, message: "时间格式:2023-03-24", trigger: "blur" },
        ],
        department: [
          { required: true, message: "请选择用户组", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    //添加
    handleAdd() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          //发送ajax
          let { data } = await userAdd(this.form);
          console.log(111, data);
          //请求成功
          if (data.code === 0) {
            //跳转到列表页
            this.$router.push("/layout/PersonalList");
          }
        }
      });
    },
    //重置
    handleReset() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.el-input,
.el-select {
  width: 300px;
}
</style>