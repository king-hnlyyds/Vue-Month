import { mapState } from "vuex";
export default {
    data() {
        return {
            //表格宽度
            tableWidth: document.body.clientWidth - 300,
        }
    },
    created() {
        //绑定窗口大小改变事件
        window.addEventListener("resize", this.handleTableWidth);
    },
    //销毁组件
    destroyed() {
        window.removeEventListener("resize", this.handleTableWidth);
    },
    methods: {
        //计算表格宽度(折叠状态)
        handleTableWidth() {
            this.tableWidth = document.body.clientWidth - (this.isCollapse ? 160 : 300);
        },
    },
    computed: {
        //折叠状态
        ...mapState(["isCollapse"])
    },
    watch: {
        isCollapse() {
            console.log(123123)
            this.handleTableWidth()
        }
    }
}