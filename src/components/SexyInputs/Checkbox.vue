<template>
    <div></div>
    <div class="d-flex mb-2">
        <div class="round">
            <input type="checkbox" :id="id" :value="modelValue" @change="updateValue" />
            <label :for="id"></label>
        </div>
        <label class="ms-4" :for="id" style="cursor: pointer"><slot name="text"></slot></label>
    </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = withDefaults(
    defineProps<{
        modelValue: boolean
        id?: string
    }>(),
    {
        id: JSON.stringify(Math.random()),
    }
)
const { modelValue } = toRefs(props)
function updateValue() {
    emit('update:modelValue', !modelValue.value)
}
</script>
<style scoped lang="scss">
.round {
    position: relative;
}
.round label {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 28px;
    left: 0;
    position: absolute;
    top: 0;
    width: 28px;
}
.round label:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: '';
    height: 6px;
    left: 7px;
    opacity: 0;
    position: absolute;
    top: 8px;
    transform: rotate(-45deg);
    width: 12px;
}
.round input[type='checkbox'] {
    visibility: hidden;
}
.round input[type='checkbox']:checked + label {
    background-color: #66bb6a;
    border-color: #66bb6a;
}
.round input[type='checkbox']:checked + label:after {
    opacity: 1;
}
</style>
