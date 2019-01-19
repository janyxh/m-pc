import moment from "moment";

export default {
  timestampToDate(timestamp) {
    return moment(timestamp).format("YYYY-MM-DD HH:mm");
  }
};
