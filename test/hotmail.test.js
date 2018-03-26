const Hotmail = require('../src/providers/hotmail');

test('it should return true for sobhi.a@hotmail.com', () => {
  return Hotmail('sobhi.a@hotmail.com').then((answer)=>{
    expect(answer).toBeTruthy();
  })
});

test('it should return false for falsefalse001false@hotmail.com', () => {
  return Hotmail('falsefalse001false@hotmail.com').then((answer)=>{
    expect(answer).toBeFalsy();
  })
});
