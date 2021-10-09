export const Business = ['排课', '排考', '场地日常管理', '其他'];
export const Color = ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan', 'gray-500'];
export class LabelForm {
    name: string;
    business: string;
    typeId: number;
    typeName: string;
    color: string;
    single: boolean;
    multiSelect: boolean;
    constructor() {
        this.single = true;
        this.multiSelect = true;
    }
}
