export function getZodiac(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;

  const zodiacs = [
    { sign: "Capricorn", from: [12, 22], to: [1, 19] },
    { sign: "Aquarius", from: [1, 20], to: [2, 18] },
    { sign: "Pisces", from: [2, 19], to: [3, 20] },
    { sign: "Aries", from: [3, 21], to: [4, 19] },
    { sign: "Taurus", from: [4, 20], to: [5, 20] },
    { sign: "Gemini", from: [5, 21], to: [6, 20] },
    { sign: "Cancer", from: [6, 21], to: [7, 22] },
    { sign: "Leo", from: [7, 23], to: [8, 22] },
    { sign: "Virgo", from: [8, 23], to: [9, 22] },
    { sign: "Libra", from: [9, 23], to: [10, 22] },
    { sign: "Scorpio", from: [10, 23], to: [11, 21] },
    { sign: "Sagittarius", from: [11, 22], to: [12, 21] },
  ];

  return zodiacs.find(z => {
    const [fm, fd] = z.from;
    const [tm, td] = z.to;

    if (fm === 12 && month === 1) {
      return day <= td;
    }

    return (month === fm && day >= fd) || (month === tm && day <= td);
  })?.sign;
}
