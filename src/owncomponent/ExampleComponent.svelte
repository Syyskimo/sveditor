<script lang="ts">
    import {PropertyModel} from "$lib/model/types";

    export let model: PropertyModel;
    export let value;
</script>
<div class="wrap">
    <h2>{model.title} : {value}</h2>
    <div>This is an example of totally own component</div>
</div>
<style>
    h2 {
        color: red;
    }
</style>