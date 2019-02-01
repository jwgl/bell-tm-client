export const FileTypes = [{
    reviewType: 1,
    fileType: [{
        prefix: 'main', label: '申报书', types: ['pdf', 'doc', 'docx'],
    }, {
        prefix: 'proof', label: '主要佐证材料', types: ['pdf', 'doc', 'docx'],
    }],
}, {
    reviewType: 2,
    fileType: [{
        prefix: 'main', label: '年度验收表', types: ['pdf', 'doc', 'docx'],
    }, {
        prefix: 'proof', label: '主要佐证材料', types: ['pdf', 'doc', 'docx'],
    }],
}, {
    reviewType: 3,
    fileType: [{
        prefix: 'main', label: '中期验收表', types: ['pdf', 'doc', 'docx'],
    }, {
        prefix: 'proof', label: '主要佐证材料', types: ['pdf', 'doc', 'docx'],
    }, {
        prefix: 'summary', label: '总结报告', types: ['pdf', 'doc', 'docx'],
    }],
}, {
    reviewType: 4,
    fileType: [{
        prefix: 'main', label: '结题验收表', types: ['pdf', 'doc', 'docx'],
    }, {
        prefix: 'proof', label: '主要佐证材料', types: ['pdf', 'doc', 'docx'],
    }, {
        prefix: 'summary', label: '总结报告', types: ['pdf', 'doc', 'docx'],
    }],
}];

export const ContentLabels = {
    content: {'1': '主要内容', '2': '进展正文', '3': '进展正文', '4': '特色'},
    further: {'1': '预期成果', '2': '未完成原因', '3': '未完成原因', '4': '主要成果'},
    other: {'1': '', '2': '其他说明', '3': '其他说明', '4': '成果应用情况'},
};
