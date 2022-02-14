# Sveditor

A thingy, that may help you deal with random data. Has some in-bread editor-components, but you can create any svelte-component to edit values.

## Usage

1. Import Sveditor
2. Make a model
3. Get data
4. Use Sveditor with given data & model
5. ...
6. PROFIT

## But how?

Easiest way is to clone this repo and start playing with example data:

```bash
git clone https://github.com/Syyskimo/sveditor.git 
# navigate to folder you just cloned
cd sveditor
# install node modules
npm install
# start the server and open the app in a new browser tab
npm run dev -- --open
```

Then check the basic entry-point: `src/routes/index.svelte`

And try playing with it.

## Model

It might be a good idea (though, not mandatory) to use typescript. If you're using such
trying checking `lib/src/model/types | Model`

Model has:
* a name (not used at the moment, but humor me)
* validate -function (optional) that can be used to validate whole object
* properties : an array of actual properties:

Properties (PropertyModel):
* key: actual key (property name) of the value. 
* title: what the component might call this key 
* component (optional): name of component if wanted to use provided svelte material ui -components, see `lib/src/model/types | Component`
* svelteComponent (optional): if you want to create any own component, pass here a svelte-component
* definitions (optional): Non-typed -data for the component. So it's just anything the component might want
* validate (optional): validation function of this property

## Data

Data is just basic object. Might have anything.

For example:

```sveltehtml
<script lang="ts">
    import {Sveditor} from "sveditor";
    import {Model, Component} from "./types";

    let data = {
        id: 1,
        name: 'John',
        age: 25
    }

    // and a model for that might be:
    const model: Model = {
        name: 'person',
        properties: [
            {
                key: 'name',
                title: 'Name',
                component: Component.TextInput,
                validate: (value => {
                    return (value.length > 1 ? {validated: true} : {validated: false, message: 'too short'})
                })
            },
            {
                key: 'age',
                title: 'Give your age',
                component: Component.Slider,
                definitions: {
                    min: 18,
                    max: 99
                }
            },
        ]
    }

</script>

<Sveditor data="{data}" model="{model}" on:save={(x) => {console.log(x)}}/>
```