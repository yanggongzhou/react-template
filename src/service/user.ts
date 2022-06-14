import Service from "@/utils/axios";

export const getUserInfo = async () => await Service.post('/script-editor/entry/4002');
