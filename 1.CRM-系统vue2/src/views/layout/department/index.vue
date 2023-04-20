<template>
  <div class="goods-classify">
    <!-- 卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>部门管理</span>
        <el-button
          class="addBtn"
          style="float: right; padding: 3px 0"
          type="text"
          @click="dialogVisible = true"
          >添加部门</el-button
        >
      </div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        :style="{ width: tableWidth + 'px' }"
      >
        <el-table-column type="index" label="序号"> </el-table-column>

        <el-table-column label="部门名称">
          <template slot-scope="scope">
            <!-- 通过可编辑字段控制：显示内容 -->
            <span v-if="!scope.row.edit">{{ scope.row.name }}</span>
            <el-input v-else size="small" v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              :type="scope.row.edit ? 'success' : ''"
              size="small"
              @click="handleEdit(scope.row)"
              >{{ scope.row.edit ? "完成" : "编辑" }}</el-button
            >
            <el-button size="small" type="danger" @click="handleDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pageData.page"
        :page-size="pageData.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageTotal"
      >
      </el-pagination>
    </el-card>

    <!-- 弹框 -->
    <el-dialog title="添加部门" :visible.sync="dialogVisible" width="400px">
      <!-- 内容 -->
      <el-form :model="form" label-width="100px" size="small">
        <el-form-item label="部门名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogAffirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  departmentList,
  departmentAdd,
  departmentEdit,
  departmentDel,
} from "@/api/department";
import tableWidthMixin from "@/mixins/tableWidthMixin";
export default {
  mixins: [tableWidthMixin],
  data() {
    return {
      // 表格数据
      tableData: [],
      //分页数据
      pageData: {
        //当前页
        page: 1,
        // 默认5条
        pageSize: 10,
      },
      //总条数
      pageTotal: 0,
      // 弹框显示、隐藏
      dialogVisible: false,
      // 弹窗表单
      form: {
        name: "",
      },
    };
  },
  // 进入页面获取数据
  created() {
    this.getList();
  },
  methods: {
    //获取列表数据
    async getList() {
      let { data } = await departmentList(this.pageData);
      //解决最后一条数据删除的问题
      if (!data.data.length && this.pageData.page != 1) {
        this.pageData.page -= 1;
        this.getList();
      }

      data.data.forEach((v) => {
        //添加可编辑状态
        v.edit = false;
      });
      //表格数据,分页总条数
      this.tableData = data.data;
      this.pageTotal = data.total;
      console.log(this.tableData);
    },
    //添加分类
    addClssify() {
      //显示弹框
      this.dialogVisible = true;
      //   # 重置表单内容
      this.form = { name: "", state: ture };
    },

    //编辑按钮
    async handleEdit(row) {
      //控制当前行的可编辑状态
      row.edit = !row.edit;
      //  # 点击的是完成状态下
      if (row.edit) return;
      //解构数据
      let { id, name } = row;
      // 调接口
      let { data } = await departmentEdit({ id, name });
      //修改成功重新拉数据
      if (data.code === 0) this.getList();
    },

    //删除按钮
    async handleDel(row) {
      //传入id ,删除成功重新拉数据
      let { data } = await departmentDel({ id: row.id });
      if (data.code === 0) this.getList();
    },

    //当前页改变
    handleCurrentChange(page) {
      this.pageData.page = page;
      this.getList();
    },

    //添加分类弹框确认按钮
    //弹框确认
    async dialogAffirm() {
      //解构出表单中的数据
      let { name } = this.form;
      //调接口
      //将state转换为0 / 1
      let { data } = await departmentAdd({ name });
      if (data.code === 0) {
        //关闭弹框
        this.dialogVisible = false;
        //重新获取最新列表数据
        this.getList();
      }
      //清空表单
      this.form = {
        name: "",
      };
    },
  },
};
</script>

<style lang="less" scoped>
.addBtn {
  background: #409eff;
  color: #fff;
  padding: 10px;
  width: 100px;
  height: 30px;
}
.addBtn:hover {
  background: #409eff;
  color: #fff;
  padding: 10px;
  width: 100px;
  height: 30px;
}
.el-pagination {
  margin-top: 15px;
}
.el-input {
  width: 220px;
}
</style>