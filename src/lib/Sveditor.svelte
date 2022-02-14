<script context="module">
    let autoinc = 0;
</script>
<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import {Model} from './model/types';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import 'svelte-material-ui/bare.css';

    export let model: Model;
    export let data;
    let internal;

    let myId = (autoinc++);

    let validationErrors: string[] = [];
    let openError = false;
    const dispatch = createEventDispatcher();

    async function populateComponents(newData) {
        if (!model) {
            return;
        }
        internal = JSON.parse(JSON.stringify(newData));

        for (const property of model.properties) {
            if (!property.svelteComponent && property.component) {
                try {
                    property.svelteComponent = (await import(`./components/${property.component}.svelte`)).default;
                } catch (e) {
                    console.log('Cannot create component: ' + property.component);
                }
            }
        }
        model = model;
    }

    function validate()
    {
        validationErrors = [];
        for (const property of model.properties) {
            if (property.validate) {
                let res = property.validate(internal[property.key]);
                if (!res.validated) {
                    let errorMsg = property.title + ': ' + res.message;
                    validationErrors.push(errorMsg);
                }
            }
        }
        if (model.validate) {
            let res = model.validate(internal);
            if (!res.validated) {
                validationErrors = validationErrors.concat(res.message);
            }
        }
        validationErrors = validationErrors;
        openError = (validationErrors.length > 0);

        return !openError;
    }

    function submitData()
    {
        if (validate()) {
            let response = internal = JSON.parse(JSON.stringify(internal));
            dispatch('save', {
                data: response
            });
        }
    }

    $: populateComponents(data);
</script>
<svelte:head>
    <!-- Material Icons -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <!-- Roboto -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
    <!-- Roboto Mono -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
</svelte:head>
<form on:submit|preventDefault>
{#if model}
{#each model.properties as property}
    {#if property.svelteComponent}
        <div class="mdc-card">
            <svelte:component this={property.svelteComponent} model={property} bind:value="{internal[property.key]}" />
        </div>
    {/if}
{/each}
{/if}
    <Button color="secondary" variant="raised" on:click={submitData}>
        Save changes
    </Button>
</form>
<Dialog bind:open={openError}
        aria-labelledby="focus-title-{myId}"
        aria-describedby="focus-content-{myId}">
    <Title id="focus-title-{myId}">Check following errors</Title>
    <Content id="focus-content-{myId}">
        {#each validationErrors as validationError}
            <p>{validationError}</p>
        {/each}
    </Content>
    <Actions>
        <Button>
            <Label>Okay</Label>
        </Button>
    </Actions>
</Dialog>
<style>
    :global(.mdc-card) {
        padding: 10px;
        margin-bottom: 10px;
    }
</style>