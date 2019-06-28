export const Titles = [
    '教授',
    '副教授',
    '讲师',
    '助教',
    '其他正高级',
    '其他副高级',
    '其他中级',
    '其他初级',
    '未评级',
];

export const Offices = [
    '校长',
    '副校长',
    '处长',
    '副处长',
    '院长/部长/主任',
    '副院长/副部长/副主任',
    '系主任/专业负责人',
    '院长助理/部长助理',
    '实验室负责人',
    '其他',
    '无',
];

export const Disciplines = [
    { title: '哲学', majors: ['哲学'] },
    { title: '经济学', majors: ['理论经济学', '应用经济学', '金融（专业学位）', '应用统计（专业学位）', '税务（专业学位）', '国际商务（专业学位）', '保险（专业学位）', '资产评估（专业学位）', '审计（专业学位）'] },
    { title: '法学', majors: ['法学', '政治学', '社会学', '民族学', '马克思主义理论', '公安学', '法律（专业学位）', '社会工作（专业学位）', '警务（专业学位）'] },
    { title: '教育学', majors: ['教育学', '心理学（可授教育学、理学学位）', '体育学', '教育（专业学位）', '体育（专业学位）', '汉语国际教育（专业学位）', '应用心理（专业学位）'] },
    { title: '文学', majors: ['中国语言文学', '外国语言文学', '新闻传播学', '翻译（专业学位）', '新闻与传播（专业学位）', '出版（专业学位）'] },
    { title: '历史学', majors: ['考古学', '中国史', '世界史', '文物与博物馆（专业学位）'] },
    { title: '理学', majors: ['数学', '物理学', '化学', '天文学', '地理学', '大气科学', '海洋科学', '地球物理学', '地质学', '生物学', '系统科学', '科学技术史', '生态学', '统计学'] },
    {
        title: '工学',
        majors: ['力学', '机械工程', '光学工程', '仪器科学与技术', '材料科学与工程', '冶金工程', '动力工程及工程热物理', '电气工程', '电子科学与技术', '信息与通信工程', '控制科学与工程', '计算机科学与技术',
            '建筑学', '土木工程', '水利工程', '测绘科学与技术', '化学工程与技术', '地质资源与地质工程', '矿业工程', '石油与天然气工程', '纺织科学与工程', '轻工技术与工程', '交通运输工程', '船舶与海洋工程',
            '航空宇航科学与技术', '兵器科学与技术', '核科学与技术', '农业工程', '林业工程', '环境科学与工程', '生物医学工程', '食品科学与工程', '城乡规划学', '风景园林学', '软件工程', '生物工程', '安全科学与工程',
            '公安技术', '建筑学（专业学位）', '工程（专业学位）', '城市规划（专业学位）'],
    },
    {
        title: '农学',
        majors: ['作物学', '园艺学', '农业资源与环境', '植物保护', '畜牧学', '兽医学', '林学', '水产', '草学', '农业推广（专业学位）', '兽医（专业学位）', '风景园林（专业学位）', '林业（专业学位）'],
    },
    {
        title: '医学',
        majors: ['基础医学', '临床医学', '口腔医学', '公共卫生与预防医学', '中医学', '中西医结合', '药学', '中药学', '特种医学', '医学技术', '护理学', '临床医学（专业学位）', '口腔医学（专业学位）',
            '公共卫生（专业学位）', '护理（专业学位）', '药学（专业学位）', '中药学（专业学位）'],
    },
    { title: '军事学', majors: ['军事思想及军事历史', '战略学', '战役学', '战术学', '军队指挥学', '军制学', '军队政治工作学', '军事后勤学', '军事装备学', '军事训练学', '军事（专业学位）'] },
    {
        title: '管理学',
        majors: ['管理科学与工程', '工商管理', '农林经济管理', '公共管理', '图书情报与档案管理', '工商管理（专业学位）', '公共管理（专业学位）', '会计（专业学位）', '旅游管理（专业学位）',
            '图书情报（专业学位）', '工程管理（专业学位）'],
    },
    { title: '艺术学', majors: ['艺术学理论', '音乐与舞蹈学', '戏剧与影视学', '美术学', '设计学', '艺术（专业学位）'] },
];

export const Degrees = ['大专', '本科', '硕士', '博士'];

export const PropertyComment = {
    name: '项目名称',
    subtypeId: '项目类别',
    level: '项目等级',
    email: 'Email',
    title: '职称',
    degree: '学位',
    office: '职务',
    departmentId: '单位',
    originId: '项目来源',
    phone: '电话',
    content: '主要内容',
    achievements: '预期成果',
};

export class ProjectForm {
    id: number;
    reviewTaskId: number;
    principalId: string;
    principalName: string;
    title: string;
    degree: string;
    email: string;
    discipline: string;
    major: string;
    direction: string;
    departmentId: string;
    departmentName: string;
    office: string;
    phone: string;
    name: string;
    urls: string;
    subtypeId: number;
    subtype: string;
    level: string;
    originId: number;
    origin: string;
    members: string;
    status: string;
    content: string;
    achievements: string;
    other: string;
    departmentConclusion: string;
    departmentOpinion: string;
    conclusionOfUniversity: string;
    conclusionOfProvince: string;
    opinionOfUniversity: string;
    isValidDate: boolean;
    countExpert: number;
    workflowInstanceId: string;
    memberList: any[];
    expertReview: any[];
    reportType: number;
    mainInfoForm: string;
    proofFile: string[];
    summaryReport: string;
    locked: boolean;
    projectStatus: string;
    code: string;
    dateStarted: string;
    middleYear: number;
    knotYear: number;
    relationReportTypes: any;
    fileTypes: any[];

    constructor(dto: any) {
        Object.assign(this, dto);
        this.reviewTaskId = dto.taskId;
        this.memberList = [];
        for (let i = 0; i < 6; i++) {
            this.memberList.push({ value: '' });
        }
        if (this.members) {
            const memberArray = this.members.split(';');
            memberArray.forEach((item, index) => {
                if (index < 6) { // 最多允许6个参与人
                    this.memberList[index].value = item;
                }
            });
        }
        this.relationReportTypes = dto.relationReportTypes;
    }

    tranFile(fileType: any[]) {
        this.fileTypes = fileType;
        this.fileTypes.forEach((item: any) => {
            switch (item.prefix) {
                case 'main':
                    item.names = this.mainInfoForm ? [this.mainInfoForm] : [];
                    break;
                case 'proof':
                    item.names = this.proofFile ? this.proofFile : [];
                    break;
                case 'summary':
                    item.names = this.summaryReport ? [this.summaryReport] : [];
            }
        });
    }
}
