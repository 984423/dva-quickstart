import { APPlist, APPRecomendData } from "../services/example";
export default {
  namespace: "IndexPageModel",

  state: {
    viewTable: [],
    recomenData: [],
    hasMore: ""
  },

  subscriptions: {
    setup({ dispatch, history }) {}
  },

  effects: {
    *getApplist({ payload }, { put, select }) {
      const { data } = yield APPlist(payload);
      let strPage=[];

      if(payload.page){
        strPage = data.feed.entry.slice(0, payload.page+10);
      }else{
        strPage = data.feed.entry.slice(0, 10);
      }
      yield put({ type: "save", payload: { viewTable: strPage } });
    },

    *getApplistSchome({ payload }, { put }) {
      const { data } = yield APPlist(payload);
      let searchList = [];
      for (let index of data.feed.entry) {
        searchList = data.feed.entry.filter(
          v => v["title"].label.indexOf(payload.name) > -1
        );
      }
      yield put({ type: "save", payload: { viewTable: searchList } });
    },

    *getAPPRecomendData({ payload }, { put }) {
      const { data } = yield APPRecomendData(payload);
      let TitleList = [];
      let searchList = [];
      let TitleSearch=[];
      searchList = data.feed.entry.filter(
        v => v["title"].label.indexOf(payload.name) > -1
      );
      if(payload.name){
        yield put({ type: "save", payload: { recomenData: searchList } });
      }else{
        yield put({ type: "save", payload: { recomenData: data.feed.entry } });
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
