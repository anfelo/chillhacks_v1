<template>
  <div v-html="rendered"></div>
</template>

<script>
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/base16/tomorrow-night.css";
const md = new MarkdownIt({
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (e) {
        console.error("Failed to highlight string");
      }
    }
    return "";
  }
});
export default {
  props: {
    markdown: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      rendered: md.render(this.markdown)
    };
  }
};
</script>

<style lang="scss" scoped></style>
