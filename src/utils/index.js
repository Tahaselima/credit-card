export function formatCreditCardNumber(value) {
    return `${value.slice(0, 4)} ${value.slice(4,8)} ${value.slice(8, 12)} ${value.slice(12, 19)}`.trim()
}

export function formatExpiryDate(value) {
    return value.length >= 3 ? `${value.slice(0, 2)}/${value.slice(2, 4)}`: value
}

export function hideFormat(value) {
    return value.charAt(0) + value.slice(1,value.length - 1).replace(/[0-9]/g, '*') + value.charAt(value.length - 1)
}