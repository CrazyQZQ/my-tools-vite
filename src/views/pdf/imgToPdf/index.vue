<script setup lang="ts">
import { type CSSProperties, computed, ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { baseUrlApi } from "@/api/utils";

defineOptions({
  name: "PermissionButton"
});

const elStyle = computed((): CSSProperties => {
  return {
    width: "85vw",
    justifyContent: "start"
  };
});
const success = ref(false);
const downloadUrl = ref("");
const pdfToOtherFileData = reactive({
  targetType: ""
});

const options = [
  {
    value: "WORD",
    label: "WORD"
  },
  {
    value: "EXCEL",
    label: "EXCEL"
  },
  {
    value: "PPT",
    label: "PPT"
  },
  {
    value: "PNG",
    label: "PNG"
  },
  {
    value: "HTML",
    label: "HTML"
  },
  {
    value: "XML",
    label: "XML"
  }
];

const onSuccess = response => {
  if (response.code == 200) {
    downloadUrl.value = response.data;
    success.value = true;
    ElMessage({
      message: "转换成功",
      type: "success"
    });
  } else {
    ElMessage.error("转换失败");
  }
};
</script>

<template>
  <el-space direction="vertical" size="large">
    <el-tag :style="elStyle" size="large" effect="dark"> 图片转PDF </el-tag>
    <el-card shadow="never" :style="elStyle">
      <el-upload
        class="upload-demo"
        drag
        :action="baseUrlApi('tools/pdf/imgToPdf')"
        multiple
        :show-file-list="false"
        :on-success="onSuccess"
      >
        <el-icon class="el-icon--upload" />
        <div class="el-upload__text">
          拖拽图片到此处或 <em>点击选择图片</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
      <div v-show="success">
        <span>点击下载 </span>
        <el-link type="success" :href="downloadUrl">success</el-link>
      </div>
    </el-card>
    <el-tag :style="elStyle" size="large" effect="dark"> 图片转PDF </el-tag>
    <el-card shadow="never" :style="elStyle">
      <el-row>
        <el-select
          v-model="pdfToOtherFileData.targetType"
          class="m-2"
          placeholder="Select"
          size="large"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-row>
      <el-upload
        class="upload-demo"
        drag
        :action="baseUrlApi('tools/pdf/pdfToFile')"
        multiple
        :data="{ targetType: pdfToOtherFileData.targetType }"
        :show-file-list="false"
        :on-success="onSuccess"
        :disabled="!pdfToOtherFileData.targetType"
      >
        <el-icon class="el-icon--upload" />
        <div class="el-upload__text">拖拽PDF到此处或 <em>点击选择</em></div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
      <div v-show="success">
        <span>点击下载 </span>
        <el-link type="success" :href="downloadUrl">success</el-link>
      </div>
    </el-card>
  </el-space>
</template>
