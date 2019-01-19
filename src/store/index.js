import Vue from "vue";
import Vuex from "vuex";
import channelCenter from "./channelCenter";
import { contentState } from "./state/content";
import { contentMutations } from "./mutations/content";
import { contentActions } from "./actions/content";
//import { handleBreadData, sessionStorageSet } from "@/utils";

Vue.use(Vuex);

const state = {
  navData: [
    {
      label: "首页",
      index: "home",
      children: []
    },
    {
      label: "内容中心",
      index: "content",
      children: []
    },
    {
      label: "渠道中心",
      index: "channelCenter",
      children: [...channelCenter]
    },
    {
      label: "受众中心",
      index: "audienceCenter",
      children: []
    }
  ],
  ...contentState
};
const mutations = {
  ...contentMutations
};
const actions = {
  ...contentActions
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
