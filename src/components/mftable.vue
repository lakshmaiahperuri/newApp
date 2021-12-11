<template>
  <div id="table">
    <o-table
      clickable
      ref="table"
      :data="tableData"
      customRowKey="_id"
      :isLoading="isLoading"
      :sticky-headers="tableProps.stickeyHeaders"
    >
      <o-table-column
        v-for="field in tableProps.fields"
        :key="field.id"
        :field="field.id"
        :visible="field.visible"
        :label="field.title"
        :width="field.width"
        :sortable="Boolean(field.sortField)"
        :sticky="field.sticky"
        v-bind="field"
      >
        <template v-if="isFieldComponent(field.name)" v-slot="props">
          <component
            :is="field.name"
            :key="field.id"
            :row-data="props.row"
            :row-index="props.index"
            :row-field="field"
            :class="bodyClass('vuetable-component', field)"
            @cell-clicked="tableCellClicked"
          ></component>
        </template>
        <template v-else-if="isFieldSlot(field.name)" v-slot="props">
          <div :key="field.id">
            <slot
              :name="field.name"
              :row-data="props.row"
              :row-index="props.index"
              :row-field="field"
            ></slot>
          </div>
        </template>
        <template v-else v-slot="props">
          <div
            :class="bodyClass('vuetable-td-' + field.name, field)"
            :key="field.id"
            v-html="renderNormalField(field, props.row)"
          ></div>
        </template>
      </o-table-column>
    </o-table>
  </div>
</template>
<script>
import {
  defineComponent, onMounted, reactive, toRefs, resolveDynamicComponent,
} from 'vue';

export default defineComponent({
  name: 'Mftable',
  props: {
  },
  components: {
  },
  setup({ rowData }) {
    const toast = useToast();
    const state = reactive({
      tableData: [],
      tableProps: tableDefinition,
      isLoading: false,
    });
    const bodyClass = (base, field) => [base, field.dataClass];
    const hasFormatter = (item) => typeof item.formatter === 'function';
    const getObjectValue = (objec, path, defaultValue) => {
      defaultValue = typeof defaultValue === 'undefined' ? null : defaultValue;
      let obj = object;
      if (path.trim() !== '') {
        const keys = path.split('.');
        keys.forEach((key) => {
          if (
            obj !== null
            && typeof obj[key] !== 'undefined'
            && obj[key] !== null
          ) {
            obj = obj[key];
          } else {
            obj = defaultValue;
          }
        });
      }
      return obj;
    };
    const callFormatter = (field, item) => {
      if (!hasFormatter(field)) return;
      if (typeof field.formatter === 'function') {
        return field.formatter(getObjectValue(item, field.name));
      }
    };
    const renderNormalField = (field, item) => (hasFormatter(field)
      ? callFormatter(field, item)
      : getObjectValue(item, field.name, ''));
    onMounted(async () => {
    });
    const isFieldComponent = (fieldName) => {
      if (typeof resolveDynamicComponent(fieldName) !== 'string') {
        return true;
      }
      return false;
    };
    async function tableCellClicked(params) {
      const { type, data } = params;
      if (type === 'edit') {
        set(data, 'detailRowEditing', true);
        set(data, '_beforeEdit', cloneDeep(data));
      } else if (type === 'cancel') {
        Object.assign(data, data._beforeEdit);
        set(data, 'detailRowEditing', !data.detailRowEditing);
      } else if (type === 'save') {
        sendPowerBiReport(data);
      }
    }
    return {
      ...toRefs(state),
      updateSqlForm,
      isFieldComponent,
      bodyClass,
      renderNormalField,
      tableCellClicked,
    };
  },
});
</script>