<script lang="ts">
    import Slider from '@smui/slider';
    import FormField from '@smui/form-field'
    import type {PropertyModel} from "../model/types";

    export let model: PropertyModel;
    export let value;
</script>
{#if (model && model.definitions.min !== null && model.definitions.max != null)}
    <FormField align="end" style="display: flex;">
        <Slider style="flex-grow: 1;" min="{model.definitions.min}" max="{model.definitions.max}" bind:value={value} />
        <span slot="label" style="padding-right: 12px; width: max-content; display: block;">
            {model.title}
        </span>
    </FormField>
    <pre class="status">Value: {value}</pre>
{/if}