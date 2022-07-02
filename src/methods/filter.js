export function currency(num) {
    const n = parseInt(num, 10);
    const result = `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `,${c}`.replace(/\s/g, '') : c))}`;
    return result;
  }