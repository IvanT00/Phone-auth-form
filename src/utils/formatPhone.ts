export default function formatPhone(phoneNumber: string): string {
    let digits = phoneNumber.replace(/\D/g, '');

    if (!digits) return '';

    if (digits.startsWith('8')) {
        digits = '7' + digits.slice(1);
    }

    let result = '+7';
    let national = '';

    if (digits.startsWith('7')) {
        national = digits.slice(1);
    } else {
        national = digits;
    }

    if (national.length > 10){
        national = national.slice(0, 10);
    }
    if (national.length > 0) {
        result += ' ' + national.slice(0, 3);
    }
    if (national.length >= 4) {
        result += ' ' + national.slice(3, 6);
    }
    if (national.length >= 7) {
        result += ' ' + national.slice(6, 8);
    }
    if (national.length >= 9) {
        result += ' ' + national.slice(8, 10);
    }

    return result.trim();
}