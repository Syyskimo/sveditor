<script lang="ts">
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text';
    import type {PropertyModel} from "../model/types";

    export let model: PropertyModel;
    export let value;

    let invalid = false;
    let errorMsg = '';

    function validate(val) {
        if (model.validate == null) {
            errorMsg = '';
            invalid = false;
        } else {
            let res = model.validate(val);
            invalid = !res.validated;
            errorMsg = Array.isArray(res.message) ? res.message.join(', ') : res.message;
        }
    }
    $: validate(value);
</script>
{#if (model)}
    <Textfield invalid={invalid}  bind:value={value} label="{model.title}" >
        <HelperText validationMsg slot="helper">
            {errorMsg}
        </HelperText>
    </Textfield>
{/if}