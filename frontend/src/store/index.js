import Vue from 'vue'
import Vuex from 'vuex'
import Api from "../services/api"
import router from '@/router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    testStatus: null, // The status of the test in TestTree.vue.
    quiz: {}, // array of data
    dataLength: null, // number of questions
    count: 0, // correct answer counter
    testComponent: null,
    resultMark: null,
    token:''
  },
  getters: {
    quiz: state => state.quiz
  },
  mutations: {
    defineToken (state, token) {
      state.token = token
    },
    changeComponentStatus (state, component) {
      state.testComponent = component
    },
    runTest: (state) => {
      state.testStatus = true
      state.count = 0
    },
    addCount: state => state.count ++,
  },
  actions: {
    playTest: async ({commit, state}) => {
      console.log(this.$route)
      await Api.customApi("get", "/gettest/"+state.token).then(response => {
        state.quiz  = response.data.data;        
      })
      state.dataLength = state.quiz.qsts.length
      // and run the test
      await commit('runTest')
    },
    endTest: async ({commit, state}) => {
      Api.customApi("post", "/endtest",{
        score: state.count
      }).then(response => {
        
               
      })
      state.testComponent = 'result'
      // eslint-disable-next-line
      let results = await commit('showResults')
      results = null
    }
  }
})
