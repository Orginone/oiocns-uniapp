export default {
	getIndex (data,key){
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.key == key.replace(/^"|"$/g, '')) {
                return i;
            }
        }
        return -1; // 如果没有找到匹配的对象，返回 -1 表示失败
    }
}
