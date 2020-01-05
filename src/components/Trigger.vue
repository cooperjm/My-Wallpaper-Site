<template>
    <div class="trigger col-12 my-4" ref="trigger" style="position: absolute; bottom: 0;"></div>
</template>

<style>
    .trigger {
    background-color: white;
}
</style>

<script>
export default {
    props: {
        options: {
            type: Object,
            default: function() {
                return {
                    root: null,
                    threshold: ".5",
                    rootMargin: '300px'
                }
            }
        }
    },
    data() {
        return {
            observer: null
        }
    },
    mounted() {
        this.observer = new IntersectionObserver(entries => {
            this.handleIntersect(entries[0]);
        }, this.options);
        this.observer.observe(this.$refs.trigger);
    },

    beforeDestroy() {
        this.observer.disconnect();
    },
    methods: {
        handleIntersect(entry) {
            if(!entry.isIntersecting) {
                return
            }
            this.$emit("triggerIntersected");
        }
    }
}
</script>

