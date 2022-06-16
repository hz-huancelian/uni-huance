# 介绍
#### collapse 折叠面板 手风琴

# 使用说明
#### import co-collapse from '@/components/co-collapse/co-collapse.vue'
#### components: { co-collapse }

# coCollapse title='折叠面板' class='item-collapse' :check='true' >
# /coCollapse>

# Collapse Props
#### 参数				说明				类型			默认值		可选值
#### title			标题    		String    ''
#### border			边框   		  Boolean   false			true
#### height			高度    		String    '999px'		'100000px'
#### check			默认展开    Boolean    false		true

# 注意事项
#### 插件里面icon 是使用的 uView的icon组件 如有需求，可自行到co-collapse.vue更改

# slot
#### title 
# <template v-slot:title>折叠面板</template>
