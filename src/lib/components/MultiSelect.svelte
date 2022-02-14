<script lang="ts">
    import SegmentedButton, { Segment } from '@smui/segmented-button';
    import { Label } from '@smui/common';
    import type {PropertyModel} from "../model/types";

    export let model: PropertyModel;
    export let value;

</script>
{#if (model && model.definitions.options)}
    <h3>{model.title}</h3>
    <SegmentedButton segments={model.definitions.options} let:segment bind:selected={value}>
        <Segment {segment}>
            <Label>{segment}</Label>
        </Segment>
    </SegmentedButton>
{/if}