<template>
  <div id="mountNode" class="container">

  </div>
</template>

<script>
import G6 from '@antv/g6'
import { getStartJson } from '@/api/start'

export default {
  name: 'Start',
  data () {
    return {
      graph: null,
      topoData: {
        // 点集
        nodes: [{
          id: 'node1', // String，该节点存在则必须，节点的唯一标识
          x: 100, // Number，可选，节点位置的 x 值
          y: 200 // Number，可选，节点位置的 y 值
        }, {
          id: 'node2', // String，该节点存在则必须，节点的唯一标识
          x: 300, // Number，可选，节点位置的 x 值
          y: 200 // Number，可选，节点位置的 y 值
        }],
        // 边集
        edges: [{
          source: 'node1', // String，必须，起始点 id
          target: 'node2' // String，必须，目标点 id
        }]
      }
    }
  },
  mounted () {
    getStartJson().then(res => {
      debugger
    }).catch(e => {
      debugger
    })
    this.init()
  },
  computed: {
    containerWidth () {
      const container = document.getElementById('mountNode')
      return container.clientWidth
    },
    containerHeight () {
      const container = document.getElementById('mountNode')
      return container.clientHeight
    }
  },
  methods: {
    init () {
      debugger
      this.graph = new G6.Graph({
        container: 'mountNode',
        width: 800,
        height: 500
      })
      // 读取数据
      this.graph.data(this.topoData)
      // 渲染图
      this.graph.render()
    }
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%
  }
</style>
