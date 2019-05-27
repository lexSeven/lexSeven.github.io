<template>
    <div id="app" class="wrap">
        <BottomLine></BottomLine>
    </div>
</template>

<script>
import BottomLine from './components/BottomLine'
export default {
    name: 'App',
    data () {
        return {
            cityName: '北京',
        }
    },
    methods: {},
    computed: {},
    updated () {},
    mounted () {},
    components: {
        BottomLine
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/comment.css";
@import "~assets/style/qqMusic.css";

</style>
