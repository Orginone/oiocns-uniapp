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
  return base64_encode(unescape(encodeURIComponent(`${key}`)));
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
      resolve(base64_encode(reader.result as string));
    };
    reader.readAsBinaryString(file);
  });
}
function base64_encode(str:string){
    var c1, c2, c3;
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var i = 0, len = str.length, string = '';
  
    while (i < len) {
      c1 = str.charCodeAt(i++) & 0xff;
      if (i == len) {
        string += base64EncodeChars.charAt(c1 >> 2);
        string += base64EncodeChars.charAt((c1 & 0x3) << 4);
        string += "==";
        break;
      }
      c2 = str.charCodeAt(i++);
      if (i == len) {
        string += base64EncodeChars.charAt(c1 >> 2);
        string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        string += base64EncodeChars.charAt((c2 & 0xF) << 2);
        string += "=";
        break;
      }
      c3 = str.charCodeAt(i++);
      string += base64EncodeChars.charAt(c1 >> 2);
      string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
      string += base64EncodeChars.charAt(c3 & 0x3F)
    }
    return string
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
import pako from 'pako';

/** 字符串压缩解压缩 */
export class StringPako {
  /**
   * 解压缩
   * @param input 输入字符串（明文）
   */
  public static inflate(input: string) {
    if (input.startsWith('^!:')) {
      try {
        input = atob(input.substring(8, input.length - 5).replaceAll('*', '='));
        let output = this.arrToString(pako.inflate(this.stringToArr(input)));
        return decodeURIComponent(output);
      } catch (err) {
        return input;
      }
    }
    return input;
  }
  /**
   * 压缩
   * @param input 输入字符串（密文）
   */
  public static deflate(input: string) {
    input = encodeURIComponent(input);
    let output = base64_encode(this.arrToString(pako.deflate(input)));
    return '^!:' + this.randomStr(5) + output.replaceAll('=', '*') + this.randomStr(5);
  }
  /**
   * 数组转字符串
   * @param arr 数组
   * @returns 字符串
   */
  private static arrToString(arr: Uint8Array) {
    var dataString = '';
    for (var i = 0; i < arr.length; i++) {
      dataString += String.fromCharCode(arr[i]);
    }
    return dataString;
  }
  /**
   * 字符串转数组
   * @param str 字符串
   * @returns 数组
   */
  private static stringToArr(str: string) {
    var arr = [];
    for (var i = 0, j = str.length; i < j; ++i) {
      arr.push(str.charCodeAt(i));
    }
    var tmpUint8Array = new Uint8Array(arr);
    return tmpUint8Array;
  }
  /**
   * 生成随机字符串
   * @param num 长度
   * @returns 随机字符串
   */
  private static randomStr(len: number) {
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var str = '';
    for (var i = 0, j = len; i < j; ++i) {
      str += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
  }
}
