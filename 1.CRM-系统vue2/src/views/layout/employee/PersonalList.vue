<template>
  <div class="personal-list">
    <!-- 账号列表 -->
    <el-card class="box-card">
      <!-- 1.标题 -->
      <div slot="header" class="clearfix">
        <span>账号列表</span>
      </div>
      <!-- 2.表格 -->
      <el-table
        ref="table"
        :data="tableData"
        height="420"
        size="small"
        @selection-change="selectionChange"
        :style="{ width: tableWidth + 'px' }"
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="department" label="部门"> </el-table-column>

        <el-table-column prop="tel" label="手机号"> </el-table-column>
        
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{
            scope.row.joindate | handleTime
          }}</template>
        </el-table-column>

        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handEdit(scope.row)"
              >编辑</el-button
            >

            <!-- 气泡删除提示 -->
            <el-popconfirm title="确定删除吗？" @confirm="handDel(scope.row)">
              <el-button slot="reference" size="small" type="danger"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 3.分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.page"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
      >
      </el-pagination>

      <el-button size="small" type="danger" @click="batchDel"
        >批量删除</el-button
      >
      <el-button size="small" @click="deselect">取消选择</el-button>
    </el-card>
    
    <!-- 会话框 -->
    <el-dialog title="账号编辑" :visible.sync="dialogVisible" width="400px">
      <!-- 会话框表单内容区域 -->
      <!-- 内容 -->
      <el-form :model="editForm" label-width="100px">
        <!-- 账号 -->
        <el-form-item label="姓名">
          <el-input type="text" v-model="editForm.username"></el-input>
        </el-form-item>
      
        <!-- 账号 -->
        <el-form-item label="手机号">
          <el-input type="text" v-model="editForm.tel"></el-input>
        </el-form-item>
        <!-- 账号 -->
        <el-form-item label="创建时间">
          <el-input  type="text" v-model="editForm.joindate"></el-input>
        </el-form-item>

        <!-- 用户组 -->
        <el-form-item label="所属部门">
          <el-select v-model="editForm.department" placeholder="请选择活动区域">
            <el-option label="项目一部" value="项目一部"></el-option>
            <el-option label="项目二部" value="项目二部"></el-option>
            <el-option label="行政部" value="行政部"></el-option>
            <el-option label="财务部" value="财务部"></el-option>
            <el-option label="商务部" value="商务部"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="
            dialogVisible = false;
            affirmEdit();
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { usersList, usersEdit, usersDel, usersDelall } from "@/api/employee";
import tableWidthMixin from "@/mixins/tableWidthMixin";
import {handleTime} from "@/utils/date";

export default {
   mixins: [tableWidthMixin],

  data() {
    return {
      // 表格数据
      tableData: [],
      //分页数据
      pageData: {
        //当前页码
        page: 1,
        //每条页数
        pageSize: 10,
      },
      //分页总条数
      pageTotal: 0,
      //弹窗是否显示
      dialogVisible: false,
      //对话框表格
      editForm: {
        username: "",
        password: "",
        tel: "",
        joindate: "",
        department: "",

      },
      ids: "",
    };
  },
  created() {
    // 进入页面获取列表数据
    this.getList();
  },
  methods: {
    async getList() {
      //调接口
      let { data } = await usersList(this.pageData);
      //  # 判断当前是否有数据,并且不是第一页
      if (!data.datalength == 0 && this.pageData.page != 1) {
        //向前一页拉取数据渲染
        this.pageData.page -= 1;
        this.getList();
      }
      //存列表数据
      this.tableData = data.data;
      //存总条数
      this.pageTotal = data.total;
    },

    //编辑按钮
    handEdit(row) {
      console.log(row);
      //显示对话框
      this.dialogVisible = true;
      //将当前行数据赋值给表单数据绑定
      this.editForm.username = row.username;
      this.editForm.department = row.department;
      this.editForm.password = row.password;
      this.editForm.joindate = handleTime(row.joindate);
      this.editForm.tel = row.tel;
      this.editForm.id = row.id;
    },
    //会话框确认按钮
    affirmEdit() {
      usersEdit(this.editForm).then((res) => {
        //请求成功
        if (res.data.code === 0) {
          //关闭弹框
          this.dialogVisible = false;
         
          //再次拉取修改后的表单数据
          this.getList();
        }
      });
    },
    //删除按钮
    async handDel(row) {
      console.log(row.id);
      let { data } = await usersDel({ id: row.id });

      if (data.code === 0) {
        
        //删除之后重新获取数据
        this.getList();
      }
    },
    //pageSize 改变时会触发
    handleSizeChange(size) {
      this.pageData.pageSize = size;
      // # 每页条数改变时调用
      this.getList();
    },

    //当前第几页
    handleCurrentChange(page) {
      this.pageData.page = page;
      //改变当前页后 再次获取新页码对应的新数据
      this.getList();
    },
    //批量删除
    batchDel() {
      if (!this.ids.length) return;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //点确定后再做删除操作
          let { data } = await usersDelall({ ids: JSON.stringify(this.ids) });
          if (data.code === 0) {
           
            //批量删除后重新拉取最新的列表数据
            this.getList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //取消选择
    deselect() {
      this.$refs.table.clearSelection();
    },
    //表格多选发生变化时触发
    selectionChange(selection) {
      // 拿到这些数据的id并组合成数组
      this.ids = selection.map((v) => v.id);
    },
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin: 10px 0;
}
.el-input {
  width: 222px;
}
.el-button {
  margin-right: 10px;
}
</style>