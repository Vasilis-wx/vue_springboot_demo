<template>
  <div v-if="!item.hidden && item.children" class="menu-wrapper">

    <template v-if="hasOneShowingChild(item.children) && !onlyOneChild.children">
      <a :href="onlyOneChild.path" target="_blank" @click="clickLink(onlyOneChild.path,$event)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.iconCls" :title="generateTitle(onlyOneChild.meta.title)" />
        </el-menu-item>
      </a>
    </template>

    <el-submenu v-else :index="item.path">
      <template slot="title">
        <item :icon="item.iconCls" :title="generateTitle(item.meta.title)" />
      </template>

      <template v-for="child in item.children">
        <sidebar-item v-if="child.children&&child.children.length>0" :item="child" :key="child.path" :base-path="resolvePath(child.path)" class="nest-menu" />

        <a v-else :href="child.path" :key="child.name" target="_blank" @click="clickLink(child.path,$event)">
          <el-menu-item :index="resolvePath(child.path)">
            <item :icon="child.iconCls" :title="generateTitle(child.meta.title)" />
          </el-menu-item>
        </a>
      </template>
    </el-submenu>

  </div>
</template>

<script>
import path from 'path'
import { generateTitle } from '@/utils/i18n'
// import { validateURL } from '@/utils/validate'
import Item from './Item'

export default {
  name: 'SidebarItem',
  components: { Item },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  mounted () {
  },
  data () {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild (children) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // temp set(will be used if only has one showing child )
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    resolvePath (routePath) {
      return path.resolve(routePath)
    },
    // isExternalLink (routePath) {
    //   return validateURL(routePath)
    // },
    clickLink (routePath, e) {
      // if (!this.isExternalLink(routePath)) {
      e.preventDefault()
      const path = this.resolvePath(routePath)
      this.$router.push(path)
      // }
    },
    generateTitle
  }
}
</script>

<style>
  .siderBarClass .el-menu--collapse {
    width: 50px;
  }
</style>
