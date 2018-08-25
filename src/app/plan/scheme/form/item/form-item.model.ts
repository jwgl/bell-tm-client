import { Scheme, SchemeDto } from '../../shared/scheme.model';

declare module '../../shared/scheme.model' {
    interface Scheme {
        editable?: boolean;
        revisable?: boolean;
        checkCredit(): string[];
    }

    interface SchemeDto {
        editable: boolean;
        revisable: boolean;
    }
}

Scheme.prototype.checkCredit = function (this: Scheme) {
    const errors = [] as string[];
    const statis = this.creditStatis;
    const compulsories = statis.filter(s => !s.name.startsWith('专业选修') && s.name.startsWith('专业'));
    if (this.directions.length > 0) {
        const directions = this.directions.map(d => {
            return {
                id: d.id,
                name: d.name,
                total: compulsories.reduce((sum, s) =>
                    sum += s.directions ? s.directions.find(sd => sd.id === d.id).credit : s.credit, 0),
                practiceCredit: compulsories.reduce((sum, s) =>
                    sum += s.directions ? s.directions.find(sd => sd.id === d.id).practiceCredit : s.practiceCredit, 0),
            };
        });

        directions.forEach(d => {
            if (d.practiceCredit / d.total < this.practiceCreditRatio) {
                errors.push(`${d.name.replace('方向', '')}方向的专业必修课中实践学分的比例小于${this.practiceCreditRatio * 100}%` +
                    `（${d.practiceCredit}/${d.total}）`);
            }
        });
    } else {
        const total = compulsories.reduce((sum, s) => sum += s.credit, 0);
        const practiceCredit = compulsories.reduce((sum, s) => sum += s.practiceCredit, 0);

        if (practiceCredit / total < this.practiceCreditRatio) {
            errors.push(`专业必修课中实践学分的比例小于${this.practiceCreditRatio * 100}%` +
                `（${practiceCredit}/${total}）`);
        }
    }

    const electives = statis.filter(s => s.name.startsWith('专业选修'));
    const electiveCredit = electives.reduce((sum, s) => sum += s.electiveCredit, 0);
    const electivePracticeCredit = electives.reduce((sum, s) => sum += s.electivePracticeCredit, 0);

    if (electivePracticeCredit / electiveCredit < this.practiceCreditRatio) {
        errors.push(`专业选修课中实践学分的比例小于${this.practiceCreditRatio * 100}%` +
            `（${electivePracticeCredit}/${electiveCredit}）`);
    }

    return errors;
};
