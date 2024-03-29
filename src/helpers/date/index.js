import moment from 'moment'

export const FORMAT_CONFIG = {
    DATE: 'DD/MM/YYYY',
    DATE_TIME: 'DD/MM/YYYY HH:mm',
}

export function formatDateTime(date, config) {
    return moment(date).format(config ?? FORMAT_CONFIG.DATE_TIME)
}