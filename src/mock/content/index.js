import base from "@/api/base";
import Mock from "mockjs";

import { getGroup } from "./data";

export default Mock.mock(`${base}/content_group/getContentGroupList`, getGroup);
