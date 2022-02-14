<script lang="ts">
    import Sveditor from "$lib/Sveditor.svelte";
    import type {Model} from "$lib/model/types";
    import {Component} from "$lib/model/types";
    import ExampleComponent from "../owncomponent/ExampleComponent.svelte";

    const personModel: Model = {
        // This not used at the moment, but who cares :D
        name: 'person',
        // full object validation: validations that are related to whole object
        validate: (value => {
            let errors = [];
            if (value.characterClass == 'Wizard' && value.intelligence < 10) {
                errors.push('Wizard cannot be that silly!');
            }
            if (value.characterClass == 'Barbarian' && value.strength < 12) {
                errors.push('Barbarian MUST be stronger than that!');
            }
            if (value.skills.includes('Hacking') && value.intelligence < 10) {
                errors.push('Hacking requires an minimum intelligence of 10!');
            }
            if (value.skills.includes('Hacking') && value.strength > 9) {
                errors.push('Chads can\'t be hackers: lower your strength or expectations!');
            }
            return {
                validated: errors.length == 0,
                message: errors
            }
        }),
        // The properties: these are PropertyModels
        properties: [
            {
                key: 'id',
                title: 'Id',
                svelteComponent: ExampleComponent
            },
            {
                key: 'firstname',
                title: 'First name, if you please',
                component: Component.TextInput,
                validate: (value => {
                    return (value.length > 3 ? {validated: true} : {validated: false, message: 'too short'})
                })
            },
            {
                key: 'lastname',
                title: 'Last name, if you please',
                component: Component.TextInput,
                validate: (value => {
                    return (value.length > 3 ? {validated: true} : {validated: false, message: 'too short'})
                })
            },
            {
                key: 'story',
                title: 'Story of your life',
                component: Component.TextArea,
                validate: (value => {
                    return (value.length > 2 ? {validated: true} : {validated: false, message: 'There has to be more!'})
                })
            },
            {
                key: 'skills',
                title: 'Choose your skills',
                component: Component.MultiSelect,
                definitions: {
                    options: ['Hacking', 'Ninjutsu', 'Sneaking', 'Twerking', 'Licking own elbow'],
                }
            },
            {
                key: 'characterClass',
                title: 'Your character class',
                component: Component.SingleSelect,
                definitions: {
                    options: ['Barbarian', 'Wizard', 'Priest', 'Hamster']
                }
            },
            {
                key: 'likeCheese',
                title: 'Do you like cheese?',
                component: Component.CheckBox,
            },
            {
                key: 'intelligence',
                title: 'How smart is your character?',
                component: Component.Slider,
                definitions: {
                    min: 3,
                    max: 18
                }
            },
            {
                key: 'strength',
                title: 'How about strength? Do you even lift, bro?',
                component: Component.Slider,
                definitions: {
                    min: 3,
                    max: 18
                }
            },
        ]
    }

    let person = {
        id: 1234,
        firstname: 'Johnnie',
        lastname: 'Walker',
        story: '',
        skills: ['Hacking'],
        characterClass: 'Priest',
        likeCheese: false,
        intelligence: 9,
        strength: 12
    }
    let another = {
        id: 5678,
        firstname: 'Roxanne',
        lastname: 'Rough-Hair',
        story: 'N/a',
        skills: [],
        characterClass: 'Barbarian',
        likeCheese: true,
        intelligence: 8,
        strength: 16
    }

</script>
<h1 class="wrap">Welcome to the Sveditor!</h1>
<p class="wrap">Successful save will push proper object to console. Have a look.</p>
<div class="wrap">
    <Sveditor model={personModel} data={person} on:save={(x) => {console.log(x.detail.data)}} />
    <Sveditor model={personModel} data={another} on:save={(x) => {console.log(x.detail.data)}} />
</div>
<style>
    .wrap {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        max-width: 1024px;
        margin: auto;
    }
    @media only screen and (max-width: 800px) {
        .wrap {
            flex-direction: column;
        }
    }
</style>
