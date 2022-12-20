<template>
  <div>
    <el-card shadow="always">
      <h2>小憩一下</h2>
      <v-md-editor
        :include-level="[3, 4]"
        v-model="text"
        mode="edit"
      ></v-md-editor>
      <v-md-preview :text="text"></v-md-preview>
    </el-card>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const text = ref(`
    喝茶，喝的是一种心境，感觉身心被净化，滤去浮躁，沉淀下的是深思。
    茶是一种情调，一种欲语还休的沉默；一种欲笑还颦的忧伤；一种“千红一杯，万艳同窑”热闹后的落寞。
    茶是对春天记忆的收藏，在任何一季里饮茶，都可以感受到春日那慵懒的阳光。
    坐在一个人的房间，倒上一杯茶，看着茶叶的翻卷也常会生出好多感慨：茶要沸水以后才有浓香，
    人生也要历经磨炼后才能坦然。无论是谁，如果经不起世情冷暖，浮浮沉沉，怕是也品不到人生的浓香。
    你看那茶时，刚冲入水的时候，在水里来回翻滚，不就像初涉世事的我们吗？到处碰壁，遍体鳞伤。
    `)
    return {
      text
    }
  }
})
</script>

<style scoped></style>
