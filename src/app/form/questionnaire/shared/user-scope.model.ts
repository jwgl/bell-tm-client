export type StudentProperty = '学院' | '年级' | '专业' | '班级' | '性别';

export type TeacherProperty = '学院' | '性别';

export type UserProperty = StudentProperty | TeacherProperty;

export type UserScope = {[key in UserProperty]?: any};

export function userScopeToString(userScope: UserScope, userType: number) {
    var result = '';
    if (userScope['学院']) {
        result += `${userScope['学院']}`;
    }
    if (userScope['年级']) {
        result += `${userScope['年级']}级`;
    }
    if (userScope['专业']) {
        result += `${userScope['专业']}专业`;
    }
    if (userScope['班级']) {
        result += `${userScope['班级']}班`;
    }
    if (userScope['性别']) {
        result += `${userScope['性别']}${userType == 1 ? '教师' : userType == 2 ? '生' : '性'}`;
    }
    return result;
}
