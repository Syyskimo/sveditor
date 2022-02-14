<script lang="ts">
    import type {PropertyModel} from "../model/types";
    import Switch from '@smui/switch';
    import FormField from '@smui/form-field'

    export let model: PropertyModel;
    export let value;

</script>
{#if (model)}
    <FormField>
        <Switch bind:checked={value} />
        <span slot="label">{model.title}</span>
    </FormField>
{/if}