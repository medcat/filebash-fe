import authorization from "Api/authorization";
import request from "Api/request";

export default {
  authorization, request,
  setup() { return authorization.performLoginCheck(); }
};
