<template>
  <div class="secondNav">
    <dl class="navList">
      <dt class="title">{{navTitle}}</dt>
      <template>
        <dd
          v-for="(item,index) in secondNavData"
          :key="index"
          @click="handleRoute(index)"
          :class="{'bgColor':isActive[index]}"
        >
          {{item.meta.breadData}}

        </dd>
      </template>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: [false, false, false, false, false, false, false, false]
    };
  },
  props: {
    secondNavData: {
      type: Array
    },
    navTitle: {
      type: String
    }
  },
  methods: {
    handleRoute(index) {
      this.$emit("switchSecondNav", index, this.secondNavData);
      if (this.secondNavData[index].path === this.$route.path) {
        this.isActive = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ];
        this.$set(this.isActive, index, true);
      }
    }
  },
  created() {
    //console.log(this.navData, "navData===========");
  },
  mounted() {}
};
</script>

<style lang='scss'>
.secondNav {
  .bgColor {
    background: #f2faff;
    border-right: 1px solid #34a4dd;
  }
  .navList {
    dd {
      display: block;
      font-size: 14px;
      margin-bottom: 6px;
      cursor: pointer;
      text-align: left;
      line-height: 30px;
      padding-left: 10px;
      a {
        color: #2c2c2c;
        display: block;
      }
    }
    dd:hover {
      background: #f2faff;
      border-right: 1px solid #34a4dd;
    }
    .title {
      color: #2c2c2c;
      font-size: 12px;
      line-height: 28px;
      margin-bottom: 16px;
      text-align: left;
      font-weight: 800;
      padding-left: 10px;
    }
  }
}
</style>
