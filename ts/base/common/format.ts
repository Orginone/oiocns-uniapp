const sizeUnits = ['', 'KB', 'MB', 'GB', 'TB', 'PB'];
/**
 * 格式化大小
 * @param size 大小
 */
export function formatSize(size: number, unit: string = ''): string {
  if (size > 1024) {
    const index = sizeUnits.indexOf(unit);
    if (index + 2 < sizeUnits.length) {
      return formatSize(parseInt((size / 1024.0).toFixed(0)), sizeUnits[index + 1]);
    }
  }
  return size + unit;
}
/** 编码路径 */
export function encodeKey(key: string): string {
  return btoa(unescape(encodeURIComponent(`${key}`)));
}

/** 将文件切片 */
export function sliceFile(file: Blob, chunkSize: number): Blob[] {
  const slices: Blob[] = [];
  let index = 0;
  while (index * chunkSize < file.size) {
    var start = index * chunkSize;
    var end = start + chunkSize;
    if (end > file.size) {
      end = file.size;
    }
    slices.push(file.slice(start, end));
    index++;
  }
  return slices;
}
/** 将文件读成url */
export function blobToDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(btoa(reader.result as string));
    };
    reader.readAsBinaryString(file);
  });
}

/** 将文件读成字节数组 */
export function blobToNumberArray(file: Blob): Promise<number[]> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const arr = new Uint8Array(reader.result as ArrayBuffer);
      resolve(Array.from<number>(arr.values()));
    };
    reader.readAsArrayBuffer(file);
  });
}
