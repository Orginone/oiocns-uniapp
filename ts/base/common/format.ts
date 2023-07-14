const sizeUnits = ["", "KB", "MB", "GB", "TB", "PB"];
/**
 * 格式化大小
 * @param size 大小
 */
export function formatSize(size: number, unit: string = ""): string {
  if (size > 1024) {
    const index = sizeUnits.indexOf(unit);
    if (index + 2 < sizeUnits.length) {
      return formatSize(
        parseInt((size / 1024.0).toFixed(0)),
        sizeUnits[index + 1]
      );
    }
  }
  return size + unit;
}
/** 编码路径 */
export function encodeKey(key: any): any {
  return base64_encode(unescape(encodeURIComponent(`${key}`)));
}
function base64_encode(str:any) {
  var c1, c2, c3;
  var base64EncodeChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var i = 0,
    len = str.length,
    strs = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      strs += base64EncodeChars.charAt(c1 >> 2);
      strs += base64EncodeChars.charAt((c1 & 0x3) << 4);
      strs += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      strs += base64EncodeChars.charAt(c1 >> 2);
      strs += base64EncodeChars.charAt(
        ((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4)
      );
      strs += base64EncodeChars.charAt((c2 & 0xf) << 2);
      strs += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    strs += base64EncodeChars.charAt(c1 >> 2);
    strs += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
    strs += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
    strs += base64EncodeChars.charAt(c3 & 0x3f);
  }
  return strs;
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
