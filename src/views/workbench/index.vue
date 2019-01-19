<template>
  <section class="content">
    <div class="workbench">
      <!-- 营销事件 -->
      <marketing />
      <!-- 关键要素 -->
      <key-elements />
      <!-- 内容及场景应用 -->
      <content-and-sence />
      <!-- 营销配置 -->
      <configure />
    </div>
  </section>
</template>

<script>
import marketing from "@/components/private/workbench/marketing";
import KeyElements from "@/components/private/workbench/key-elements";
import ContentAndSence from "@/components/private/workbench/content-and-sence";
import configure from "@/components/private/workbench/configure";
export default {
  components: {
    marketing,
    "key-elements": KeyElements,
    "content-and-sence": ContentAndSence,
    configure
  }
};
</script>

<style lang="scss" scope>
.workbench {
  padding: 0 30px;
  background: #ffffff;

  .title {
    font-weight: 400;
    color: rgba(89, 87, 87, 1);
    font-size: 14px;
    margin-bottom: 15px;
    padding-top: 40px;
  }

  .list {
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.2);
    padding: 30px 0;
    display: flex;

    .el-col-8 {
      //   flex: 1;
      text-align: right;
      min-width: 70px;
    }

    div {
      //   padding-left: 20px;
      flex: 2;

      p {
        font-size: 16px;
        color: rgba(44, 44, 44, 1);
      }

      span {
        font-size: 12px;
        color: rgba(137, 137, 137, 1);
      }
    }
  }

  > div:last-child {
    padding-bottom: 60px;
  }
}
</style>
