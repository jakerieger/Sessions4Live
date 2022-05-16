<template>
    <div class="input-with-label">
        <label>{{ label }}</label>
        <input type="text" v-model="value" />
    </div>
</template>

<script>
export default {
    name: 'InputWithLabel',
    props: ['label', 'value'],
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
</style>