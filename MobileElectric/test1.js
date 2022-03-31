function mu2(a) {
  return a * a;
}

const cacul = (id, params) => {
  switch (id) {
    //+++++++++++++++++++ Tính toán chiếu sáng  +++++++++++++++++++

    // case 1: // CT : x * y = s   : Diện tích
    //   if (params.x == null || params.y == null) return null;
    //   var rs1 = params.x * params.y;
    //   return rs1;

    // case 2: // CT: z - (h1 * h2) = h  : Độ cao treo đèn so với điểm làm việc
    //   if (params.z == null || params.h1 == null || params.h2 == null)
    //     return null;
    //   var rs2 = params.z - (params.h1 + params.h2);
    //   return rs2;

    // case 3: // CT: x * y / h / (x + y)  : Chỉ số phòng
    //   if (params.x == null || params.y == null || params.h == null) return null;
    //   var rs3 = (params.x * params.y) / params.h / (params.x + params.y);
    //   return rs3;

    case 4: // CT: s * Etc / UF / M / F / n  : Số lượng bộ đèn chiếu sáng tính toán
      if (
        params.s == null ||
        params.etc == null ||
        params.uf == null ||
        params.m == null ||
        params.f == null ||
        params.n == null
      )
        return null;
      var rs4 =
        (params.s * params.etc) / params.uf / params.m / params.f / params.n;
      return rs4;
    // Note : params.uf

    // case 5: // CT: s * Etc / UF / M / F / n : Độ rọi thực tế tính toán
    //   if (
    //     params.s == null ||
    //     params.uf == null ||
    //     params.m == null ||
    //     params.f == null ||
    //     params.n == null ||
    //     params.nd == null
    //   )
    //     return null;
    //   var rs5 =
    //     (params.uf * params.m * params.f * params.n * params.nd) / params.s;
    //   return rs5;

    //+++++++++++++++++++ Tính cáp trung thế  +++++++++++++++++++

    case 6: // CT: smba / u / SQRT(3) : Dòng điện lớn nhất
      if (params.smba == null || params.u == null) return null;
      var rs6 = params.smba / params.u / Math.sqrt(3);
      return rs6;

    case 7: // CT: 22.5 * scp / l / 1000 : Điện trở (r1)
      if (params.scp == null || params.l == null) return null;
      var rs7 = (22.5 * params.scp) / params.l / 1000;
      return rs7;

    case 8: // CT: a * scp / l / b : Điện kháng
      if (params.l == null) return null;
      var rs8 = (0.08 * params.l) / 1000;
      return rs8;

    case 9: // CT: (u * 1.05) ^2 / sqrt(3) / u / inht  : Điện trở (r2)
      if (params.u == null || params.inht == null) return null;
      var rs9 = mu2(params.u * 1.05) / Math.sqrt(3) / params.u / params.inht;
      return rs9;

    case 10: // CT: u * 1.05 / sqrt(3) / sqrt (x ^ 2 + (r2 + r1) ^ 2)
      // Dòng ngắn mạch (in1)
      if (
        params.u == null ||
        params.x == null ||
        params.r1 == null ||
        params.r2 == null
      )
        return null;
      var rs10 =
        (params.u * 1.05) /
        Math.sqrt(3) /
        Math.sqrt(params.x ** 2 + (params.r2 + params.r1) ** 2);
      return rs10;

    case 11: // CT: (u * 1.05) ^2 / sht  : Điện kháng hệ thống
      if (params.u == null || params.sht == null) return null;
      var rs11 = (params.u * 1.05) ** 2 / params.sht;
      return rs11;

    case 12: // CT: u * 1.05 / (sqrt(3) * sqrt(r1 ^2 + (x + xht) ^2))
      // Dòng ngắn mạch (in2)
      if (
        params.u == null ||
        params.xht == null ||
        params.r1 == null ||
        params.x == null
      )
        return null;
      var rs12 =
        (params.u * 1.05) /
        (Math.sqrt(3) *
          Math.sqrt(params.r1 ** 2 + (params.x + params.xht) ** 2));
      return rs12;

    case dk1: //CT: du < du * 100 / u  kiểm tra tổn thất điện áp
      if (params.u == null || params.du == null) return null;

      if (params.du < (params.du * 100) / params.u) return 'OK';
      return 'NG';

    case dk2: //CT: scp >= 6 * in1 * sqrt(0.5)  kiểm tra
      if (params.scp == null || params.in1 == null) return null;

      if (params.scp >= 6 * params.in1 * Math.sqrt(0.5)) return 'OK';
      return 'NG';

    case dk3: //CT: scp > 6 * in2 * sqrt(0.5)  kiểm tra
      if (params.scp == null || params.in2 == null) return null;

      if (params.scp > 6 * params.in2 * Math.sqrt(0.5)) return 'OK';
      return 'NG';

    //+++++++++++++++++++ Tính thiết bị trung thế +++++++++++++++++++

    case 13: // CT: smba / sqrt(3) / u  : Dòng điện lớn nhất
      if (params.smba == null || params.u == null) return null;
      var rs13 = params.smba / Math.sqrt(3) / params.u;
      return rs13;

    case 14: // CT: 22.5 * l / scp / 1000  : Điện trở
      if (params.l == null || params.scp == null) return null;
      var rs14 = (22.5 * params.l) / params.scp / 1000;
      return rs14;

    case 15: // CT: 0.08 * l / 1000  : Điện kháng
      if (params.l == null) return null;
      var rs15 = (0.08 * params.l) / 1000;
      return rs15;

    case 16: // CT: (u * 1.05) ^2 / sht  : Điện kháng hệ thống
      if (params.u == null || params.sht == null) return null;
      var rs16 = mu2(params.u * 1.05) / params.sht;
      return rs16;

    case 17: // CT: u * 1.05 / sqrt(3) / sqrt( r1 ^2 + (xht + x))  : Dòng ngắn mạch
      if (
        params.u == null ||
        params.r1 == null ||
        params.xht == null ||
        params.x == null
      )
        return null;
      var rs17 =
        (params.u * 1.05) /
        Math.sqrt(3) /
        Math.sqrt(mu2(params.r1) + mu2(params.xht + params.x));
      return rs17;

    case 18: // CT: (1.8 * sqrt(2)) * in1  : Dòng xung kích ixk1
      if (params.in1 == null) return null;
      var rs18 = 1.8 * Math.sqrt(2) * params.in1;
      return rs18;

    case 19: // CT: (u * 1.05) ^2 / sqpt(3) / u / icb  : Điện kháng hệ thống
      if (params.u == null || params.icb == null) return null;
      var rs19 = mu2(params.u * 1.05) / Math.sqrt(3) / params.u / params.icb;
      return rs19;

    case 20: // CT: u * 1.05 / sqrt(3) / sqrt( r1 ^2 + ( xht + x) ^2) : Dòng ngăns mạch
      if (
        params.u == null ||
        params.r1 == null ||
        params.xht == null ||
        params.x == null
      )
        return null;
      var rs20 =
        (params.u * 1.05) /
        Math.sqrt(3) /
        Math.sqrt(mu2(params.r1) + mu2(params.xht + params.x));
      return rs20;

    case 21: // CT: 1.8 * sqrt(2) * in2  : Dòng xung kích ixk2
      if (params.in2 == null) return null;
      var rs21 = 1.8 * Math.sqrt(2) * params.in2;
      return rs21;

    //+++++++++++++++++++ Tính máy biến áp  +++++++++++++++++++

    case 22: // CT: s / (sqrt(3) * u2)  : Dòng điện làm việc tính toán
      if (params.s == null || params.u2 == null) return null;
      var rs22 = params.s / (Math.sqrt(3) * params.u2);
      return rs22;

    case 23: // CT: itb "/5"  : Chọn biến dòng
      if (params.itb == null) return null;
      var rs23 = params.itb + '/5';
      return rs23;

    case 24: // CT: schọn / sbước  : Số bước bù
      if (params.sC == null || params.sB == null) return null;
      var rs24 = params.sC / params.sB;
      return rs24;

    case 25: // CT:  round(iz'/ i1) : Số sợi /1 pha
      if (params.iz == null || params.i1 == null) return null;
      var rs25 = Math.round(params.iz / params.i1);
      return rs25;

    case 26: // CT: itb / k1 / k2  : Dòng chọn cáp
      if (params.itb == null || params.k1 == null || params.k2 == null)
        return null;
      var rs26 = params.itb / params.k1 / params.k2;
      return rs26;

    case 27: // CT: cp * i(sợi)  : Khả năng mang dòng tổng
      if (params.cp == null || params.is == null) return null;
      var rs27 = params.cp * params.is;
      return rs27;

    case 28: // CT: sqrt(3) * l * in * ((r1 * cos2 + x1) * sqrt(1 - cos2 * cos2)) / 1000 / cp  : Độ sụt áp au1
      if (
        params.l == null ||
        params.in == null ||
        params.r1 == null ||
        params.cos2 == null ||
        params.x1 == null ||
        params.cp == null
      )
        return null;
      var rs28 =
        ((params.l *
          params.in *
          (params.r1 * params.cos2 +
            params.x1 * Math.sqrt(1 - params.cos2 * params.cos2))) /
          1000 /
          params.cp) *
        Math.sqrt(3);
      return rs28;

    case 29: // CT: au / u2 * 100 / 1000 : Tỉ lệ sụt áp
      if (params.au == null || params.u2 == null) return null;
      var rs29 = ((params.au / params.u2) * 100) / 1000;
      return rs29;

    case 30: // CT: s / sqrt(3) / u1 : Dòng điện tính toán trung thế
      if (params.s == null || params.u1 == null) return null;
      var rs30 = params.s / Math.sqrt(3) / params.u1;
      return rs30;

    case 31: // CT: sqrt(3) * l * (s / (sqrt(3) * u1) * (r1 * cos2 + x1 * sqrt(1 - cos2 * cos2))) : Độ sụt áp au2
      if (
        params.l == null ||
        params.s == null ||
        params.u1 == null ||
        params.r1 == null ||
        params.cos2 == null ||
        params.x1 == null
      )
        return null;
      var rs31 =
        Math.sqrt(3) *
        params.l *
        ((params.s / (Math.sqrt(3) * params.u1)) *
          (params.r1 * params.cos2 +
            params.x1 * Math.sqrt(1 - params.cos2 * params.cos2)));
      return rs31;

    case 32: // CT: au2 / u1 * 100 / 1000 : Tỉ lệ sụt áp
      if (params.au2 == null || params.u1 == null) return null;
      var rs32 = ((params.au2 / params.u1) * 100) / 1000;
      return rs32;

    case 33: // CT: s * cos1 (tan( cos2) - tan(cos1)) : Dung lượng bù tính toán
      if (params.s == null || params.cos1 == null || params.cos2 == null)
        return null;
      var rs33 =
        params.s *
        params.cos1 *
        (Math.tan(params.cos2) - Math.tan(params.cos1));
      return rs33;

    case dk4: //CT: au1 < 5  : kiểm tra đạt nếu nhỏ hơn hoặc bằng 5%
      if (params.au1 == null) return null;

      if (params.au1 < 5) return 'OK';
      return 'NOK';

    case dk5: //CT: (i > (s / u1 / 1.732))  : kiểm tra
      if (params.i == null || params.s == null || params.u1 == null)
        return null;

      if (params.i > params.s / params.u1 / 1.732) return 'OK';
      return 'NOK';

    case dk6: //CT: au2 < 5 : kiểm tra đạt nếu nhỏ hơn hoặc bằng 5%
      if (params.au2 == null) return null;

      if (params.au2 < 5) return 'OK';
      return 'NOK';

    //+++++++++++++++++++ Tính chọn cáp và aptomat  +++++++++++++++++++

    case 34: // CT: p / 1.732 / 0.38 / cos : Dòng điện tính toán
      if (params.md == null || params.p == null || params.cos == null)
        return null;
      if (params.md == 3) return params.p / 1.732 / 0.38 / params.cos;
      return params.p / 0.22 / params.cos;

    case 35: // CT: kat * itt : Chọn Aptomat
      if (params.kat == null || params.itt == null) return null;
      var rs35 = params.kat * params.itt;
      return rs35;

    case 36: // CT: kat : Chọn Iz
      if (params.kat == null) return null;
      var rs36 = params.kat;
      return rs36;

    case 37: // CT: k3 * k2 * k1 : K=
      if (params.k1 == null || params.k2 == null || params.k3 == null)
        return null;
      var rs37 = params.k3 * params.k2 * params.k1;
      return rs37;

    case 38: // CT: kat : Chọn Iz'
      if (params.kat == null || params.k == null) return null;
      var rs38 = params.kat / params.k;
      return rs38;

    case 39: // CT: pvc * k6 * k5 * k4 : Hệ số K cách điện cáp PVC
      if (
        params.pvc == null ||
        params.k6 == null ||
        params.k5 == null ||
        params.k4 == null
      )
        return null;
      var rs39 = params.pvc * params.k6 * params.k5 * params.k4;
      return rs39;

    case 40: // CT: ciz / k : Dòng chọn cáp
      if (params.ciz == null || params.k == null) return null;
      var rs40 = params.ciz / params.k;
      return rs40;

    case 41: // CT: k4 * k5 * k6 * xlpe : Hệ số K cách điện cáp pvc
      if (
        params.k4 == null ||
        params.k5 == null ||
        params.k6 == null ||
        params.xlpe == null
      )
        return null;
      var rs41 = params.k4 * params.k5 * params.k6 * params.xlpe;
      return rs41;

    case 42: // CT: ciz / k : Dòng chọn cáp
      if (params.ciz == null || params.k == null) return null;
      var rs42 = params.ciz / params.k;
      return rs42;

    // +++++++++++++++++++ Tính ngắn mạch +++++++++++++++++++

    // < 1 hệ thống trung áp>
    case 43: // CT: (u * 1.05) ^2 / psc : Điện trở trung áp
      if (params.u == null || params.psc == null) return null;
      var rs43 = mu2(params.u * 1.05) / params.psc;
      return rs43;

    // < 2 máy biến áp>
    case 44: // CT: pn < 631 = 4 : 6   : Usc(Un%)
      if (params.pn == null) return null;
      var rs44 = params.pn < 631 ? 4 : 6;
      return rs44;

    case 45: // CT: (apk * 0.4 * 0.4 * 10 ^6) / pn ^2    : Điện trở MBA
      if (params.apk == null || params.pn == null) return null;
      var rs45 = (params.apk * 0.4 * 0.4 * 10 ** 6) / params.pn ** 2;
      return rs45;

    case 46: // CT: usc * 0.4 ^2 * 10 ^4 / pn   : Điện trở toàn phần MBA
      if (params.usc == null || params.pn == null) return null;
      var rs46 = (params.usc * 0.4 ** 2 * 10 ** 4) / params.pn;
      return rs46;

    case 47: // CT: sqrt(z ^2 - r ^2)    : Điện kháng MBA
      if (params.z == null || params.r == null) return null;
      var rs47 = Math.sqrt(params.z ** 2 - params.r ** 2);
      return rs47;

    case 49: // CT: xt + x    : Điện kháng tổng
      if (params.xt == null || params.x == null) return null;
      var rs49 = params.xt + params.x;
      return rs49;

    case 50: // CT: 420 / sqrt(3) / z    : Dòng ngắn mạch tính toán
      if (params.z == null) return null;
      var rs50 = 420 / Math.sqrt(3) / params.z;
      return rs50;

    //< 3 cáp sau MBA>
    case 51: // CT: 22.5 * l / (n * s)  : Điện trở
      if (params.l == null || params.n == null || params.s == null) return null;
      var rs51 = (22.5 * params.l) / (params.n * params.s);
      return rs51;

    case 52: // CT: 0.08 * l  : Điện kháng
      if (params.l == null) return null;
      var rs52 = 0.08 * params.l;
      return rs52;

    case 53: // CT: rt + r  : Điện trở tổng
      if (params.rt == null || params.r == null) return null;
      var rs53 = params.rt + params.r;
      return rs53;

    case 54: // CT: x + xt  : Điện kháng tổng
      if (params.x == null || params.xt == null) return null;
      var rs54 = params.x + params.xt;
      return rs54;

    case 55: // CT: sqrt(rt ^2 + xt ^2)  : Điện trở toàn phần
      if (params.rt == null || params.xt == null) return null;
      var rs55 = Math.sqrt(params.rt ** 2 + params.xt ** 2);
      return rs55;

    case 56: // CT: 420 / sqrt(3) / z  : dòng ngắn mạch tính toán
      if (params.z == null) return null;
      var rs56 = 420 / Math.sqrt(3) / params.z;
      return rs56;

    // < 4 ACB/MCCB Tổng Tủ MSB>
    case 57: // CT: rt + r  : điện trở tổng
      if (params.rt == null || params.r == null) return null;
      var rs57 = params.rt + params.r;
      return rs57;

    case 58: // CT: x + xt  : điện kháng tổng
      if (params.x == null || params.xt == null) return null;
      var rs58 = params.x + params.xt;
      return rs58;

    case 59: // CT: sqrt(xt ^2 + rt ^2 )  : điện trở toàn phần
      if (params.xt == null || params.rt == null) return null;
      var rs59 = Math.sqrt(params.xt ** 2 + params.rt ** 2);
      return rs59;

    case 60: // CT: 420 / sqrt(3) / z  : dòng ngắn mạch tính toán
      if (params.z == null) return null;
      var rs60 = 420 / Math.sqrt(3) / params.z;
      return rs60;

    // < 5 Thanh cái tủ>
    case 61: // CT: idm / 2 : tiết diện thanh cái
      if (params.idm == null) return null;
      var rs61 = params.idm / 2;
      return rs61;

    case 62: // CT: 22.5 * l / stc : điện trở
      if (params.l == null || params.stc == null) return null;
      var rs62 = (22.5 * params.l) / params.stc;
      return rs62;

    case 63: // CT: 0.15 * l  : điện kháng
      if (params.l == null) return null;
      var rs63 = 0.15 * params.l;
      return rs63;

    case 64: // CT: r + x : điện trở tổng
      if (params.r == null || params.x == null) return null;
      var rs64 = params.r + params.x;
      return rs64;

    case 65: // CT: x + xt : điện kháng tổng
      if (params.x == null || params.xt == null) return null;
      var rs65 = params.x + params.xt;
      return rs65;

    case 66: // CT: sqrt( rt ^2 + xt ^2 ) : điện trở toàn phần
      if (params.rt == null || params.xt == null) return null;
      var rs66 = Math.sqrt(params.rt ** 2 + params.xt ** 2);
      return rs66;

    case 67: // CT: 420 / sqrt(3) / z  : dòng ngắn mạch tính toán
      if (params.z == null) return null;
      var rs67 = 420 / Math.sqrt(3) / params.z;
      return rs67;

    // < 6 MCCB nhánh Tủ MSB>
    case 68: // CT: r + rt  : điện trở tổng
      if (params.r == null || params.rt == null) return null;
      var rs68 = params.r + params.rt;
      return rs68;

    case 69: // CT: x + xt  : điện kháng tổng
      if (params.x == null || params.xt == null) return null;
      var rs69 = params.x + params.xt;
      return rs69;

    case 70: // CT: sqrt( rt ^2 + xt ^2 ) : điện trở toàn phần
      if (params.rt == null || params.xt == null) return null;
      var rs70 = Math.sqrt(params.rt ** 2 + params.xt ** 2);
      return rs70;

    case 71: // CT: 420 / sqrt(3) / z  : dòng ngắn mạch tính toán
      if (params.z == null) return null;
      var rs71 = 420 / Math.sqrt(3) / params.z;
      return rs71;

    // < 7 Cáp sau tủ MSB>
    case 72: // CT: 22.5 * l / (n * s) : điện trở
      if (params.l == null || params.n == null || params.s == null) return null;
      var rs72 = (22.5 * params.l) / (params.n * params.s);
      return rs72;

    case 73: // CT: 0.08 * l  : điện kháng
      if (params.l == null) return null;
      var rs73 = 0.08 * params.l;
      return rs73;

    case 74: // CT: r + rt : điện trở tổng
      if (params.r == null || params.rt == null) return null;
      var rs74 = params.r + params.rt;
      return rs74;

    case 75: // CT: x + xt : điện kháng tổng
      if (params.x == null || params.xt == null) return null;
      var rs75 = params.x + params.xt;
      return rs75;

    case 76: // CT: sqrt( rt ^2 + xt ^2 ) : điện trở toàn phần
      if (params.rt == null || params.xt == null) return null;
      var rs76 = Math.sqrt(params.rt ** 2 + params.xt ** 2);
      return rs76;

    case 77: // CT: 420 / sqrt(3) / z  : dòng ngắn mạch tính toán
      if (params.z == null) return null;
      var rs77 = 420 / Math.sqrt(3) / params.z;
      return rs77;

    // < 8 Tủ phân phối MDB>
    case 78: // CT: r + rt  : điện trở tổng
      if (params.r == null || params.rt == null) return null;
      var rs78 = params.r + params.rt;
      return rs78;

    case 79: // CT: x + xt  : điện kháng tổng
      if (params.x == null || params.xt == null) return null;
      var rs79 = params.x + params.xt;
      return rs79;

    case 80: // CT: sqrt( rt ^2 + xt ^2 ) : điện trở toàn phần
      if (params.rt == null || params.xt == null) return null;
      var rs80 = Math.sqrt(params.rt ** 2 + params.xt ** 2);
      return rs80;

    case 81: // CT: 420 / sqrt(3) / z  : dòng ngắn mạch tính toán
      if (params.z == null) return null;
      var rs81 = 420 / Math.sqrt(3) / params.z;
      return rs81;

    // < 9 Thanh cái tủ phân phối>
    case 82: // CT: r + rt  : điện trở tổng
      if (params.r == null || params.rt == null) return null;
      var rs82 = params.r + params.rt;
      return rs82;

    case 83: // CT: x + xt  : điện kháng tổng
      if (params.x == null || params.xt == null) return null;
      var rs83 = params.x + params.xt;
      return rs83;

    case 84: // CT: sqrt( rt ^2 + xt ^2 ) : điện trở toàn phần
      if (params.rt == null || params.xt == null) return null;
      var rs84 = Math.sqrt(params.rt ** 2 + params.xt ** 2);
      return rs84;

    case 85: // CT: 420 / sqrt(3) / z  : dòng ngắn mạch tính toán
      if (params.z == null) return null;
      var rs85 = 420 / Math.sqrt(3) / params.z;
      return rs85;

    // < 10 MCCB nhánh tủ phân phối>
    case 86: // CT: r + rt  : điện trở tổng
      if (params.r == null || params.rt == null) return null;
      var rs86 = params.r + params.rt;
      return rs86;

    case 87: // CT: x + xt  : điện kháng tổng
      if (params.x == null || params.xt == null) return null;
      var rs87 = params.x + params.xt;
      return rs87;

    case 88: // CT: sqrt( rt ^2 + xt ^2 ) : điện trở toàn phần
      if (params.rt == null || params.xt == null) return null;
      var rs88 = Math.sqrt(params.rt ** 2 + params.xt ** 2);
      return rs88;

    case 89: // CT: 420 / sqrt(3) / z  : dòng ngắn mạch tính toán
      if (params.z == null) return null;
      var rs89 = 420 / Math.sqrt(3) / params.z;
      return rs89;

    // < 11 Cáp sau tủ phân phối>
    case 90: // CT: 22.5 * l / (n * s) : điện trở
      if (params.l == null || params.n == null || params.s == null) return null;
      var rs90 = (22.5 * params.l) / (params.n * params.s);
      return rs90;

    case 91: // CT: 0.08 * l  : điện kháng
      if (params.l == null) return null;
      var rs91 = 0.08 * params.l;
      return rs91;

    case 92: // CT: r + rt : điện trở tổng
      if (params.r == null || params.rt == null) return null;
      var rs92 = params.r + params.rt;
      return rs92;

    case 93: // CT: x + xt : điện kháng tổng
      if (params.x == null || params.xt == null) return null;
      var rs93 = params.x + params.xt;
      return rs93;

    case 94: // CT: sqrt( rt ^2 + xt ^2 ) : điện trở toàn phần
      if (params.rt == null || params.xt == null) return null;
      var rs94 = Math.sqrt(params.rt ** 2 + params.xt ** 2);
      return rs94;

    case 95: // CT: 420 / sqrt(3) / z  : dòng ngắn mạch tính toán
      if (params.z == null) return null;
      var rs95 = 420 / Math.sqrt(3) / params.z;
      return rs95;

    // < 12 MCCB,MCB tổng Tủ tải>
    case 96: // CT: r + rt  : điện trở tổng
      if (params.r == null || params.rt == null) return null;
      var rs96 = params.r + params.rt;
      return rs96;

    case 97: // CT: x + xt  : điện kháng tổng
      if (params.x == null || params.xt == null) return null;
      var rs97 = params.x + params.xt;
      return rs97;

    case 98: // CT: sqrt( rt ^2 + xt ^2 ) : điện trở toàn phần
      if (params.rt == null || params.xt == null) return null;
      var rs98 = Math.sqrt(params.rt ** 2 + params.xt ** 2);
      return rs98;

    case 99: // CT: 420 / sqrt(3) / z  : dòng ngắn mạch tính toán
      if (params.z == null) return null;
      var rs99 = 420 / Math.sqrt(3) / params.z;
      return rs99;

    // < 13 Thanh cái tủ tải>
    case 100: // CT: r + rt  : điện trở tổng
      if (params.r == null || params.rt == null) return null;
      var rs100 = params.r + params.rt;
      return rs100;

    case 101: // CT: x + xt  : điện kháng tổng
      if (params.x == null || params.xt == null) return null;
      var rs101 = params.x + params.xt;
      return rs101;

    case 102: // CT: sqrt( rt ^2 + xt ^2 ) : điện trở toàn phần
      if (params.rt == null || params.xt == null) return null;
      var rs102 = Math.sqrt(params.rt ** 2 + params.xt ** 2);
      return rs102;

    case 103: // CT: 420 / sqrt(3) / z  : dòng ngắn mạch tính toán
      if (params.z == null) return null;
      var rs103 = 420 / Math.sqrt(3) / params.z;
      return rs103;

    // < 14 Áp tomat nhánh>
    case 104: // CT: r + rt  : điện trở tổng
      if (params.r == null || params.rt == null) return null;
      var rs104 = params.r + params.rt;
      return rs104;

    case 105: // CT: rt + xt  : điện kháng tổng
      if (params.rt == null || params.xt == null) return null;
      var rs105 = params.rt + params.xt;
      return rs105;

    case 106: // CT: sqrt( rt ^2 + xt ^2 ) : điện trở toàn phần
      if (params.rt == null || params.xt == null) return null;
      var rs106 = Math.sqrt(params.rt ** 2 + params.xt ** 2);
      return rs106;

    case 107: // CT: 420 / sqrt(3) / z  : dòng ngắn mạch tính toán
      if (params.z == null) return null;
      var rs107 = 420 / Math.sqrt(3) / params.z;
      return rs107;

    // < 15 Cáp/Pha>
    case 108: // CT: 22.5 * l / s / n : điện trở
      if (params.l == null || params.s == null || params.n == null) return null;
      var rs108 = (22.5 * params.l) / params.s / params.n;
      return rs108;

    case 109: // CT: 0.08 * l  : điện kháng
      if (params.l == null) return null;
      var rs109 = 0.08 * params.l;
      return rs109;

    case 110: // CT: r + rt : điện trở tổng
      if (params.r == null || params.rt == null) return null;
      var rs110 = params.r + params.rt;
      return rs110;

    case 111: // CT: x + xt : điện kháng tổng
      if (params.x == null || params.xt == null) return null;
      var rs111 = params.x + params.xt;
      return rs111;

    case 112: // CT: sqrt( rt ^2 + xt ^2 ) : điện trở toàn phần
      if (params.rt == null || params.xt == null) return null;
      var rs112 = Math.sqrt(params.rt ** 2 + params.xt ** 2);
      return rs112;

    case 113: // CT: 420 / sqrt(3) / z  : dòng ngắn mạch tính toán
      if (params.z == null) return null;
      var rs113 = 420 / Math.sqrt(3) / params.z;
      return rs113;

    //+++++++++++++++++++ TÍnh toán sụt áp +++++++++++++++++++

    // <mạng điện xoay chiều>
    case 114: // CT: md=3:(p * 1000) / 1.732 / u / cos   : Dòng điện làm việc tính toán
      // md=1:(p * 1000) / u / cos
      if (
        params.md == null ||
        params.p == null ||
        params.u == null ||
        params.cos == null
      )
        return null;
      if (params.md == 3)
        return (params.p * 1000) / 1.732 / params.u / params.cos;
      return (params.p * 1000) / params.u / params.cos;

    case 115: // CT: md=3: sqrt(3) * in * l * (r1 * cos + x1 * sqrt(1 - cos * cos)) / n / 1000  : Độ sụt áp
      // md=1: 2 * in * l * (r1 * cos + x1 * sqrt(1 - cos * cos)) / n / 1000
      if (
        params.md == null ||
        params.in == null ||
        params.l == null ||
        params.r1 == null ||
        params.x1 == null ||
        params.cos == null ||
        params.n == null
      )
        return null;
      if (params.md == 3)
        return (
          (Math.sqrt(3) *
            params.in *
            params.l *
            (params.r1 * params.cos +
              params.x1 * Math.sqrt(1 - params.cos * params.cos))) /
          params.n /
          1000
        );
      return (
        (2 *
          params.in *
          params.l *
          (params.r1 * params.cos +
            params.x1 * Math.sqrt(1 - params.cos * params.cos))) /
        params.n /
        1000
      );

    case 116: // CT: (au * 100) / u  :Tỉ lệ sụt áp
      if (params.au == null || params.u == null) return null;
      var rs116 = (params.au * 100) / params.u;
      return rs116;

    case dk7: //CT: au1 < 5 : kiểm tra đạt nếu nhỏ hơn hoặc bằng 5%
      if (params.au1 == null) return null;

      if (params.au1 < 5) return 'OK';
      return 'NOGOOD';

    // <Mạng điện áp 1 chiều>
    case 117: // CT: (p * 1000) / u  : Dòng điện làm việc tính toán
      if (params.p == null || params.u == null) return null;
      var rs117 = (params.p * 1000) / params.u;
      return rs117;

    case 118: // CT: 2 * in * l * r1 / u / 1000  : độ sụt áp
      if (
        params.in == null ||
        params.l == null ||
        params.r1 == null ||
        params.u == null
      )
        return null;
      var rs118 = (2 * params.in * params.l * params.r1) / params.u / 1000;
      return rs118;

    case 119: // CT: (au * 100) / u   : Tỉ lệ sụt áp
      if (params.au == null || params.u == null) return null;
      var rs119 = (params.au * 100) / params.u;
      return rs119;

    case dk8: //CT: au2 < 5 : kiểm tra đạt nếu nhỏ hơn hoặc bằng 5%
      if (params.au2 == null) return null;

      if (params.au2 < 5) return 'OK';
      return 'NOGOOD';

    //+++++++++++++++++++ Tính tiếp địa,chống sét +++++++++++++++++++

    // < 1 pp bán kính thu sét theo pp cổ điển>
    // case 120: // CT:   : bán kính bảo vệ
    //   if (params.h == null || params.hx == null) return null;
    //   if (params.hx > 0 && params.hx <= (2 / 3) * params.h)
    //     return 1.5 * (params.h - 1.25 * params.hx);
    //   if (params.hx > (2 / 3) * params.h) return 0.75 * (params.h - params.hx);
    //   return 'nhập lại';

    // < 2 pp tính toán chống sét theo pp phát tia tiên đạo>
    case 121: // CT:  v * t / 1000000 : đường dẫn chủ động
      if (params.v == null || params.t == null) return null;
      var rs121 = (params.v * params.t) / 1000000;
      return rs121;

    case 122: // CT: sqrt(h * (2 * d - h) + al * (2 * d + al)) : bán kính bảo vệ của đầu thu set
      if (params.h == null || params.d == null || params.al == null)
        return null;
      var rs122 = Math.sqrt(
        params.h * (2 * params.d - params.h) +
          params.al * (2 * params.d + params.al),
      );
      return rs122;

    //< II tính toán nối đất>
    case 123: // CT: 0.366 * r / lc * (log(2 * lc / d) + 1/2 * log((4 * (t + lc / 2) + lc) / (4 * (t + lc / 2) - lc)) : điện trở một cọc tiết địa
      if (
        params.r == null ||
        params.lc == null ||
        params.d == null ||
        params.t == null
      )
        return null;
      var rs123 =
        0.366 *
        (params.r / params.lc) *
        (Math.log(2 * (params.lc / params.d)) +
          (1 / 2) *
            Math.log(
              (4 * (params.t + params.lc / 2) + params.lc) /
                (4 * (params.t + params.lc / 2) - params.lc),
            ));
      return rs123;

    case 124: // CT: 0.366 * r / lt * log(2 * lt ^2 / b / t) : điện trở thanh dẫn dẹt
      if (
        params.r == null ||
        params.lt == null ||
        params.b == null ||
        params.t == null
      )
        return null;
      var rs124 =
        ((0.366 * params.r) / params.lt) *
        Math.log((2 * params.lt ** 2) / params.b / params.t);
      return rs124;

    case 125: // CT: 0.366 * r / lt * log(lt ^2 / d / t) : Điện trở thanh dẫn tròn
      if (
        params.r == null ||
        params.lt == null ||
        params.d == null ||
        params.t == null
      )
        return null;
      var rs125 =
        ((0.366 * params.r) / params.lt) *
        Math.log(params.lt ** 2 / params.d / params.t);
      return rs125;

    case 126: // CT: rc * rt / (rc * ht + rt * hc * n) : Điện trở tổng với thanh nối thép dẹt
      if (
        params.rc == null ||
        params.rt == null ||
        params.ht == null ||
        params.n == null ||
        params.hc == null
      )
        return null;
      var rs126 =
        (params.rc * params.rt) /
        (params.rc * params.ht + params.rt * params.hc * params.n);
      return rs126;

    case 127: // CT: rc * rt / (rc * ht + rt * hc * n) : Điện trở tổng với thanh nối thép tròn
      if (
        params.rc == null ||
        params.rt == null ||
        params.ht == null ||
        params.n == null ||
        params.hc == null
      )
        return null;
      var rs127 =
        (params.rc * params.rt) /
        (params.rc * params.ht + params.rt * params.hc * params.n);
      return rs127;

    //+++++++++++++++++++ Bóc khối lượng chiếu sáng +++++++++++++++++++

    case 128: // CT: (x + n * h + (m + b) * (h - 1) + 2 * a * (h2 + 0.2)) * kd : khối lượng dây pha
      if (
        params.x == null ||
        params.n == null ||
        params.h == null ||
        params.m == null ||
        params.b == null ||
        params.a == null ||
        params.h2 == null ||
        params.kd == null
      )
        return null;
      var rs128 =
        (params.x +
          params.n * params.h +
          (params.m + params.b) * (params.h - 1) +
          2 * params.a * (params.h2 + 0.2)) *
        params.kd;
      return rs128;

    case 130: // CT: (x + n * h + 2 * a * (h2 + 0.2)) * kd : khối lượng dây pha
      if (
        params.x == null ||
        params.n == null ||
        params.h == null ||
        params.a == null ||
        params.h2 == null ||
        params.kd == null
      )
        return null;
      var rs130 =
        (params.x + params.n * params.h + 2 * params.a * (params.h2 + 0.2)) *
        params.kd;
      return rs130;

    case 131: // CT: (pe / kd - 2 * a(h2 + 0.2)) * ko : khối lượng ống cứng
      if (
        params.pe == null ||
        params.kd == null ||
        params.a == null ||
        params.h2 == null ||
        params.ko == null
      )
        return null;
      var rs131 =
        (params.pe / params.kd - 2 * params.a * (params.h2 + 0.2)) * params.ko;
      return rs131;

    case 132: // CT: 2 * a * (h2 + 0.2) * ko : khối lượng ống mềm
      if (params.a == null || params.h2 == null || params.ko == null)
        return null;
      var rs132 = 2 * params.a * (params.h2 + 0.2) * params.ko;
      return rs132;

    //+++++++++++++++++++ Bóc khối lượng ổ cấm +++++++++++++++++++

    case 133: // CT: (y + p1 * (2 * h - ht) + p2 * (h - ht) + oc2 * 2 * h + p3 * ht) * kd + oc3 * 0.4 : khối lượng dây pha
      if (
        params.y == null ||
        params.p1 == null ||
        params.h == null ||
        params.ht == null ||
        params.p2 == null ||
        params.oc2 == null ||
        params.oc3 == null ||
        params.p3 == null ||
        params.kd == null
      )
        return null;
      var rs133 =
        (params.y +
          params.p1 * (2 * params.h - params.ht) +
          params.p2 * (params.h - params.ht) +
          params.oc2 * 2 * params.h +
          params.p3 * params.ht) *
          params.kd +
        params.oc3 * 0.4;
      return rs133;

    case 136: // CT: l * ko / kd : khối lượng ống cứng
      if (params.l == null || params.ko == null || params.kd == null)
        return null;
      var rs136 = (params.l * params.ko) / params.kd;
      return rs136;

    //+++++++++++++++++++ Tính chọn động cơ +++++++++++++++++++

    case 137: // CT: md=3: (p * 1000) / sqrt(3) / u / cos / n  : dòng điện làm việc tính toán
      // md=1: (p * 1000) / u / cos / n
      if (
        params.md == null ||
        params.p == null ||
        params.u == null ||
        params.cos == null ||
        params.n == null
      )
        return null;
      if (params.md == 3)
        return (
          (params.p * 1000) / Math.sqrt(3) / params.u / params.cos / params.n
        );
      return (params.p * 1000) / params.u / params.cos / params.n;

    case 138: // CT: kat * itt : dòng điện chọn aptomat
      if (params.kat == null || params.itt == null) return null;
      var rs138 = params.kat * params.itt;
      return rs138;

    case 139: // CT: kmc * itt : dòng điện chọn contactor
      if (params.kmc == null || params.itt == null) return null;
      var rs139 = params.kmc * params.itt;
      return rs139;
  }
};

//+++++++++++++++++++ Tính toán chiếu sáng +++++++++++++++++++

var rs1 = cacul(1, {x: 20, y: 10}); // Diện tích
var rs2 = cacul(2, {z: 3.5, h1: 0, h2: 0.2}); // Độ cao treo đèn so với điểm làm việc
var rs3 = cacul(3, {h: rs2, x: 20, y: 10}); // Chỉ số phòng
var rs4 = cacul(4, {s: rs1, etc: 200, uf: 0.65, m: 0.7, f: 1100, n: 2}); // Số lượng bộ đèn chiếu sáng tính toán
var rs5 = cacul(5, {s: rs1, uf: 0.65, m: 0.7, f: 1100, n: 2, nd: 75}); // Độ rọi thực tế tính toán

//+++++++++++++++++++ Tính cáp trung thế +++++++++++++++++++

var rs6 = cacul(6, {smba: 2500, u: 22}); // Dòng điện lớn nhất
var rs7 = cacul(7, {scp: 95, l: 20}); // Điện trở r1
var rs8 = cacul(8, {l: 20}); // Điện kháng
var rs9 = cacul(9, {u: 22, inht: 25}); // Điện trở r2
var rs10 = cacul(10, {u: 22, x: rs8, r1: rs7, r2: rs9}); // Dòng ngắn mạch in1
var rs11 = cacul(11, {u: 22, sht: 250}); // Điện kháng hệ thống
var rs12 = cacul(12, {u: 22, r1: rs7, x: rs8, xht: rs11}); // Dòng ngắn mạch in2
var dk1 = cacul(dk1, {du: 5, u: 22}); // kiểm tra tổn thất điện áp
var dk2 = cacul(dk2, {scp: 95, in1: rs10}); // kiểm tra
var dk3 = cacul(dk3, {scp: 95, in2: rs12}); // kiểm tra

//+++++++++++++++++++ Tính thiết bị trung thế +++++++++++++++++++

var rs13 = cacul(13, {smba: 2500, u: 22}); // Dòng điện lớn nhất
var rs14 = cacul(14, {scp: 240, l: 50}); // Điện trở r1
var rs15 = cacul(15, {l: 50}); // Điện kháng
var rs16 = cacul(16, {u: 22, sht: 250}); // Điện kháng hệ thống
var rs17 = cacul(17, {
  u: 22,
  r1: rs14,
  xht: rs16,
  x: rs15,
}); // Dòng ngắn mạch in1
var rs18 = cacul(18, {in1: rs17}); // Dòng xung kích ixk1
var rs19 = cacul(19, {u: 22, icb: 25}); // Điện kháng hệ thống
var rs20 = cacul(20, {u: 22, r1: rs14, xht: rs19, x: rs15}); // Dòng ngắn mạch in2
var rs21 = cacul(21, {in2: rs20}); // Dòng xung kích ixk2

//+++++++++++++++++++ Tính máy biến áp +++++++++++++++++++

var rs22 = cacul(22, {s: 2500, u2: 0.38}); // Dòng điện làm việc tính toán
var rs23 = cacul(23, {itb: 4000}); // Chọn biến dòng
var rs24 = cacul(24, {sC: 600, sB: 40}); // Số bước bù
var rs26 = cacul(26, {itb: 4000, k1: 0.73, k2: 1}); // Dòng chọn cáp
var rs25 = cacul(25, {iz: rs26, i1: 604}); // Số sợi /1 pha
var rs27 = cacul(27, {cp: rs25, is: 604}); // Khả năng mang dòng tổng
var rs28 = cacul(28, {
  l: 50,
  in: rs22,
  r1: 0.12,
  cos2: 0.92,
  x1: 0.07,
  cp: rs25,
}); // Độ sụt áp au1 LỖI sai số 5.24 - 5.03 = 0.203 V
var rs29 = cacul(29, {au: rs28, u2: 0.38}); // Tỉ lệ sụt áp ( au = rs28) 1.38 - 1.32 = 0.06%
var rs30 = cacul(30, {s: 2500, u1: 22}); // Dòng điện tính toán trung thế
var rs31 = cacul(31, {l: 30, s: 2500, u1: 22, r1: 0.12, x1: 0.07, cos2: 0.92}); // Độ sụt áp au2 LỖI sai số 488.85 - 469.88 = 18.97 V
var rs32 = cacul(32, {au2: rs31, u1: 22}); // Tỉ lệ sụt áp ( au2 = rs31) 2.22 - 2.13 = 0.09%
var rs33 = cacul(33, {s: 2500, cos1: 0.8, cos2: 0.92}); // Dung lượng bù tính toán

console.log('rs22', rs22);
console.log('rs25', rs25);
console.log('rs28', rs28);
console.log('rs29', rs29);
console.log('rs31', rs31);
console.log('rs32', rs32);

var dk4 = cacul(dk4, {au1: rs29}); // kiểm tra đạt nếu nhỏ hơn hoặc bằng 5%
var dk5 = cacul(dk5, {i: 441, s: 2500, u1: 22}); // kiểm tra đạt nếu nhỏ hơn hoặc bằng 5%
var dk6 = cacul(dk6, {au2: rs32}); // kiểm tra đạt nếu nhỏ hơn hoặc bằng 5%

//+++++++++++++++++++ Tính chọn cáp và aptomat +++++++++++++++++++

var rs34 = cacul(34, {md: 3, p: 20, cos: 0.8}); // Dòng điện tính toán
var rs35 = cacul(35, {kat: 1.2, itt: rs34}); // Chọn Aptomat
var rs36 = cacul(36, {kat: rs35}); //  ciz = rs35
var rs37 = cacul(37, {k1: 1, k2: 0.72, k3: 0.71}); // K=
var rs38 = cacul(38, {kat: rs36, k: rs37}); // Chọn Iz'
// <Cách điện XLPE>
var rs39 = cacul(39, {pvc: 0.89, k6: 1, k5: 0.54, k4: 0.8}); // Hệ số K cách điện cáp PVC
var rs40 = cacul(40, {ciz: rs36, k: rs39}); // Dòng chọn cáp
// <Với cáp XLPE>
var rs41 = cacul(41, {k4: 0.8, k5: 0.54, k6: 1, xlpe: 0.93}); // Hệ số K cách điện cáp PVC
var rs42 = cacul(42, {ciz: rs36, k: rs41}); // Hệ số K cách điện cáp PVC

// Tính ngắn mạch
// < 1 hệ thống trung áp>
var rs43 = cacul(43, {u: 22, psc: 250}); // Điện trở trung áp
// < 2 máy biến áp>
var rs44 = cacul(44, {pn: 2500}); // Usc(Un%)
var rs45 = cacul(45, {apk: 22.5, pn: 2500}); // Điện trở MBA
var rs46 = cacul(46, {usc: rs44, pn: 2500}); // Điện trở toàn phần MBA
var rs47 = cacul(47, {z: rs46, r: rs45}); // Điện kháng MBA
var rs48 = rs45; // Điện trở tổng
var rs49 = cacul(49, {xt: rs43, x: rs47}); // Điện kháng tổng
var rs50 = cacul(50, {z: rs46}); // Dòng ngắn mạch tính toán
// < 3 cáp sau mba>
var rs51 = cacul(51, {l: 50, n: 3, s: 150}); // điện trở R
var rs52 = cacul(52, {l: 50}); // điện kháng
var rs53 = cacul(53, {rt: rs51, r: rs48}); // điện trở tổng
var rs54 = cacul(54, {x: rs52, xt: rs49}); // điện kháng tổng
var rs55 = cacul(55, {rt: rs53, xt: rs54}); // điện trở toàn phần
var rs56 = cacul(56, {z: rs55}); // Dòng ngắn mạch tính toán
// < 4 ACB/MCCB Tổng Tủ MSB>
var rs57 = cacul(57, {r: 0, rt: rs53}); // điện trở tổng
var rs58 = cacul(58, {x: 0.15, xt: rs54}); // điện kháng tổng
var rs59 = cacul(59, {xt: rs58, rt: rs57}); // điện trở toàn phần
var rs60 = cacul(60, {z: rs59}); // dòng ngắn mạch tính toán
// < 5 Thanh cái tủ MSB>
var rs61 = cacul(61, {idm: 2500}); // tiết diện thanh cái
var rs62 = cacul(62, {l: 4, stc: rs61}); // điện trở
var rs63 = cacul(63, {l: 4}); // điện kháng
var rs64 = cacul(64, {r: rs62, x: 0.15}); // điện trở tổng
var rs65 = cacul(65, {x: rs63, xt: rs58}); // điện kháng tổng
var rs66 = cacul(66, {rt: rs64, xt: rs65}); // điện trở toàn phần
var rs67 = cacul(67, {z: rs66}); // dòng ngắn mạch tính toán
// < 6 MCCB nhánh Tủ MSB>
var rs68 = cacul(68, {r: 0, rt: rs64}); // điện trở tổng
var rs69 = cacul(69, {x: 0.15, xt: rs65}); // điện kháng tổng
var rs70 = cacul(70, {rt: rs68, xt: rs69}); // điện trở toàn phần
var rs71 = cacul(71, {z: rs70}); // dòng ngắn mạch tính toán
// < 7 Cáp sau tủ MSB>
var rs72 = cacul(72, {l: 100, n: 1, s: 95}); // điện trở
var rs73 = cacul(73, {l: 100}); // điện kháng
var rs74 = cacul(74, {r: rs72, rt: rs68}); // điện trở tổng
var rs75 = cacul(75, {x: rs73, xt: rs69}); // điện kháng tổng
var rs76 = cacul(76, {rt: rs74, xt: rs75}); // điện trở toàn phần
var rs77 = cacul(77, {z: rs76}); // dòng ngắn mạch tính toán
// < 8 Tủ phân phối MDB>
var rs78 = cacul(78, {r: 0, rt: rs74}); // điện trở tổng
var rs79 = cacul(79, {x: 0.15, xt: rs75}); // điện kháng tổng
var rs80 = cacul(80, {rt: rs78, xt: rs79}); // điện trở toàn phần
var rs81 = cacul(81, {z: rs80}); // dòng ngắn mạch tính toán
// < 9 Thanh cái tủ phân phối>
var rs82 = cacul(82, {r: 0, rt: rs78}); // điện trở tổng
var rs83 = cacul(83, {x: 0.15, xt: rs79}); // điện kháng tổng
var rs84 = cacul(84, {rt: rs82, xt: rs83}); // điện trở toàn phần
var rs85 = cacul(85, {z: rs84}); // dòng ngắn mạch tính toán
// < 10 MCCB nhánh tủ phân phối>
var rs86 = cacul(86, {r: 0, rt: rs82}); // điện trở tổng
var rs87 = cacul(87, {x: 0.15, xt: rs83}); // điện kháng tổng
var rs88 = cacul(88, {rt: rs86, xt: rs87}); // điện trở toàn phần
var rs89 = cacul(89, {z: rs88}); // dòng ngắn mạch tính toán
// < 11 Cáp sau tủ phân phối>
var rs90 = cacul(90, {l: 50, n: 1, s: 35}); // điện trở
var rs91 = cacul(91, {l: 50}); // điện kháng
var rs92 = cacul(92, {r: rs90, rt: rs86}); // điện trở tổng
var rs93 = cacul(93, {x: rs91, xt: rs87}); // điện kháng tổng
var rs94 = cacul(94, {rt: rs92, xt: rs93}); // điện trở toàn phần
var rs95 = cacul(95, {z: rs94}); // dòng ngắn mạch tính toán
// < 12 MCCB,MCB tổng Tủ tải>
var rs96 = cacul(96, {r: 0, rt: rs92}); // điện trở tổng
var rs97 = cacul(97, {x: 0.15, xt: rs93}); // điện kháng tổng
var rs98 = cacul(98, {rt: rs96, xt: rs97}); // điện trở toàn phần
var rs99 = cacul(99, {z: rs98}); // dòng ngắn mạch tính toán
// < 13 Thanh cái tủ tải>
var rs100 = cacul(100, {r: 0, rt: rs96}); // điện trở tổng
var rs101 = cacul(101, {x: 0.15, xt: rs97}); // điện kháng tổng
var rs102 = cacul(102, {rt: rs100, xt: rs101}); // điện trở toàn phần
var rs103 = cacul(103, {z: rs102}); // dòng ngắn mạch tính toán
// < 14 Áp tomat nhánh>
var rs104 = cacul(104, {r: 0, rt: rs96}); // điện trở tổng
var rs105 = cacul(105, {rt: rs104, xt: rs101}); // điện kháng tổng
var rs106 = cacul(106, {rt: rs104, xt: rs105}); // điện trở toàn phần
var rs107 = cacul(107, {z: rs106}); // dòng ngắn mạch tính toán
// < 15 Cáp/Pha>
var rs108 = cacul(108, {l: 20, n: 1, s: 4}); // điện trở
var rs109 = cacul(109, {l: 20}); // điện kháng
var rs110 = cacul(110, {r: rs108, rt: rs104}); // điện trở tổng
var rs111 = cacul(111, {x: rs109, xt: rs105}); // điện kháng tổng
var rs112 = cacul(112, {rt: rs110, xt: rs111}); // điện trở toàn phần
var rs113 = cacul(113, {z: rs112}); // dòng ngắn mạch tính toán

//+++++++++++++++++++ Tính toán sụt áp +++++++++++++++++++

// <Mạng điện xoay chiều>
var rs114 = cacul(114, {md: 3, p: 20, u: 380, cos: 0.85}); // dòng điện làm việc tính toán
var rs115 = cacul(115, {
  md: 3,
  in: rs114,
  l: 100,
  r1: 1.851,
  cos: 0.85,
  x1: 0.087,
  n: 2,
}); // độ sụt áp
var rs116 = cacul(116, {au: rs115, u: 380}); // Tỉ lệ sụt áp
// <Mạng điện áp 1 chiều>
var rs117 = cacul(117, {p: 0.5, u: 24}); // Dòng điện làm việc tính toán
var rs118 = cacul(118, {in: rs117, l: 50, r1: 4.6275, u: 24}); // Độ sụt áp
var rs119 = cacul(119, {au: rs118, u: 24}); // Tỉ lệ sụt áp

var dk7 = cacul(dk7, {au1: rs116}); // kiểm tra đạt nếu nhỏ hơn hoặc bằng 5%
var dk8 = cacul(dk8, {au2: rs119}); // kiểm tra đạt nếu nhỏ hơn hoặc bằng 5%

//+++++++++++++++++++ Tính tiếp địa,chống sét +++++++++++++++++++

// < 1 pp bán kính thu sét theo pp cổ điển>
var rs120 = cacul(120, {h: 7.5, hx: 5}); // bán kính bảo vệ
// < 2 pp tính toán chống sét theo pp phát tia tiên đạo>
var rs121 = cacul(121, {v: 1000000, t: 30}); // đường dẫn chủ động
var rs122 = cacul(122, {h: 110, d: 60, al: rs121}); // bán kính bảo vệ của đầu thu set

// < II tính toán nối đất>
var rs123 = cacul(123, {r: 0.2, lc: 2.5, d: 0.016, t: 0.8}); // điện trở một cọc tiết địa LỖI số 26.143
var rs124 = cacul(124, {r: 0.2, lt: 23, b: 0.04, t: 0.8}); // điện trở thanh dẫn dẹt LỖI số 4.967
var rs125 = cacul(125, {r: 0.2, lt: 23, d: 0.01, t: 0.8}); // Điện trở thanh dẫn tròn LỖI số 5.298
var rs126 = cacul(126, {n: 6, hc: 0.78, ht: 0.6, rc: 11.6, rt: 2.2}); // Điện trở tổng với thanh nối thép dẹt rc = rs123 ,rt = rs124
var rs127 = cacul(127, {rc: 11.6, rt: 2.3, ht: 0.6, hc: 0.78, n: 6}); // Điện trở tổng với thanh nối thép tròn rc = rs123 ,rt = rs125

console.log('><><><><><><<><>');
console.log('rs123', rs123);
console.log('rs124', rs124);
console.log('rs125', rs125);

//+++++++++++++++++++ Bóc khối lượng chiếu sáng +++++++++++++++++++
var rs128 = cacul(128, {
  h: 4,
  h2: 0.5,
  n: 20,
  m: 12,
  b: 24,
  a: 34,
  hs: 2.6,
  x: 3000,
  kd: 1.2,
}); // Khối lượng dây pha
var rs129 = rs128; // Khối lượng dây trung tính
var rs130 = cacul(130, {h: 4, h2: 0.5, n: 20, a: 34, x: 3000, kd: 1.2}); // khối lượng dây tiếp địa
var rs131 = cacul(131, {h2: 0.5, a: 34, kd: 1.2, ko: 1.1, pe: rs130}); // khối lượng ống cứng
var rs132 = cacul(132, {h2: 0.5, a: 34, ko: 1.1}); // khối lượng ống mềm

//+++++++++++++++++++ Bóc khối lượng ổ cấm +++++++++++++++++++

var rs133 = cacul(133, {
  h: 4,
  ht: 0.5,
  p1: 1.2,
  p2: 3,
  p3: 20,
  oc2: 1,
  oc3: 2,
  y: 200,
  kd: 1.2,
}); // Khối lượng dây pha
var rs134 = rs133; // Khối lượng dây trung tính
var rs135 = rs133; // Khối lượng dây tiếp điạ
var rs136 = cacul(136, {kd: 1.2, ko: 1.1, l: rs133}); // Khối lượng ống cứng

//+++++++++++++++++++ Tính chọn động cơ +++++++++++++++++++

var rs137 = cacul(137, {md: 3, p: 20, u: 380, cos: 0.85, n: 0.9}); // Dòng điện làm việc tính toán
var rs138 = cacul(138, {kat: 3, itt: rs137}); // Dòng điện chọn aptomat
var rs139 = cacul(139, {kmc: 3, itt: rs137}); // Dòng điện chọn contactor

// console.log(rs120);
