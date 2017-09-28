import {dealWithTime,statusFilter,dealWithEmptyString} from './tableFilter'

const formatTime = (value,fm) => {
    return dealWithTime(value,fm);
}
const transStatus = (value) => {
    return statusFilter(value);
}
const emptyChart = (value) => {
    return dealWithEmptyString(value);
}
const roleFilter = (value) => {
    let index = Number.parseInt(value);
    return  ['管理员','省公司审核员','事业部经理','普通员工'][index];
}
export {formatTime,transStatus,emptyChart,roleFilter}
