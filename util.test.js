const { 
  sum,
  greating,
  isEven,
  array,
  compileAndroidCode,
  getArray,
  getInfo,
  fetchData,
  createOrder,
  getNull
} = require('./util');
const db = require('./db')
const email = require('./email')


/*_____________________________________________________________*/
test.only('getNull', () => {
    let name = null;
    const result = getNull(name);
    expect(result).toBeNull();
    expect(result).toBeFalsy();
})


/*_____________________________________________________________*/
describe('sum', () => {
  it('Should return sum of two arguments', () => {
    expect(sum(2, 3)).toBeLessThan(6);
    expect(sum(4, 7)).toBeGreaterThanOrEqual(1)
    expect(sum(0.101, 0.2)).toBeCloseTo(0.3);
    expect(sum(7, -4)).not.toEqual(4)
    expect(sum(NaN, 6)).toBe(NaN)
  });
})


/*_____________________________________________________________*/
describe("greeting", function () {
  it('Should return  greeting message', () => {
    expect(greating("John")).toMatch(/Hello john/i);
    expect(greating('Talal')).toBe('Hello Talal');
  });
  it('Should return  greeting message', () => {
    const name = "day";
    const result = greating(name);
    expect(result).toBeDefined();
  });
});


/*_____________________________________________________________*/
describe('isEven', () => {
  it('Should return true if argument is even otherwise false', () => {
    expect(isEven(8)).toBeTruthy(); // Even
    expect(isEven(12)).not.toBeFalsy();// Odd
    expect(isEven(-4)).toBeTruthy();// Even
    expect(isEven(-4)).toBe(true);
    expect(isEven(-4)).toStrictEqual(true);
  })
});


/*_____________________________________________________________*/
test('Array,..Should push new value to array', () => {
  array.push('jord')
  expect(array).toContain('jord');
  expect(array[2]).toBe('jord'); //* تو بي لاتعمل اذا كان الناتج كل المصفوفة
  expect(array[2]).toEqual('jord'); //* تو ايكوال تعمل حتى اذا كان الناتج كل المصفوفة
  expect(array[2]).toStrictEqual('jord');
});


/*_____________________________________________________________*/
describe('compileAndroidCode', () => {
  it('Should return error when no parameter passed', () => {
    expect(() => compileAndroidCode()).toThrowError('you are using the wrong JDK!');
  })
});


/*_____________________________________________________________*/
describe('Object in jest-test', () => {
  let obj = { id: 1, name: 'tal', age: 43 };
  it('Should check if obj is contain id number or no', () => {
    expect(obj).toHaveProperty('id', 1);
    expect(obj).toMatchObject({ id: 1, age: 43 })
  });
  it('Should check if obj equals for given or no', () => {
    expect(obj).toEqual({ id: 1, name: 'tal', age: 43 })//*  toMatchObjectيجب مكتوب كامل الكائن هنا واذا اردت فحص وجود قيمة واحدة استخدم 
    expect(obj['name']).toBe('tal')//* لاتعمل توبي عندما يكون الناتج كل الكائن مثل تو ايكوال
  });
})


/*_____________________________________________________________*/
describe('getArray', () => {
  it('Should return array of strings with async', async () => {
    const array = await getArray();
    expect(array).toEqual(['tal', 'day', 'jord']);//* تم اضافة العنصر الاخير لانه في فحص اخر في الاعلى قام بذلك
  })
  it('Should return length for array', async () => {
    expect((await getArray()).length).toBe(3)
  })
  it('Should return array of strings with async and resolves', async () => {
    await expect(getArray()).resolves.toEqual(['tal', 'day', 'jord'])//*اذا كانت مصفوفة نستخدم toStrictEqual ولكن مع كائن استخدم toContainEqual
  }) //* لايمكن استخدام هنا تو بي لانه يعيد بخطاء
})


/*_____________________________________________________________*/
describe('getInfo', () => {
  it('Should delete 10% of price if price greate than or equal 10', () => {
    db.getId = jest.fn().mockReturnValue({ id: 5, price: 40 });//*عمل موك على انه بديل للدالة قاعدة البيانات ويرجع كائن
    expect(getInfo(5)).toEqual({ id: 5, price: 36 });
    expect(db.getId).toHaveBeenCalledWith(5);//* خمسة تعني هنا الارغمنت للدالة موك انظر لاستدعائها بداخل الدالة غت اينفو
    expect(db.getId).toHaveBeenCalled();//* اذا تم استدعاء الدالة موك غيت ايدي فعندها ينجح الاختبار
    expect(getInfo(5)).toEqual({ id: 5, price: 32.4 });
    expect(db.getId).toHaveBeenCalledTimes(2);//* getInfo(5)تم أستدعاء الدالة موك غت ايدي مرتين عبر الدالة  
    db.getId.mockReset()
  })
  it('I will use customized function', () => {
    db.getId = jest.fn().mockReturnValue({ id: 3, price: 100 });
    db.getId.mockImplementation((id) => {
      if (id > 2) {     
        return { id: id, price: 300 }
      }
    })

    expect(getInfo(3)).toEqual({ id: 3, price: 270 })
  })
  it('Should delete 10% of price if price greater than or equal 10', () => {
    db.getId = function (ID) {//* نجتاز ملف دي بي الاصلي والدالة التي فيه تحمل على البيانات لنقوم بمحاكاة عملها ونعمل مثلها دالة ببيانات مزيفة
      return { id: ID, price: 30 }
    }
    expect(getInfo(10)).toEqual({ id: 10, price: 27 })
  })
})


/*_____________________________________________________________*/
const { default: axios } = require("axios");
jest.mock("axios")

describe('fetchData', () => {
  it('Should return data from api axios.get', async () => {
    axios.get.mockResolvedValue({ id: 17, name: 'tal' });
    const data = await fetchData();
    expect(data).toEqual({ name: 'tal', id: 17 })//* toEqual مناسبة للكائنات فأن (تو بي) لاتعمل معهم
    expect(data).toMatchObject({ name: 'tal' })//* toMatch تعمل مع النصوص أما (تو متش أوبجكت) تعمل مع الكائنات
  })
})


/*_____________________________________________________________*/
describe('createOrder', () => {
  it('Should throw error if userId is not found', async () => {
    await expect(createOrder(undefined, [{ price: 20 }, { price: 10 }])).rejects.toThrowError('userId is not found');
    await expect( createOrder()).rejects.toThrowError('userId is not found');
  })//* لان الدالة هي غير متزامنة لذلك يجب نستخدم (ريجيكت)
  it.skip('Should create the order and send email', async () => {
    db.createOrder = jest.fn();
    db.getUser = jest.fn().mockReturnValue({ id: 5, email: 'test1@emai5.com' });

    email.sendEmail = jest.fn();
    const msg = await createOrder(5, [{ price: 20 }, { price: 10 }]);

    expect(db.createOrder).toHaveBeenCalledWith(5, [{ price: 20 }, { price: 10 }]);
    expect(db.createOrder).toHaveBeenCalled();

    expect(db.getUser.mock.calls.length).toBe(1);//*db.getUser(userId) = [5]
    expect(db.getUser.mock.calls[0][0]).toBe(5);//* db.getUser(5) عن مابداخل قوس توبي هو أننا نقصد بالارغمنت = 5 ولانقصد ماهو عائد من الدالة

    expect(email.sendEmail.mock.calls[0][0]).toMatch('test1@emai5.com');//*email.sendEmail('test1@emai5.com', 30) = [ 'test1@emai5.com', 30 ]
    expect(email.sendEmail.mock.calls[0][1]).toBe(30);
    expect(email.sendEmail.mock.calls.length).toBe(1);//*calls: [ [ 'test1@emai5.com', 30 ] ] طولها واحد
    
    expect(msg).toMatch('Order has been created successfully w')//*عند تنفيذ الدالة الرئيسية سوف ينتج عنها تلك الرسالة ولها تكلمة لانحتاج نكتبها كلها هنا
  })
})


