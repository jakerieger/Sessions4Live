<template>
    <div class="input-with-label">
        <label v-if="!icon">{{ label }}</label>
        <label v-else><i :class="'mdi mdi-' + label" :style="{ 'font-size': '18pt' }" /></label>
        <input type="text" v-model="value" :placeholder="placeholder" />
    </div>
</template>

<script>
export default {
    name: 'InputWithLabel',
    props: {
        label: String,
        value: String,
        placeholder: String,
        icon: Boolean,
    },
}
</script>

<style>
.input-with-label {
    background: var(--BUTTON);
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.input-with-label input {
    background: none;
    outline: none;
    border: none;
    font-size: 1.2em;
    width: 100%;
    padding: 10px;
    color: var(--TEXT);
}

.input-with-label label {
    background: var(--SECONDARY);
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    color: var(--HIGHLIGHT);
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
}

.input-with-label input::placeholder {
    font-weight: 200;
    font-style: italic;
}
</style>